const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: "sk-proj-3s18DRXqj4mjgTtVT2NqT3BlbkFJuhIuD6AqrOIO71CKdyHJ",
});

const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        {
            role: "system",
            content: `You are given a list of API response structures with their data types. Based on these structures, generate a canonical schema where each key is prefixed with 'Mobius_PI_' and mapped to the corresponding data type. Ensure that the keys are flattened and formatted to be human-readable.

            Here is the list of keys and their types: ${JSON.stringify(keysWithTypes)}.

            Example of the expected output:
            {
                'Mobius_PI_DirectTime": 'string',
                'Mobius_PI_DirectProductType': 'string',
                'Mobius_PI_DirectUserType': 'string',
                'Mobius_PI_DirectAvgCost': 'number',
                'Mobius_PI_DirectStorageGrowth': 'number',
                'Mobius_PI_DirectCostFluctuation': 'boolean'
            }`
        }
    ]
});





const messageContent = response.choices[0].message.content.trim();