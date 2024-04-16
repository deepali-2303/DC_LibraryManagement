const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name:{
        type:String,
        unique: true,
        required: [true, "Please add a password"]
    },
    author:{
        type:String,
        required: [true, "Please add a password"]
    },
    language:{
        type:String,
        default:"",
        required: [true, "Please add a password"]
    },
    publisher:{
        type:String,
        default:"",
        required: [true, "Please add a password"]
    },
    count:{
        type:Number,
        required: [true, "Please add a password"]
        
    },
    status:{
        type:String,
        default:"Available",
        required: [true, "Please add a password"]
    },
    category:{ 
        type: String, 
        required: [true, "Please add a password"]
    },
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
  }]
},
{
    timestamps:true
})

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;