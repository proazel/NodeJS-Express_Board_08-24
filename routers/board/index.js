const express = require('express');
const router = express.Router();

const controller = require('./board.controller');

router.get('/', controller.main);
router.get('/list', controller.list);
router.get('/view', controller.view);

router.get('/write', controller.writeGet);
router.post('/write', controller.writePost);

router.get('/modify', controller.modifyGet);
router.post('/modify', controller.modifyPost);

router.get('/remove', controller.remove);

module.exports = router;