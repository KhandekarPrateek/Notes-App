// Mongo123@
require('dotenv').config()
require('express-async-errors');
const express=require('express')
const app=express() 
//security packages
const xss=require('xss-clean')
const helmet=require('helmet')
const cors=require('cors')
const ratelimiter=require('express-rate-limit')
const authRoute=require('./routes/auth')
//db 
const connectdb=require('./db/connect')
//routes import 
const notesRoute=require('./routes/notes')

//middleware
const auth=require('./middleware/auth')
const errorHandler=require('./middleware/error-handler')
const notFound=require('./middleware/not-found')
//port

app.set('trust proxy',1)//for deployemnet 
app.use(ratelimiter({
    windowMs:15*60*1000,//15 minutes
    max:100,//limit each ip address to 100 requests only 
}))
app.use(express.json());
//security
app.use(helmet())
app.use(cors())
app.use(xss())
//routes
app.use('/auth',authRoute)
app.use('/notes',auth,notesRoute)//auth is put before notesRoute to check tokens 
app.use(notFound)
app.use(errorHandler)
const port=process.env.PORT || 3000
const start=async()=>{
    try {
        await connectdb(process.env.MONGO_URL)
        app.listen(port,()=>{
            console.log(`server is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()