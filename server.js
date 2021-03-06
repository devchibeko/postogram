require("dotenv").config()

const express = require("express")
const cors = require("cors")
const authRoutes = require('./routes/auth.routes.js')
const verficationRoutes = require('./routes/verication.routes.js')
const uploadRoutes = require('./routes/upload.routes.js')
const postRoutes = require('./routes/post.routes.js')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(authRoutes)
app.use(verficationRoutes)
app.use(uploadRoutes)
app.use(postRoutes)



const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log("Server is running", port);
})