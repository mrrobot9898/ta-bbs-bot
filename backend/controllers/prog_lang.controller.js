var pl = require('../services/prog_lang.service')    

async function getData (req, res) {
    try {
        var datas = await pl.getData()
        var datas = datas[0]
        return res.status(200).json({ status: 200, data: datas, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function detailData (req, res) {
    try {
        var datas = await pl.detailData(req.params.id)        
        var datas = datas[0][0]
        return res.status(200).json({ status: 200, data: datas, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function createData (req, res) {
    try {
        var {pname = req.body.name, released_year,githut_rank,pypl_rank,tiobe_rank} = req.body;
        var datas = await pl.createData(pname, released_year,githut_rank,pypl_rank,tiobe_rank)
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
        var old_datas = await pl.detailData(req.params.id)
        var {pname = req.body.name, released_year,githut_rank,pypl_rank,tiobe_rank, id = req.params.id} = req.body;
        var new_datas = await pl.updateData(pname, released_year,githut_rank,pypl_rank,tiobe_rank, id)
        var new_datas = await pl.detailData(req.params.id)
        var old_datas = old_datas[0][0]
        var new_datas = new_datas[0][0]

        return res.status(200).json({ status: 200, old_data: old_datas, new_data: new_datas, message: "Data Updated Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

module.exports = {
    getData,
    detailData,
    createData,
    deleteData,
    updateData
}