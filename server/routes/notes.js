const express=require('express')

const router=express.Router()

const {    getAllNote,getNote,deleteNote,updateNote,createNote
}=require('../controllers/notes')


router.route('/').get(getAllNote).post(createNote)
router.route('/:id').get(getNote).patch(updateNote).delete(deleteNote)

module.exports=router