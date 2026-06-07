import { Request, Response } from 'express';
import Product from '../models/product';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            status: 'success',
            data: products
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching products', error
        });
    }
}
export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        
        res.status(201).json({
            status: 'success',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error creating product', error
        });
    }
}
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });  
        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error updating product', error
        });
    }
}
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error deleting product', error
        });
    }
}