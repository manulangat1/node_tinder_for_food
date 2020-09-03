const mongoose = require('mongoose')
const colors = require('colors')

const close = async () => {
    try{
       await  mongoose.disconnect()
       console.log('disconnected')
    } catch (err){
        console.log(`err:${err}`)
        process.exit(1)
    }
}
module.exports = close