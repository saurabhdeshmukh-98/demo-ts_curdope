import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { router } from './router/router'
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',router)

app.listen(9090,()=>{
    console.log("listen on port 9090")
})