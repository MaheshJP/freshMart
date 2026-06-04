import { Request, Response } from 'express';
import Category from '../models/Category';

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            status: 'success',
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching categories', error
        });
    }
}
export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.create(req.body);
        
        res.status(201).json({
            status: 'success',
            data: category
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error creating category', error
        });
    }
}
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });  
        if (!category) {
            return res.status(404).json({
                status: 'error',
                message: 'Category not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: category
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error updating category', error
        });
    }
}
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({
                status: 'error',
                message: 'Category not found'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Category deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error deleting category', error
        });
    }
}