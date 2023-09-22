import { Schema, model, Document } from "mongoose"

//cuando definimos interface de typescript deinifmos con strin con "s" minuscula
interface User extends Document{
    email: string,
    first_name: string,
    last_name: string,
    avatar: string,
    password: string
}

const schema = new Schema({
    email: { type: String, unique: true, required: true}, //con esto el email es dato unico y no se guarda nulo
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    avatar: String,
    password: { type: String, required: true}
})

const Users = model<User>("user", schema) //creamos la colección

export default Users