const express = require("express")
const app = express()
const port = 8000
const cors = require("cors")
const MongDB = require("./database")


const UserRouter = require("./Routes/UserRouter")
const BlogRouter = require("./Routes/BlogRouter")


MongDB();

app.use(express.json())
app.use(cors())



app.use('/api', UserRouter)
app.use('/api', BlogRouter)





app.get('/', (req, res) => {
    res.send("Blog backend is running");
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})