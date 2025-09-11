import { v2 as cloudinary } from 'cloudinary';
import Product from "../models/Product.js"

// add product : /api/product/add
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData)

        const images = req.files
        let imageUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,
                    {resource_type: 'image'}
                );
                return result.secure_url
            })
        )

        await Product.create({...productData, image: imageUrl})

        res.json({success: true, message: "product added"})
    } catch (error) {
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }
}

// get product : /api/product/list
export const ProductList = async (req, res) => {
    try {
        const products = await Product.find({})

        res.json({success: true, products})
    } catch (error) {
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }
}

// get single product : /api/product/id/:id
export const ProductById = async (req, res) => {
    try {
        const {id} = req.params;;
        const product = await Product.findById(id)

        res.json({success: true, product})
    } catch (error) {
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }

}

// change product in stock : /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const {id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, {inStock})
        res.json({success: true, message: "Stock Updated"})
    } catch (error) {
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }
}