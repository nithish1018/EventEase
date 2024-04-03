require("dotenv").config();
const express = require("express");
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
const eventRoutes = require("./routes/eventRoutes")
const { default: OpenAI } = require("openai"); 
const app = express();

app.use(cors())

app.use(express.json());
const openai=new OpenAI({
    apiKey:process.env['OPENAI_AIP_KEY']
 })

 const systemPrompt=
 "You are an assistant helping a user manage their meetings and events list. " +
 "Given a message , you should extract event or meeting item from it. " +
 "The user may provide a start time and end time along with the event item. " +
 "To compute relatives dates, assume that the current timestamp is " +
 new Date().toISOString() +
 ". ";

 async function askChatGPT(question){
    try{
        const chatCompletion= await openai.chat.completions.create({
            messages: [
            {role: "system", content: systemPrompt},
            {role: "user",content:question}
        ],
            tools:[
                {
                    type:"function",
                    function:{
                        name:"createEvent",
                        description:"Create a new event",
                        parameters:{
                            type:"object",
                            properties:{
                                text:{
                                    type:"string",
                                    description:"The text of the event or meeting"
                                },
                                startsAt:{
                                    type:"string",
                                    description:"The time the event item starts at as ISO8601",
                                },
                                endsAt:{
                                    type:"string",
                                    description:"The time the event item ends at as ISO8601",
                                }
                            }
                        }
                    }

            }
        ],
        tool_choice:{type:"function",function:{name:"createEvent"}},
            model: "gpt-3.5-turbo" 
        });
        return chatCompletion.choices[0].message.tool_calls[0].function; 
       
    } catch(error){
        console.error("Error making a query: ",error);
        return null; 
    }
 }
 async function addEventWithGPT(question){
    const suggestion = await askChatGPT(question);
    if (suggestion){
        console.log("Response from ChatGPT: ", suggestion);
    } else{
        console.log("No response")
    }
 }

app.post('/add-natural', async (req,res)=>{
    await addEventWithGPT(req.body.naturalText);
    return null;
})
app.use("/api/users", userRoutes);

app.get('/',(req,res)=>{
    res.send("helloo")
})
app.get('/pm2Check', (req,res)=>{
    res.send('Hello, ')
})
app.get('/check',(req,res)=>{
    res.send("Checking")
})
app.use("/api/event", eventRoutes);



module.exports = app;