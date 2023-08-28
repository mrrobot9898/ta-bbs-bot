const dbconfig = require('./db');

async function getData () {
    try {
        var result = dbconfig.query('SELECT * FROM odp_master_data');
        return result;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

async function detailData (name, id) {
    try {
        var result;
        if (name !== null) result = dbconfig.query('SELECT * FROM odp_master_data WHERE ODP_NAME LIKE ?',["%"+name+"%"]);
        else result = dbconfig.query('SELECT * FROM odp_master_data WHERE id = ?',[id]);
        return result;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

async function detailCoorData (name, id) {
    try {
        var result;
        result = dbconfig.query('SELECT ODP_NAME, LATITUDE, LONGITUDE FROM odp_master_data WHERE ODP_NAME LIKE ?',["%"+name+"%"]);
        return result;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

async function createData (NOSS_ID, ODP_INDEX, ODC, ODP_NAME, LATITUDE, LONGITUDE, AVAI, USED, RSV, RSK, IS_TOTAL, STATUS_ODP, TIKOR_ODP, REGIONAL, WITEL, DATEL, STO, STO_DESC, ODP_INFO, SEKTOR) {
    try {
        var result = dbconfig.query(`
            INSERT INTO odp_master_data 
            (NOSS_ID, ODP_INDEX, ODC, ODP_NAME, LATITUDE, LONGITUDE, AVAI, USED, RSV, RSK, IS_TOTAL, STATUS_ODP, TIKOR_ODP, REGIONAL, WITEL, DATEL, STO, STO_DESC, ODP_INFO, SEKTOR) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [NOSS_ID, ODP_INDEX, ODC, ODP_NAME, LATITUDE, LONGITUDE, AVAI, USED, RSV, RSK, IS_TOTAL, STATUS_ODP, TIKOR_ODP, REGIONAL, WITEL, DATEL, STO, STO_DESC, ODP_INFO, SEKTOR]);
        return result;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

async function deleteData (id) {
    try {
        var result = dbconfig.query(`DELETE FROM odp_master_data WHERE id = ?`,[id]);
        return result;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

async function updateData (NOSS_ID, ODP_INDEX, ODC, ODP_NAME, LATITUDE, LONGITUDE, AVAI, USED, RSV, RSK, IS_TOTAL, STATUS_ODP, TIKOR_ODP, REGIONAL, WITEL, DATEL, STO, STO_DESC, ODP_INFO, SEKTOR, id = null, odp_name = null) {
    try {
        if(odp_name === null){
            var result = dbconfig.query(`
                UPDATE odp_master_data 
                SET NOSS_ID = ?, ODP_INDEX = ?, ODC = ?, ODP_NAME = ?, LATITUDE = ?, LONGITUDE = ?, AVAI = ?, USED = ?, RSV = ?, RSK = ?, IS_TOTAL = ?, STATUS_ODP = ?, TIKOR_ODP = ?, REGIONAL = ?, WITEL = ?, DATEL = ?, STO = ?, STO_DESC = ?, ODP_INFO = ?, SEKTOR = ?
                WHERE id = ?`,
                [NOSS_ID, ODP_INDEX, ODC, ODP_NAME, LATITUDE, LONGITUDE, AVAI, USED, RSV, RSK, IS_TOTAL, STATUS_ODP, TIKOR_ODP, REGIONAL, WITEL, DATEL, STO, STO_DESC, ODP_INFO, SEKTOR, id]);
        }
        else{
            var result = dbconfig.query(`
                UPDATE odp_master_data 
                SET NOSS_ID = ?, ODP_INDEX = ?, ODC = ?, ODP_NAME = ?, LATITUDE = ?, LONGITUDE = ?, AVAI = ?, USED = ?, RSV = ?, RSK = ?, IS_TOTAL = ?, STATUS_ODP = ?, TIKOR_ODP = ?, REGIONAL = ?, WITEL = ?, DATEL = ?, STO = ?, STO_DESC = ?, ODP_INFO = ?, SEKTOR = ?
                WHERE ODP_NAME = ?`,
                [NOSS_ID, ODP_INDEX, ODC, ODP_NAME, LATITUDE, LONGITUDE, AVAI, USED, RSV, RSK, IS_TOTAL, STATUS_ODP, TIKOR_ODP, REGIONAL, WITEL, DATEL, STO, STO_DESC, ODP_INFO, SEKTOR, odp_name]);
        }
        return result;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

async function updateCoorData (ODP_NAME, LATITUDE, LONGITUDE) {
    try {
        var result = dbconfig.query(`
        UPDATE odp_master_data 
        SET ODP_NAME = ?, LATITUDE = ?, LONGITUDE = ?
        WHERE ODP_NAME = ?`,
        [ODP_NAME, LATITUDE, LONGITUDE, ODP_NAME]);
        return result;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

module.exports = {
    getData,
    detailData,
    detailCoorData,
    createData,
    deleteData,
    updateData,
    updateCoorData
}