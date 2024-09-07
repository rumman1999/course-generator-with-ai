import { NextResponse } from 'next/server';
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Store API key in environment variables
});

// POST request handler
export async function POST(request) {
  const { courseName, chapterName } = await request.json(); // Parse the incoming request body

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert in video search and video platforms. The user needs a valid YouTube video ID for the following course and chapter:
    
          Course Name: "${courseName}"
          Chapter Name: "${chapterName}"
    
          Provide a list of 5  valid YouTube video ID. Ensure that the video ID corresponds to an existing and relevant video. The output should be a JSON object with the video ID in an array. 
          making sure the videId is a valid Youtube video Id , Example:
          {
              "videoId": ["xv2AkVBTzl0" , "Y8Tko2YC5hA" , "Y8Tko2YC5hA" , "Y8Tko2YT5hA" ,"Y8Tko2Yb5hA"]
          }`
        }
      ]
    });
    

    const videoIdString = response.choices[0].message.content.trim();

    // Parse the JSON string into a JavaScript object
    let videoIdObject;
    try {
      videoIdObject = JSON.parse(videoIdString);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return NextResponse.json({ error: "Error parsing JSON from OpenAI response" }, { status: 500 });
    }
    
    // Check if videoId is present and is an array
    if (videoIdObject && Array.isArray(videoIdObject.videoId)) {
      return NextResponse.json({ videoId: videoIdObject.videoId });
    } else {
      return NextResponse.json({ error: "Unexpected format of OpenAI response" }, { status: 500 });
    }
  } catch (error) {
    console.error('Error fetching from OpenAI:', error);
    return NextResponse.json({ error: "Error fetching from OpenAI" }, { status: 500 });
  }
}
