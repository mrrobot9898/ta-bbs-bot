var pl = require('../services/odp_datas.service')


async function getData (req, res) {
    try {
        var datas = await pl.getData()
        var datas = datas
        return res.status(200).json({ status: 200, data: datas, message: "Data Succesfully Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function detailData (req, res) {
    try {
        var parsedValue = parseInt(req.params.data);
        if (!isNaN(parsedValue)) {
            var datas = await pl.detailData(null,parsedValue)
            var datas = datas[0]
        } else {
            var datas = req.params.data; 
            var datas = await pl.detailData(datas, null)
            var datas = datas[0]
        }
        return res.status(200).json({ status: 200, data: datas, message: "Data Succesfully Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function detailCoorData (req, res) {
    try {
        var datas = req.params.data; 
        var datas = await pl.detailCoorData(datas, null)
        var datas = datas[0]
        datas[0].maps = `https://www.google.com/maps/search/?api=1&query=${datas[0].LATITUDE},${datas[0].LONGITUDE}`;
        return res.status(200).json({ status: 200, data: datas, message: "Data Succesfully Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function detailCoorDirection (req, res) {
    try {
        var datas = decodeURIComponent(req.params.data); 
        var datas = await pl.detailCoorData(datas, null)
        var datas = datas[0]
        return res.status(200).json({ status: 200, data: datas, message: "Data Succesfully Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function createData (req, res) {
    try {
        var {NOSS_ID, ODP_INDEX, ODC, ODP_NAME, LATITUDE, LONGITUDE, AVAI, USED, RSV, RSK, IS_TOTAL, STATUS_ODP, TIKOR_ODP, REGIONAL, WITEL, DATEL, STO, STO_DESC, ODP_INFO, SEKTOR} = req.body;
        var datas = await pl.createData(NOSS_ID, ODP_INDEX, ODC, ODP_NAME, LATITUDE, LONGITUDE, AVAI, USED, RSV, RSK, IS_TOTAL, STATUS_ODP, TIKOR_ODP, REGIONAL, WITEL, DATEL, STO, STO_DESC, ODP_INFO, SEKTOR)
        var data = await pl.detailData(datas[0].insertId)
        var data = data[0][0]
        return res.status(200).json({ status: 200, data:data, message: "Data Input Successful" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function deleteData (req, res) {
    try {
        var datas = await pl.detailData(req.params.id)
        var datas = datas[0][0]
        await pl.deleteData(req.params.id)
        return res.status(200).json({ status: 200, data: datas, message: "Data Removed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function updateData (req, res) {
    try {
        var parsedValue = parseInt(req.params.data);
        if (!isNaN(parsedValue)) {
            var old_datas = await pl.detailData(null,parsedValue)
            var old_datas = old_datas[0]

            var {NOSS_ID, ODP_INDEX, ODC, ODP_NAME, LATITUDE, LONGITUDE, AVAI, USED, RSV, RSK, IS_TOTAL, STATUS_ODP, TIKOR_ODP, REGIONAL, WITEL, DATEL, STO, STO_DESC, ODP_INFO, SEKTOR, id, id = parsedValue, odp_name = null} = req.body;
            var new_datas = await pl.updateData(NOSS_ID, ODP_INDEX, ODC, ODP_NAME, LATITUDE, LONGITUDE, AVAI, USED, RSV, RSK, IS_TOTAL, STATUS_ODP, TIKOR_ODP, REGIONAL, WITEL, DATEL, STO, STO_DESC, ODP_INFO, SEKTOR, id, odp_name)
            var new_datas = await pl.detailData(null, parsedValue)
            var old_datas = old_datas[0]
            var new_datas = new_datas[0][0]
        } else {
            // Notes: ODP Name Must Exactly be the Same as in Database
            var old_datas = req.params.data; 
            var old_datas = await pl.detailData(old_datas, null)
            var old_datas = old_datas[0]
            
            var {NOSS_ID, ODP_INDEX, ODC, ODP_NAME, LATITUDE, LONGITUDE, AVAI, USED, RSV, RSK, IS_TOTAL, STATUS_ODP, TIKOR_ODP, REGIONAL, WITEL, DATEL, STO, STO_DESC, ODP_INFO, SEKTOR, id, id = null, odp_name = req.params.data} = req.body;
            var new_datas = await pl.updateData(NOSS_ID, ODP_INDEX, ODC, ODP_NAME, LATITUDE, LONGITUDE, AVAI, USED, RSV, RSK, IS_TOTAL, STATUS_ODP, TIKOR_ODP, REGIONAL, WITEL, DATEL, STO, STO_DESC, ODP_INFO, SEKTOR, id, odp_name)
            var new_datas = await pl.detailData(req.params.data, null)
            var old_datas = old_datas[0]
            var new_datas = new_datas[0][0]
        }

        return res.status(200).json({ status: 200, old_data: old_datas, new_data: new_datas, message: "Data Updated Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function updateCoorData (req, res) {
    try {
        // Notes: ODP Name Must Exactly be the Same as in Database
        var old_datas = req.params.data; 
        var old_datas = await pl.detailCoorData(old_datas, null)
        var old_datas = old_datas[0]

        var {ODP_NAME, LATITUDE, LONGITUDE} = req.body;
        var new_datas = await pl.updateCoorData(ODP_NAME, LATITUDE, LONGITUDE)
        var new_datas = await pl.detailCoorData(req.params.data, null)
        var old_datas = old_datas[0]
        var new_datas = new_datas[0][0]

        return res.status(200).json({ status: 200, old_data: old_datas, new_data: new_datas, message: "Data Updated Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

module.exports = {
    getData,
    detailData,
    detailCoorData,
    detailCoorDirection,
    createData,
    deleteData,
    updateData,
    updateCoorData
}