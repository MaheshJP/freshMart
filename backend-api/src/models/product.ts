import mongoose, { Schema, Document } from "mongoose";
export interface IProduct extends Document {
    _id: mongoose.Types.ObjectId;
    productName: string;
    description: string;
    isInStock: boolean;
    imageUrl: string;
    price: number;
    remainingUnits?: number;
    categoryId: mongoose.Types.ObjectId;
}
const ProductSchema: Schema = new Schema<IProduct>({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    isInStock: {
        type: Boolean,
        default: true
    },
    imageUrl: {
        type: String,
        trim: true,
        validate: {
            validator: (value: string): boolean => {
                if (!value) return true;
                try {
                    new URL(value);
                    return true;
                } catch {
                    return false;
                }
            },
            message: 'Please provide a valid image URL'
        }
    },
    price: {
        type: Number,
        default: 0,
        min: [0, 'Price cannot be negative'],
        validate: {
            validator: Number.isInteger,
            message: 'Price must be an integer'
        }
    },
    remainingUnits: {
        type: Number,
        default: 0,
        min: [0, 'Remaining units cannot be negative'],
        validate: {
            validator: Number.isInteger,
            message: 'Remaining units must be an integer'
        }
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    }
},
    {
        timestamps: true,
    });
const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;