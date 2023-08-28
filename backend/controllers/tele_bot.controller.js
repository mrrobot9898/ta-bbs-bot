const axios = require('axios')
const {TELEGRAM_API, SERVER_URL} = require('../tele_api')
const userContext = {}
var chatId, text;

async function sendMessage(chatId,message) {
	axios.post(`${TELEGRAM_API}/sendMessage`,{
		chat_id: chatId,
		text: message
	})
}

async function TeleController (req, res) {
	try{
		const chatId = req.body.message.chat.id;
		const text = req.body.message.text;
		const location = req.body.message.location;
		if (location) {
			const context = userContext[chatId];
			if (context && context.command === '/odpcoorupdate') {
				await updateCoorDataTest(chatId, context.nama_odp, location);
				delete userContext[chatId]; 
			}
			if (context && context.command === '/jarakodp') {
				odp_loc = await getDirection(chatId, context.nama_odp, location.latitude, location.longitude)
				delete userContext[chatId]; 
			}
		} else if (text) {
			if		(text.startsWith('/start')) 		ret = await greetUser(chatId, req.body.message.chat.first_name);
			else if	(text.startsWith('/odpdata')) 		ret = await getDetail(chatId, text);
			else if	(text.startsWith('/odpcoord')) 		ret = await getCoorDetail(chatId, text);
			else if (text.startsWith('/jarakodp')) 		commandCheck(chatId,text)
			else if (text.startsWith('/odpcoorupdate')) commandCheck(chatId,text)
		}
		else {
			sendMessage(chatId, `Pesan Anda adalah\n'${text}'`);
		}
	}
	catch(error) {
		console.log(error)
		sendMessage(chatId, `Perintah Gagal diproses`);
	}
	return res.send(req.body.message);
}

async function greetUser(chatId, text) {
	const message = `Halo, ${text}!!!\nSelamat datang di Bot Telkom Akses Bandung Barat!!!`;
	sendMessage(chatId,message);
}

async function commandCheck(chatId, text) {
	var ODP_Name = text.split(' ');
	const commands = ODP_Name[0];
	const nama_odp = encodeURIComponent(ODP_Name[1]);
	if(nama_odp !== 'undefined'){
		userContext[chatId] = { command: commands, nama_odp};
		if(commands === '/jarakodp') await directionHandle(chatId, nama_odp);
		else await updateCoorHandle(chatId, nama_odp);
	}
	else{
		const error_hint = `Silahkan Masukan perintah\n${commands} nama_odp
		\nContoh : 
		\t- ${commands} nama_odp`;
		await sendMessage(chatId, error_hint);
	}
}

async function getDetail(chatId, text) {
	try {
		var command = text.split(' ');
		const encodedMessage = encodeURIComponent(command[1]);
		var data = await axios.get(`${SERVER_URL}/odp/${encodedMessage}`);

		data = data.data.data[0]
		const keys = Object.keys(data);
		const subsetKeys = keys.slice(1);
		data = subsetKeys.reduce((obj, key) => ({ ...obj, [key]: data[key] }), {});
		
		const cleanedData = Object.entries(data)
			.map(([key, value]) => `${key}: ${value}`)
			.join('\n - ');
		const message = `Berikut data yang didapatkan:\n - ${cleanedData}`;
		
		sendMessage(chatId,message);
	} catch (error) {
		console.error('Error:', error);
		const error_hint = `Silahkan Masukan perintah \n/odpdata {nama odp}
		\nContoh : 
		\t- /odpdata nama_odp`;
		await sendMessage(chatId, error_hint);
	}
}

async function updateCoorHandle(chatId,text) {
	await sendMessage(chatId, `Silahkan bagikan lokasi saat ini untuk mengubah koordinat ${text}`);
	return text;
}

async function directionHandle(chatId,text) {
	await sendMessage(chatId, `Silahkan bagikan lokasi saat ini untuk melihat arah menuju ${decodeURIComponent(text)}`);
	return text;
}

async function updateCoorDataTest(chatId, text, location) {
	const message = Object.entries(location)
			.map(([key, value]) => `${key}: ${value}`)
			.join('\n');
	const latitude = location.latitude;
	const longitude = location.longitude;

	try {
		await updateCoorData(chatId, text, latitude, longitude); 
	} catch (error) {
		sendMessage(chatId, `Error updating data: ${error.message}`);
	}
}

async function getCoorDetail(chatId, text) {
	try {
		var command = text.split(' ');
		const encodedMessage = encodeURIComponent(command[1]);
		var data = await axios.get(`${SERVER_URL}/odp/coor/${encodedMessage}`);
		data = data.data.data[0]
		const cleanedData = Object.entries(data)
			.map(([key, value]) => `${key}: ${value}`)
			.join('\n');
		const message = `Berikut data yang didapatkan:\n${cleanedData}`;
		sendMessage(chatId,message);
	} catch (error) {
		const error_hint = `Silahkan Masukan perintah /odpcoord {Nama ODP}
		Contoh : 
		 - /odpcoord nama_odp`;
		await sendMessage(chatId, error_hint);
	}
}

async function updateCoorData(chatId, nama_odp, latitude, longitude) {
	try {
		const req = {
			ODP_NAME : nama_odp, 
			LATITUDE: latitude, 
			LONGITUDE: longitude
		}
		var data = await axios.patch(`${SERVER_URL}/odp/coorupdate/${nama_odp}`, req);
		data = data.data
		const formatData = (data) =>
		Object.entries(data)
			.map(([key, value]) => `${key}: ${value}`)
			.join('\n    ');

		const formattedMessage = `
		Old Data:
		\t${formatData(data.old_data)}

		New Data:
		\t${formatData(data.new_data)}

		Koordinat ODP ${data.new_data.ODP_NAME} Berhasil Diupdate
		`;
		sendMessage(chatId,formattedMessage);
	} catch (error) {
		console.error('Error:', error);
		const error_hint = `Silahkan Masukan perintah \n/odpcoorupdate nama_odp latitude longitude
		\nContoh : 
		\t- /odpcoorupdate nama_odp`;
		await sendMessage(chatId, error_hint);
	}
}

async function getDirection(chatId, nama_odp, latitude, longitude) {
	try {
		const encodedMessage = encodeURIComponent(nama_odp);
		var data = await axios.get(`${SERVER_URL}/odp/coordir/${encodedMessage}`);
		data = data.data.data[0]
		data.cur_latitude = latitude
		data.cur_longitude = longitude
		data.direction = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${data.LATITUDE},${data.LONGITUDE}`
		const cleanedData = Object.entries(data)
			.map(([key, value]) => `${key}: ${value}`)
			.join('\n');
		const message = `Berikut data yang didapatkan:\n${cleanedData}`;
		sendMessage(chatId,message);
	} catch (error) {
		const error_hint = `Silahkan Masukan perintah /jarakodp nama_odp
		Contoh : 
			- /jarakodp nama_odp`;
		await sendMessage(chatId, error_hint);
	}
}

module.exports = {
    TeleController
}