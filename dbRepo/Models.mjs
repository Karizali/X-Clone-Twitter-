import mongoose from 'mongoose';
import mongoDBURI from './MongoDBURL.mjs'

let tweetSchema = new mongoose.Schema({
    tweetText: { type: String, required: true },
    owner: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
});
export const tweetModel = mongoose.model('tweets', tweetSchema);

let userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
});
export const userModel = mongoose.model('users', userSchema);



/////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(mongoDBURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {   //connected Check 
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {   //disconnected Check
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////