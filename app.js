const express = require("express");

const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/films");
}


const movieSchema = new mongoose.Schema({
    id: {type:String, required:true},
    movie_name : {type:String, required:true},
    movie_genre : {type:String, required:true},
    production_year : {type:Number, required:true},
    budget : {type:Number, required: true}
},{
    versionKey:false,
    timestamps:true,
})

const movies = mongoose.model("moviedata", movieSchema)

const app = express();

app.use(express.json());


app.get("/movies", async (req,res) => {
    try {
        const newMovie = await movies.find().lean().exec()
        return res.send({newMovie})
    }catch(e){
        res.status(500).json({message : e.message})
    }
})

app.post("/movies",async (req,res) => {
    try {
        const newMovie = await movies.create(req.body);
        return res.status(201).send(newMovie);
    }catch(e) {
        res.status(500).json({message: e.message})
    }
})

app.get("/movies/:id", async(req,res) => {
    try {
        const newMovie = await movies.findById(req.params.id).lean().exec();
        return res.send(newMovie);
    }catch(e) {
        res.status(500).json({message : e.message})
    }
})

app.patch("/movies/:id", async (req,res) => {
    try {
        const newMovie = await movieSchema.findByIdAndUpdate(req.params.id, req.body,{new:true}).lean().exec();
        return res.send({newMovie});
    }catch(e) {
        res.status(500).json({message:e.message});
    }
})

app.delete("/movies/:id", async(req,res) => {
    try {
        const newMovie = await movies.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(newMovie);
    }catch(e) {
        return res.status(201).json({message : e.message});
    }
})

app.listen(2345,()=>{
    console.log("listining on port 2345");
})