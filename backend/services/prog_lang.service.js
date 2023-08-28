const dbconfig = require('./db');

async function getData () {
    try {
        var result = dbconfig.query('SELECT * FROM programming_languages');
        return result;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

async function detailData (id) {
    try {
        var result = dbconfig.query('SELECT * FROM programming_languages WHERE id = ?',[id]);
        return result;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

async function createData (pname, released_year, githut_rank, pypl_rank, tiobe_rank) {
    try {
        var result = dbconfig.query(`
            INSERT INTO programming_languages 
            (name, released_year, githut_rank, pypl_rank, tiobe_rank) 
            VALUES (?, ?, ?, ?, ?)`,
            [pname, released_year, githut_rank, pypl_rank, tiobe_rank]);
        return result;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

async function deleteData (id) {
    try {
        var result = dbconfig.query(`DELETE FROM programming_languages WHERE id = ?`,[id]);
        return result;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

async function updateData (pname, released_year,githut_rank,pypl_rank,tiobe_rank, id) {
    try {
        var result = dbconfig.query(`
            UPDATE programming_languages 
            SET name = ?, released_year = ?, githut_rank = ?, pypl_rank = ?, tiobe_rank = ?
            WHERE id = ?`,
            [pname, released_year, githut_rank, pypl_rank, tiobe_rank, id]);
        return result;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

module.exports = {
    getData,
    detailData,
    createData,
    deleteData,
    updateData
}