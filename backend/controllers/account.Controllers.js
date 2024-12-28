import mongoose from "mongoose";
import { Account } from "../models/account.models.js";



const checkBalance = async (req, res) =>{
    try {
       const userBalance = await Account.findOne({userId: req.userId});

       if(!userBalance) {
        return res.status(404).json({
            menubar: "userbalance not found",
            success: false,
        })
       }
       return res.json({
        message: "Balance ",
        balance: userBalance.balance
       })

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while retrieving the balance",
            error: error.message,
            success: false,
        })
    }
}

const transferMoney  = async (req, res)=> {
    
    const session = await mongoose.startSession()
    session.startTransaction();
    try {

        const {to, transferAmount} = req.body;
        const userId = req.userId;
        
        
        const user = await Account.findOne({userId: userId}).session(session);
        const toUser = await Account.findOne({userId: to}).session(session);
        
        if(transferAmount <= 0){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Ammount should be positive",
                success: false,
            })
        }
        if(!toUser){
            await session.abortTransaction();
            return res.status(404).json({
                message: "Invalid Account",
                success: false,
            });
        }

        
        if(!user || user.balance < transferAmount){
            await session.abortTransaction();
            return res.status(401).json({
                message: "Insufficient balance",
                success: false,
                
            })
        }
        
        user.balance -= transferAmount;
        toUser.balance += transferAmount;
        await user.save({session});
        await toUser.save({session});
        
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message: "money is transferred successfully",
            success: true,
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
           return res.status(400).json({
            message: "Somethng went wront while transffering money try again later!",
            error: error.message,
            success: false
           })
    }
}

export {checkBalance, transferMoney}