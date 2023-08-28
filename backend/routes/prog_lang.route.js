var express = require('express');
var router = express.Router();

var ProgController = require('../controllers/prog_lang.controller')

/* GET users listing. */
router.get('/',ProgController.getData);
router.get('/:id',ProgController.detailData);
router.post('/create',ProgController.createData);
router.delete('/remove/:id',ProgController.deleteData);
router.patch('/update/:id',ProgController.updateData);

module.exports = router;
