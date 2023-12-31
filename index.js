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
            messages:[{role:"user",content:`Act as a Code Convertor,Just Convert the ${code} into ${language}.Don't give any explanations`}],
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



app.post("/debug",async(req,res)=>{
    const {code}=req.body
    const options={
        method:"POST",
        url:"https://api.openai.com/v1/chat/completions",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${API_KEY}`
        },
        data:{
            model:"gpt-3.5-turbo-0613",
            messages:[{role:"user",content:`Act as a Code Debugger,Just Debug the ${code} and explain if any error or problems exist and provide the solution as well`}],
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


app.post("/quality",async(req,res)=>{
    const {code}=req.body
    const options={
        method:"POST",
        url:"https://api.openai.com/v1/chat/completions",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${API_KEY}`
        },
        data:{
            model:"gpt-3.5-turbo-0613",
            messages:[{role:"user",content:`Act as a Code Assessment Expert,Just Evaluate the ${code} and give a detailed report. Evaluation must be based on the following parameter,Code Consistency,Code Performance,Code Documentation,Error Handling,Code Testability,Code Modularity,Code Complexity,Code Duplication,Code Readability. At the end, give percentage wise evaluation of the parameter ranging from 0% to 100%`}],
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