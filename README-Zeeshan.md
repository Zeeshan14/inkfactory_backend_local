# Backend routes written by Zeeshan.

# Here are the backened routes written by Zeeshan along with its sample Object.

# BASE URI /api/artist , /api/productSetting , /api/productMaster/, /api/productCreate/

# Endpoint to display dynamic products for editing.
# This URL would load the dynamic editor with default values.
# http://localhost:5000/api/productEdit/editor


# Image Editor Route
# This route should run after an artist uploads the image and it will open the editor

1. GET /api/productEdit/editor


# This route would save the complete working after apply changes and filling the consent

2. POST /api/productCreate/products/

# This should be sample object coming from the frontend but if you integrate our component as it is. It should be generated automatically.

{
  "productData": {
    "title": "Vintage Watch EC2",
    "tags": "watch, vintage, classic EC2",
    "description": "A timeless vintage watch with classic design.",
    "viewVisibility": "public",
    "consent": "yes",
    "agreement": true,
    "artistid": 1
  },
  "productSettingsData": [
    {
      "isedited": true,
      "imgName": "watch1",
      "Image": 1,
      "uniques": 15,
      "position": {
        "x": 20,
        "y": 40
      },
      "horizontal": {
        "x": 25,
        "y": 45
      },
      "vertical": {
        "x": 30,
        "y": 50
      },
      "sliderValue": "85",
      "boundImage": [13, 14],
      "disable": 0,
      "bounds": 7,
      "ImageHover": "base64encodedhoverimage7",
      "variationId": 7,
      "EditedImage": "base64encodededitedimage7"
    },
    {
      "isedited": true,
      "imgName": "watch2",
      "Image": 2,
      "uniques": 16,
      "position": {
        "x": 40,
        "y": 60
      },
      "horizontal": {
        "x": 45,
        "y": 65
      },
      "vertical": {
        "x": 50,
        "y": 70
      },
      "sliderValue": "95",
      "boundImage": [15, 16],
      "disable": 0,
      "bounds": 8,
      "ImageHover": "base64encodedhoverimage8",
      "variationId": 8,
      "EditedImage": "base64encodededitedimage8"
    },
    {
      "isedited": false,
      "imgName": "watch3",
      "Image": 3,
      "uniques": 17,
      "position": {
        "x": 70,
        "y": 90
      },
      "horizontal": {
        "x": 75,
        "y": 95
      },
      "vertical": {
        "x": 80,
        "y": 100
      },
      "sliderValue": "105",
      "boundImage": [17, 18],
      "disable": 0,
      "bounds": 9,
      "ImageHover": "base64encodedhoverimage9",
      "variationId": 9,
      "EditedImage": "base64encodededitedimage9"
    }
  ]
}

3. PUT /api/productMaster/updateProduct/:id  [To Update complete product after editing]


4. PUT /api/productMaster/quickEditProduct/:id  [Quick Edit (Update only title and description)]

5. PUT /api/productMaster/updateVisibility/:id  [Update Visibility]

6. PUT /api/productMaster/updateConsent/:id  [Update Consent]

7. GET /api/productMaster/getAllProducts  [For Getting all Products for every artists]

8. GET /api/productMaster/getProductById/:id  [For Getting Product by passing ID in params]

9. GET /api/productCreate/products/:id [For Getting Product by passing artistId in params]

10. GET /api/productCreate/productsettings/:productid [For Getting all Product details including its settings]


# Categorizing products into collections.

10. POST /api/collection/createCollection [For creating collections]
# Sample object
{
  "name": "Summer Collection",
  "description": "A collection of summer themed products"
}

11. POST /api/collection/addProductToCollection/:collectionId  [For adding product to collection]

# Sample object
{
  "productId": "1"
}


12. GET /api/collection/getProductsByCollection/:collectionId [For getting products by collection]

