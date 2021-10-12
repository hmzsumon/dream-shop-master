const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');

// Create Product Admin
exports.createProduct = async (req, res) => {
	try {
		const product = await Product.create(req.body);
		res.status(201).json({
			success: true,
			product,
		});
	} catch (err) {
		console.log(err);
	}
};

// Get All Product
exports.getAllProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json({
			success: true,
			products,
		});
	} catch (err) {
		console.log(err);
	}
};

// Get Single Product
exports.getProductDetails = async (req, res, next) => {
	try {
		const product = await Product.findById(req.params.id);
		res.status(200).json({
			success: true,
			product,
		});
	} catch (e) {
		console.error(e);
		return next(new ErrorHandler('Product not found', 404));
	}
};

// Update Product
exports.updateProduct = async (req, res, next) => {
	try {
		// let product = await Product.findById(req.params.id, req.body);
		let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
			useFindAndModify: false,
		});

		res.status(200).json({
			success: true,
			product,
		});
	} catch (e) {
		console.error(e);
		return next(new ErrorHandler('Product not found', 404));
	}
};

exports.deleteProduct = async (req, res, next) => {
	try {
		const product = await Product.findById(req.params.id);
		await product.remove();

		res.status(200).json({
			success: true,
			message: 'Product Delete Successfully',
		});
	} catch (e) {
		console.error(e);
		return next(new ErrorHandler('Product not found', 404));
	}
};
