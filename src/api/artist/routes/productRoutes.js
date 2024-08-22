const express = require('express');
const router = express.Router();
const authJwt = require('../../../utils/helpers/authJwt');
const { createProductAndSettings } = require('../services/productService');
const { getProductsByArtistId,getProductSettingsById } = require('../services/productService');

// Create a new product and associated settings
router.post('/products', authJwt, async (req, res) => {
    try {
        const { productData, productSettingsData } = req.body;
        console.log('Received product data:', productData);

        // Call service function to handle product creation and settings
        const result = await createProductAndSettings(productData, productSettingsData);
        console.log('Product and settings created:', result);

        res.status(201).json({ message: 'Product and settings created successfully.' });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product and settings.' });
    }
});

router.get('/products/:artistid', authJwt, async (req, res) => {
    try {
        const artistid = req.params.artistid;
        const products = await getProductsByArtistId(artistid);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

router.get('/productsettings/:productid', authJwt, async (req, res) => {
    try {
        const productid = req.params.productid;
        const products = await getProductSettingsById(productid);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

module.exports = router;
