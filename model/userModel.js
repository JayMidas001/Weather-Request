const mongoose = require(`mongoose`)

const mySchema = new mongoose.Schema({
    Firstname:{type:String,set: (entry) => {
        const capitalize =
        entry.charAt(0).toUpperCase() + entry.slice(1).toLowerCase();
          return capitalize;},required:[true,'Kindly enter your first name']},
    Lastname:{type:String,set: (entry) => {
        const capitalize =
        entry.charAt(0).toUpperCase() + entry.slice(1).toLowerCase();
          return capitalize;},required:[true,'Kindly enter your last name']},
    Email:{type:String,set: (entry) => {
        const capitalize =
        entry.charAt(0).toUpperCase() + entry.slice(1).toLowerCase();
          return capitalize;},required:[true,'Kindly enter your email'],unique:[true,'Email entered is already in use']},
    CurrentDate:{type:String},
    IpAddress:{type:String},
    Country:{type:String},
    State:{type:String},
    CurrentWeather:{type:String},
    TemperatureReading:{type:String}
},{timestamps:true})

 weatherModel = mongoose.model('Weather Request',mySchema)

 module.exports = weatherModel
