const mongoose = require("mongoose")

// El localhost no funciona dado que no lo vamos a tener en el localhost es decir en mi maquina.
// Dado que lo tenemos en un servicio de docker y en nuestro caso el servicio se llama mongo
// por eso esto "mongodb://localhost/mydatabase"
// lo cambiamos por  esto "mongodb://mongo/mydatabase"

mongoose.connect("mongodb://mongo/mydatabase")
.then(db => console.log("Db is connected to ", db.connection.host))
.catch(err => console.error(err))