const express = require("express");
const { Accounts } = require("../db");
const authMiddleware = require("../middleware");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance",authMiddleware, async (req, res) => {
    const id = req.userId;
    const accounts = await Accounts.findOne({userId : id});

    if(!accounts) {
        return res.status(403).json({
            message: "User does not exist"
        })
    }

    return res.status(200).json({
        balance: accounts.balance
    })
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const amount = req.body.amount;
    const to = req.body.to;

    const account = await Accounts.findOne({userId: req.userId}).session(session);

    if(!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Accounts.findOne({userId: to}).session(session);

    if(!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Accounts.updateOne({userId : req.userId}, {$inc: {balance: -amount}}).session(session);
    await Accounts.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);

    await session.commitTransaction();

    res.status(200).json({
        message: "Transfer successful"
    })
})

module.exports = router;