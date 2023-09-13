const express=require("express")
const app=express()
const cors=require("cors")
const axios=require("axios")

app.use(express.json())
app.use(cors())
require("dotenv").config()

const API_KEY=process.env.API_KEY


app.post("/convert",async(req,res)=>{
    const {language,code}=req.body
    const options={
        method:"POST",
        url:"https://api.openai.com/v1/chat/completions",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${API_KEY}`
        },
        data:{
            model:"gpt-3.5-turbo-0613",
            messages:[{role:"user",content:`Conver the ${code} into ${language}`}],
            max_tokens:1000,
        }
    }
    try{
        const response = await axios(options)
        const data = response.data
        console.log(data)
        console.log(data.choices[0].message.content)
        res.send(data.choices[0].message.content)
        
       
    

    }catch(err){
        console.log(err)
    }
})

app.listen(8080,()=>{
    console.log("listening to port 8080")
})