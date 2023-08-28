const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');

envs = dotenv.config({ path: path.join(__dirname, './.env') })

const {BOT_TOKEN, SERVER_URL} = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const URI = `/command/webhook/${BOT_TOKEN}`;
const URI_WH = `/botapi/command/webhook/${BOT_TOKEN}`;
const WEBHOOK_URL = SERVER_URL+URI_WH;

const init = async() => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
}

module.exports = {
    init,
    SERVER_URL,
    TELEGRAM_API,
    URI
}