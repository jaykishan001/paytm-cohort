import {z} from "zod"
import { User } from "../models/userModels.js"
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Account } from "../models/account.models.js";

export const blacklist = new Set();

const signUpSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(100),
});

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
});

const updateUserSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().optional(),
})
const signUp = async (req, res)=> {
    
    const validateData =  signUpSchema.parse(req.body);
    try {
        const userExist = await User.findOne({email: validateData.email})
        if(userExist){
            return res.status(409).json({
                message: 'User already exist',
                success: false,
            })
        }

        const user = await User.create(validateData);

        // const token = jwt.sign({userId: user._id},
        //     process.env.JWT_SECRET, 
        // );
        // console.log(token);

        const accountCreated = await Account.create({userId: user._id, balance: 1 + Math.random()*1000});


       return res.status(201).json({
            message: 'User created successfully',
            balance: accountCreated.balance,
        })
    
    } catch (error) {

        if(error instanceof z.ZodError) {
            return res.status(400).json({
                message: error.errors,
                success: false,
            });
        }

        res.status(500).json({
            message: 'User not created successfully',
            error: error.message,
            success: false,
        })
    }

}

const signIn = async (req, res)=> {
    try {
        const validateData = signInSchema.parse(req.body);

        const user = await User.findOne({ email: validateData.email });
        if(!user){
            return res.status(401).json({
                message: 'Invalid email or password',
                success: false,
            })
        }
        const validatePassWord = await user.isPasswordCorrect(validateData.password);

        if(!validatePassWord){
            return res.status(401).json({
                message: 'Invalid password',
                success: false,
            })
        }
        
       const token  = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
       console.log(token);

       return res.json({
            message: 'User logged in successfully',
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                token: token
            },
            success: true,
        })

    } catch (error) {

        if(error instanceof z.ZodError) {
            return res.status(400).json({
                message: error.errors,
                success: false,
            });
        }

        res.status(500).json({
            message: 'User not logged in successfully',
            error: error.message,
            success: false,
        })
    }
}

const updateUser = async(req, res)=> {

    const {success}= updateUserSchema.safeParse(req.body)

    if(!success) {
        return res.status(400).json({
            message: 'fileds are not valid',
            success: false,
        })
    }
    try {
        const updateData = {};
        if(req.body.firstName) updateData.firstName = req.body.firstName
        if(req.body.lastName) updateData.lastName = req.body.lastName;
        if(req.body.password) {updateData.password = await bcrypt.hash(req.body.password, 10)}

        const user = await User.findByIdAndUpdate(
            req.userId, 
            updateData,
            {new: true}
            );

            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                    success: false,
                });
            }
            await user.save();
            return res.json({
                
                message: 'User updated successfully',
                user: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
                success: true,
            })    

    } catch (error) {
        return res.status(500).json({
            message: 'User not updated successfully',
            error: error.message,
            success: false,
        })
    }

}

const logout = async (req, res) => {

        const token = req.headers.authorization?.split(" ")[1];

    try {
        if (!req.userId) {
            return res.status(400).json({
                message: 'User ID is missing',
                success: false,
            });
        }
        const user = await User.findByIdAndUpdate(
            req.userId,
            { token: null },
            { new: true }
        );


        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false,
            });
        }

        blacklist.add(token);
        res.status(200).json({
            message: 'User logged out successfully',
            success: true,
        });

    } catch (error) {
    
        return res.status(500).json({
            message: 'User not logged out successfully',
            error: error.message,
            success: false,
        });
    }
};


const getAllUsers = async(req, res) => {

    const filter = req.query.filter || "";

    try {
        const users = await User.find({
            $or:
             [
                {
                firstName: { $regex: filter, $options: "i"},
                },
                {
                lastName: { $regex: filter,  $options: "i"},
                }
                
             ]
        });
        return res.json({
            user:   users.map(user=> ({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    _id: user._id
                }))
        })
    } catch (error) {
        return res.json({
            message: 'Error getting users',
            error: error.message,
            success: false,
        })
    }
}

export {signIn, signUp, updateUser, logout, getAllUsers};