import mongoose, { Schema, Document } from "mongoose";
export interface ICategory extends Document {
    _id: mongoose.Types.ObjectId;
    categoryName: string;
    description: string;
    isActive: boolean;
}
const CategorySchema: Schema = new Schema<ICategory>({
    categoryName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true,
});
const Category = mongoose.model<ICategory>("Category", CategorySchema);
export default Category;