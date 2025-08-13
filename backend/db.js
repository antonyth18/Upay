const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://antonyth1818:Snehajoju%4018@cluster0.jpsnecq.mongodb.net/paytm-db");

const userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('User', userSchema);
const Accounts = mongoose.model('Accounts', accountSchema);

module.exports = {
    User,
    Accounts
};