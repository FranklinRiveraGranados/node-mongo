import { Schema, Document, model, Types } from "mongoose"
import { User } from "../../data/users"


export interface Product extends Document {
    name: string
    year: number
    price?: number | null //signo "?" porque podría ser nulo es decir que no es obligatorio llenar
    description?:string
    user: Types.ObjectId | User
}

const schema = new Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, default: 0 },
    description: String,
    user: { type: Schema.Types.ObjectId, ref: "user", required: true} //similar a una clave foranea
})

const Products = model<Product>("product", schema)

export default Products