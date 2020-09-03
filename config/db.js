const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
    try{ 
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useCreateIndex:true,
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log(`MongoDb connected on ${conn.connection.host}`.cyan.bold)
    } catch (err){
        console.log(`err:${err}`)
        process.exit(1)
    }
}
module.exports = connectDB