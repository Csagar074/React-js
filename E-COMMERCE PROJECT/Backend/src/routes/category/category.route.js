const express = require('express');
const { addCategory, getAllCategory } = require('../../controllers/category/category.controller');
const { upload } = require('../../middleware/storage.middleware');
const { checkIsAdmin } = require('../../middleware/auth.middleware');

const categoryRoute = express.Router();

categoryRoute.post('/', checkIsAdmin, upload.single('category_image'), addCategory);
categoryRoute.get('/', getAllCategory);

module.exports = categoryRoute;