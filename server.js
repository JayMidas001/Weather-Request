const express = require(`express`)
const app = express()
const mongoose = require(`mongoose`)
require(`dotenv`).config()
app.use(express.json())
const router = require(`./router/userRouter`)
app.use(router)
const port = process.env.port

mongoose.connect(process.env.db).then(()=>{
    app.listen(port,()=>{
        console.log(`App is currently connected & running on port:${port}`);
    })
    console.log(`Connection to MongoDB has been established successfully`);
}).catch((e)=>{
    console.log(`Unable to connect to MongoDB because: ${e}`);
})
