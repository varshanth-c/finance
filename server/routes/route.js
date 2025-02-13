const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.route('/api/categories')
    .post(controller.create_Categories)
    .get(controller.get_Categories);

router.route('/api/transaction')
    .post(controller.create_Transaction)
    .get(controller.get_Transaction)
    .delete(controller.delete_Transaction);

router.route('/api/labels')
    .get(controller.get_Labels);

module.exports = router;
