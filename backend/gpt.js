require("dotenv").config();
const { default: OpenAI } = require("openai"); 
const openai=new OpenAI({
    apiKey:process.env['OPENAI_API_KEY']
 })

 const systemPrompt=
 "You are an assistant helping a user manage their meetings and events list. " +
 "Given a message , you should extract event or meeting item from it. " +
 "The user may provide a start time and end time along with the event item. " +
 "If the user didn't provide neither proper text or startsAt or endsAt content then strictly return undefine in those fields. " +
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
        return suggestion;
    } else{
        console.log("No response")
    }
 }
 module.exports = { addEventWithGPT };
