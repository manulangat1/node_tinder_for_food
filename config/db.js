const mongoose = require('mongoose')
const Mockgoose = require('mockgoose').Mockgoose
const colors = require('colors')

const connectDB = async () => {
    if (process.env.NODE_ENV === 'test'){
        // const mockgoose = new Mockgoose(mongoose)
        // mockgoose.prepareStorage[]
        //     .then()
        try {
            const mockgoose = new Mockgoose(mongoose)
            const mocks = await mockgoose.prepareStorage()
            const conn = await mongoose.connect(process.env.MONGO_URI,{
                useCreateIndex:true,
                useUnifiedTopology:true,
                useNewUrlParser:true
            })
            console.log(`Mockgoose connected on ${conn.connection.host}`.cyan.bold)
        } catch (err){
            console.log(`err:${err}`)
            process.exit(1)
        }
    } else {
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
}
module.exports = connectDB