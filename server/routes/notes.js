const express=require('express')

const router=express.Router()

const {    getAllNote,getNote,deleteNote,updateNote,createNote,updatePassword
}=require('../controllers/notes')


router.route('/').get(getAllNote).post(createNote).patch(updatePassword)
router.route('/:id').get(getNote).patch(updateNote).delete(deleteNote)

module.exports=router