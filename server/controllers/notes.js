const Note=require('../models/Notes')
const User = require('../models/user');
const {NotFoundError,BadRequestError}=require('../errors')
const createNote=async(req,res)=>{
    req.body.createdBy=req.user.userId
   const note=await Note.create(req.body)
   res.status(200).json({note})
}
const deleteNote=async(req,res)=>{
    const userId = req.user.userId;
    const NoteId = req.params.id;
    const note=await Note.findByIdAndDelete({
        _id:NoteId,
        createdBy:userId
    })
    if(!note){
        throw new NotFoundError('no such note ')
    }
    res.status(200).send()
}

const getNote=async(req,res)=>{
    const userId = req.user.userId;
    const noteId = req.params.id;
    const note=await Note.findOne({
        _id:noteId,
        createdBy:userId
    })
    if(!note){
        throw new NotFoundError('no such note ')
    }
    res.status(200).json({singleNote:note})

}
const updateNote=async(req,res)=>{
    const {title,content}=req.body
    
    const userId = req.user.userId;
    const noteId = req.params.id;
     // Update note
  const note = await Note.findOneAndUpdate(
    { _id: noteId, createdBy: userId },  // Matching both the note ID and the user ID
    req.body,
    { new: true, runValidators: true }  // Ensure `runValidators` is set to `true`
  );
    if(title===''|| content===''){
    
        throw new BadRequestError('give updated values')
    }
    if(!note){
        throw new NotFoundError('no such note ')
    }
    res.status(200).json({note})
}
const getAllNote=async(req,res)=>{
    const notes=await Note.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(200).json({notes,count:notes.length})
}
const updatePassword = async (req, res) => {
    const userId = req.user.userId; // Extract userId from authenticated token
    const { newPassword } = req.body;
  
    // Ensure the new password is provided
    if (!newPassword) {
      throw new BadRequestError('Please provide a new password');
    }
  
    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      throw new UnauthenticatedError('User not found');
    }
  
    // Update the user's password (bcrypt will hash it in the pre-save hook)
    user.password = newPassword;
    await user.save();
  
    res.status(200).json({ msg: 'Password updated successfully' });
  };
module.exports={
    getAllNote,getNote,deleteNote,updateNote,createNote,updatePassword
}