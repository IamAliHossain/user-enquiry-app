let exress = require('express')
let mongoose = require('mongoose')
const enquiryRouter = require('./App/routes/web/enquiryRoutes')
let cors = require('cors')
require('dotenv').config()
let app = exress()

app.use(exress.json())
app.use(cors())
//Routes
app.use('/api/website/enquiry', enquiryRouter)



//connect to MongoDB
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("DB is connected")
    app.listen(process.env.PORT || 3000, ()=>{
        console.log('Server is running!')
    })
}).catch((err) =>{
    console.log(err)
})