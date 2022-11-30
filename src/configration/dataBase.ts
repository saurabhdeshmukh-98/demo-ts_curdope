import {MongoClient} from 'mongodb'

const url='mongodb://localhost:27017'//create url for connection

const client=new MongoClient(url)//connect url to the client

let db=client.db('test')//conecte to db


//exporting 
export{
    db
}