var express = require('express');
var router = express.Router();

var OdpController = require('../controllers/odp_datas.controller')
/* GET users listing. */
router.get('/',OdpController.getData);
router.get('/:data',OdpController.detailData);
router.get('/coor/:data',OdpController.detailCoorData);
router.get('/coordir/:data',OdpController.detailCoorDirection);
router.post('/create',OdpController.createData);
router.delete('/remove/:id',OdpController.deleteData);
router.patch('/update/:data',OdpController.updateData);
router.patch('/coorupdate/:data',OdpController.updateCoorData);

module.exports = router;