/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  export const GenearteCourseLayout_AI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a course Tutororials on Following Details with fields as Course Name ,Description, Along with Chapter Name , about , duration : Category:\"Programming\", Topic:\"Python\", Level : \"basic\" , Duration : \"1 hours\" , NoOfChapter : 5 , in JOSN format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"course\": {\n    \"name\": \"Python Programming for Beginners\",\n    \"description\": \"A comprehensive introduction to the Python programming language, designed for absolute beginners with no prior coding experience. This course will cover the fundamental concepts of Python syntax, data types, variables, operators, control flow, functions, and basic data structures.\",\n    \"category\": \"Programming\",\n    \"topic\": \"Python\",\n    \"level\": \"basic\",\n    \"duration\": \"1 hour\",\n    \"chapters\": [\n      {\n        \"name\": \"Introduction to Python\",\n        \"about\": \"This chapter will introduce you to the basics of Python programming, including its history, applications, and how to set up your programming environment.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"name\": \"Python Syntax and Data Types\",\n        \"about\": \"Learn about the fundamental syntax of Python, including keywords, identifiers, operators, and data types like integers, floats, strings, and booleans.\",\n        \"duration\": \"20 minutes\"\n      },\n      {\n        \"name\": \"Variables and Operators\",\n        \"about\": \"Explore how to declare and assign values to variables in Python. Learn about different types of operators, including arithmetic, comparison, and logical operators.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"name\": \"Control Flow: Conditional Statements and Loops\",\n        \"about\": \"Master the concept of control flow, including conditional statements (if-else) and loops (for, while) to create dynamic and interactive programs.\",\n        \"duration\": \"20 minutes\"\n      },\n      {\n        \"name\": \"Functions and Data Structures\",\n        \"about\": \"Learn about functions in Python, including defining, calling, and passing arguments. Get introduced to basic data structures like lists, tuples, and dictionaries.\",\n        \"duration\": \"10 minutes\"\n      }\n    ]\n  }\n}\n```"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());