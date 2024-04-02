require("dotenv").config();

const app=require('./app')
const port=process.env.PORT || 5020

app.listen(port, ()=>{
    console.log(`API is listening to ${port}.`)
})