const express  = require("express")
const mongoose = require("mongoose")
const app = express()

mongoose.connect("mongodb://localhost:27017/mongo-exercises").then(()=> console.log("Connected to DB"))

const courseSchema = new mongoose.Schema({
    name:String,
    date: {type: Date, default : Date.now},
    isPublished : Boolean,
    tags : [String],
    author : String,
    price : Number,
})

const Course = mongoose.model("Course",courseSchema)

const getCourse = async () => {

    const exerciseOneResult  = await Course.find({isPublished:true}).sort({name:-1}).select({name:1, author:1})
    const exerciseTwoResult = await Course.find({isPublished:true,tags:{$in: ["frontend", "backend"]}}).sort({price : 2}).select({name:1, author:1})
    console.log("result", exerciseOneResult)
}

getCourse()