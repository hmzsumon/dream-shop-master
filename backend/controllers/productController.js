const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create Product Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.create(req.body);

	res.status(201).json({
		success: true,
		product,
	});
});

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
		return res.status(500).json({ message: 'Something went wrong' });
	}
};

// Get Single Product

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler('Product not found', 404));
	}

	res.status(200).json({
		success: true,
		product,
	});
});

// Update Product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
	let product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler('Product not found', 404));
	}

	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	res.status(200).json({
		success: true,
		product,
	});
});

// delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler('Product not found', 404));
	}
	await product.remove();

	res.status(200).json({
		success: true,
		message: 'Product Delete Successfully',
	});
});
