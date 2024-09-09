const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide note title'],
      maxlength: 50,
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
      maxlength: 500,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,//ties the object model with our user model 
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Notes', NotesSchema)