const services = require('../services/productService');

const createProduct = async (req, res) => {
    try {
        const { productData, productSettingsData } = req.body;

        // Call the service to create a product and its settings
        const result = await services.createProduct(productData, productSettingsData);

        res.status(201).json({ message: 'Product created successfully', data: result });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createProduct
};