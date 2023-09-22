const { Schema, model } = require("mongoose")
const bcrypt = require("bcryptjs")


const UserSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true}
}, {
    timestamps: true //para guardar la hora a que se hace alguna acción guardar, actualizar, etc.
})

UserSchema.methods.encrypPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

model.exports = model("User", UserSchema)