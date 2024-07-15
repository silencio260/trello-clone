import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    const { todos } = await request.json()
    console.log(todos)


    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: false,
        temperature: 0.8,
        n: 1,
        messages: [
            { 
                role: 'system', 
                content: `when respondoing, welcome the 
                user to the Trello Tracker and Limit the 
                respone to 200 characters`,
            },
            {
                role: 'user',
                content: `Hi there, provide a summary of the followin todos, Count how many todos 
                are in each category such as To do, in progress, 
                and done then tell the user to have productive day! 
                Here's the data ${JSON.stringify(todos)}`,
            },
        ],
    });

    // const { data } = response;

    console.log('DATA IS: ', response);
    console.log(response.choices[0].message)

    return NextResponse.json(response.choices[0].message)
    
}