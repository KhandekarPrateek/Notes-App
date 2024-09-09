const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  //useful form meaningful errors
  let customError={
    //set deault
    statusCode:err.statusCode ||StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message||'something went wrong'
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  //this is the error code of mongoose validation and we got this errror from checking in postman
  if(err.code && err.code===11000){
    customError.msg='Duplicate emails',
    customError.statusCode=400
  }
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = 404
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({msg: customError.msg })

}

module.exports = errorHandlerMiddleware