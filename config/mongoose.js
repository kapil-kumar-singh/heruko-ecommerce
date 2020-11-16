const mongoose = require('mongoose');
const env = require('dotenv').config({path : './.env'});
// console.log(process.env.Mongodb_user,process.env.Mongodb_password,process.env.db)

// mongoose.connect(`mongodb+srv://${process.env.Mongodb_user}:${process.env.Mongodb_password}@cluster0.2qzjz.mongodb.net/${process.env.db}?retryWrites=true&w=majority`,{
mongoose.connect(`mongodb://kapil:!2345@cluster0-shard-00-00.6hlzb.mongodb.net:27017,cluster0-shard-00-01.6hlzb.mongodb.net:27017,cluster0-shard-00-02.6hlzb.mongodb.net:27017/herokueccom?ssl=true&replicaSet=atlas-u8wkj9-shard-0&authSource=admin&retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
// .catch(error => console.log(error));


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to mongoDb'));
db.once('open', function(){
    console.log('Connected To The Database :: MongoDB');
});
module.exports = db;
