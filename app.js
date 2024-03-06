require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const NotFoundError = require('./middleware/not-found')
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user')
const authRouter = require('./routes/Auth')
const connectDB = require('./db/connect')
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET));




app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',userRouter)




app.use(NotFoundError)

const start = async ()=>{
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(PORT, ()=> console.log(`Server is listening on Port ${PORT} ...`))
    } catch (error) {
        console.log(error)
    }
}

start()

