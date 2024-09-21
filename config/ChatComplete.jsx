import React, { useState } from 'react';

const ChatCompletion = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSend = async () => {
    const userMessage = { role: 'user', content: userInput };
    setMessages([...messages, userMessage]);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [...messages, userMessage]
      })
    });

    const data = await response.json();
    const botMessage = data.choices[0].message;
    setMessages([...messages, userMessage, botMessage]);
    setUserInput('');
  };

  return (
    <div className="ChatCompletion">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chatbot;
