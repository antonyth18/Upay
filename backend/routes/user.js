const express = require("express");
const userRouter = express.Router();
const z = require("zod");
const { User, Accounts } = require("../db");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config");
const authMiddleware = require("../middleware");

const userSchema = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string()
})

userRouter.post('/signup', async (req, res) => {
    const userData = userSchema.safeParse(req.body);
    if(userData.success) {
        const existingUser = await User.findOne({username : req.body.username});
        if(existingUser) {
            return res.status(411).json({
                message: "Email already taken.."
            });
        } else{
            const user = await User.create({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
            });

            const userId = user._id;
            const token = jwt.sign({
                userId: userId
            }, JWT_SECRET);

            await Accounts.create({
                userId: userId,
                balance: 10000
            })
            return res.status(200).json({
                message: "User created successfully",
	            token: token
            });
        }
    } else {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }
})

const signinSchema = z.object({
    username: z.string().email(),
    password: z.string()
})

userRouter.post("/signin", async (req, res) => {
    const signinData = signinSchema.safeParse(req.body);
    if(!signinData.success) {
        return res.status(411).json("Incorrect sign in credentials");
    }

    const userReq = await User.findOne({username: req.body.username});
    if(!userReq) {
        return res.status(411).json("User does not exist");
    }

    const id = userReq._id;

    const token = jwt.sign({
        userId: id
    }, JWT_SECRET);

    return res.status(200).json({
        token: token
    })
})

const updateBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

userRouter.put("/", authMiddleware, async (req, res) => {
    const updateData = updateBody.safeParse(req.body);
    if(!updateData.success) {
        return res.status(411).json({
            message: "Information cannot be updated with present inputs"
        })
    }

    await User.updateOne({_id:req.userId}, req.body);

    res.status(200).json({
        message: "Update successfully"
    })
})

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    let userFound = await User.find({
        $or: [
        {
            firstName: { "$regex": filter, "$options": "i" }
        },
        {
            lastName: { "$regex": filter, "$options": "i" }
        }
    ]
    });

    if(userFound.length == 0) {
        return res.json({
            message: "No users by this name"
        })
    };

    return res.json({
        users: userFound.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = userRouter;