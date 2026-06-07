import mongoose, { Schema, Document } from "mongoose";
export interface IProduct extends Document {
    _id: mongoose.Types.ObjectId;
    productName: string;
    description: string;
    isInStock: boolean;
    imageUrl:string;
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
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    remainingUnits: {
        type: Number,
        default: 0
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