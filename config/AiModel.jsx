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

  export const GenearteCourseChapterContent_AI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Explain the concept in Detail on Topic : Python : Chapter Introduction to Data Structures: Lists and Dictionaries : in JSON format with list of array with field as title description in details Code Example (Code field in <precode> format) if applicable"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"title\": \"Introduction to Data Structures\",\n    \"description\": \"Data structures are fundamental building blocks in programming, allowing us to organize and store data efficiently. They provide a way to manage collections of information and enable us to perform operations on those collections. Python offers various built-in data structures, each with its own strengths and weaknesses, making it crucial to understand their characteristics and applications.\"\n  },\n  {\n    \"title\": \"Lists: Ordered and Mutable Collections\",\n    \"description\": \"Lists in Python are ordered sequences of elements. They are enclosed in square brackets `[]` and can contain elements of different data types. Lists are mutable, meaning you can modify their elements after creation. They are versatile and widely used for storing and manipulating collections of items.\"\n  },\n  {\n    \"title\": \"Creating and Accessing Lists\",\n    \"description\": \"Lists are created using square brackets `[]` and elements separated by commas. You can access elements by their index (starting from 0), or by slicing to extract a portion of the list.\",\n    \"code\": \"<precode>\\n# Creating a list\\nmy_list = [1, 2, 'hello', True]\\n\\n# Accessing elements\\nprint(my_list[0])  # Output: 1\\nprint(my_list[2])  # Output: hello\\nprint(my_list[1:3])  # Output: [2, 'hello']\\n</precode>\"\n  },\n  {\n    \"title\": \"Modifying Lists\",\n    \"description\": \"Lists are mutable, allowing you to change their elements after creation. You can add, remove, or modify elements using various methods.\",\n    \"code\": \"<precode>\\n# Adding elements\\nmy_list.append(5)  # Adds 5 to the end\\nmy_list.insert(1, 'world')  # Inserts 'world' at index 1\\n\\n# Removing elements\\nmy_list.remove('hello')  # Removes the first occurrence of 'hello'\\ndel my_list[0]  # Deletes element at index 0\\n\\n# Modifying elements\\nmy_list[1] = 'new_value'  # Changes the element at index 1\\n</precode>\"\n  },\n  {\n    \"title\": \"List Operations\",\n    \"description\": \"Python provides several built-in operations for working with lists, such as concatenation, repetition, and membership testing.\",\n    \"code\": \"<precode>\\n# Concatenation\\nlist1 = [1, 2, 3]\\nlist2 = [4, 5, 6]\\ncombined_list = list1 + list2  # Output: [1, 2, 3, 4, 5, 6]\\n\\n# Repetition\\nrepeated_list = [1, 2] * 3  # Output: [1, 2, 1, 2, 1, 2]\\n\\n# Membership testing\\n'hello' in my_list  # Output: True\\n</precode>\"\n  },\n  {\n    \"title\": \"Dictionaries: Key-Value Pairs\",\n    \"description\": \"Dictionaries in Python store data as key-value pairs. Keys are unique and immutable, while values can be any data type. Dictionaries are unordered and mutable, making them suitable for representing collections where elements are accessed by their associated keys.\"\n  },\n  {\n    \"title\": \"Creating and Accessing Dictionaries\",\n    \"description\": \"Dictionaries are created using curly braces `{}`, with key-value pairs separated by colons `:`. You can access values by their corresponding keys.\",\n    \"code\": \"<precode>\\n# Creating a dictionary\\nmy_dict = {'name': 'Alice', 'age': 30, 'city': 'New York'}\\n\\n# Accessing values\\nprint(my_dict['name'])  # Output: Alice\\nprint(my_dict['age'])  # Output: 30\\n</precode>\"\n  },\n  {\n    \"title\": \"Modifying Dictionaries\",\n    \"description\": \"Dictionaries are mutable, allowing you to add, remove, or modify key-value pairs after creation.\",\n    \"code\": \"<precode>\\n# Adding key-value pairs\\nmy_dict['occupation'] = 'Software Engineer'\\n\\n# Removing key-value pairs\\ndel my_dict['age']\\n\\n# Modifying values\\nmy_dict['city'] = 'Los Angeles'\\n</precode>\"\n  },\n  {\n    \"title\": \"Dictionary Operations\",\n    \"description\": \"Python provides various operations for working with dictionaries, such as checking for key existence, iterating over key-value pairs, and getting all keys or values.\",\n    \"code\": \"<precode>\\n# Checking for key existence\\n'name' in my_dict  # Output: True\\n\\n# Iterating over key-value pairs\\nfor key, value in my_dict.items():\\n  print(f'{key}: {value}')\\n\\n# Getting keys and values\\nprint(my_dict.keys())  # Output: dict_keys(['name', 'occupation', 'city'])\\nprint(my_dict.values())  # Output: dict_values(['Alice', 'Software Engineer', 'Los Angeles'])\\n</precode>\"\n  }\n]\n```"},
          ],
        },
      ],
    });
  
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());