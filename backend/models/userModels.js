import mongoose from "mongoose";
import express from "express";
import bcrypt from 'bcrypt'


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,

    },},
    {timestamps: true}
)

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        console.log('passoword is hashed', this.password);
        next();
    } catch (error) {
        next(error);
    }
});


userSchema.methods.isPasswordCorrect = function(password){
    return bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema);