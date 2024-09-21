"use client";
import { ChatBotContext } from "@/app/_context/ChatBotContext";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
// Define predefined categories
const predefinedCategories = {
  Hi: "Hi! This is Course Generator Bot ,  Feel Free to ask me anything",
  "who are you":
    "I am your friendly chatbot here to help you with any questions you have about Website Course Generator.",
  "what is Cousre Generator":
    "This is a platform for user to generate Course using Basic Selection",
  "tell me about yourself":
    "I am here to help with any questions you have. Feel free to ask me anything.",
  "what is your role":
    "My role is to assist you by providing helpful information and answering your queries.",
  // Add more predefined responses and their keywords as needed
};

const ChatBot = ({ setOpenChatBot }) => {
  const { chatBotMessaages, setChatBotMessages } = useContext(ChatBotContext);
  const [inputText, setInputText] = useState("");
  const chatRef = useRef();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatBotMessaages]);

  const handleInputText = (e) => {
    setInputText(e.target.value);
  };

  const getPredefinedResponse = async (message) => {
    // Define the predefined responses for the AI to consider
    const predefinedContext = {
      Hi: "Hi! This is Course Generator Bot ,  Feel Free to ask me anything",
      "who are you":
        "I am your friendly chatbot here to help you with any questions you have about Website Course Generator.",
      "what is Cousre Generator":
        "This is a platform for user to generate Course using Basic Selection",
      "tell me about yourself":
        "I am here to help with any questions you have. Feel free to ask me anything.",
      "what is your role":
        "My role is to assist you by providing helpful information and answering your queries.",
    };

    // Use AI to determine if the message fits into any of these predefined categories
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a chatbot that provides predefined responses for certain questions. ${predefinedContext}`,
          },
          {
            role: "user",
            content: `Determine which predefined response, if any, matches the user's question: "${message}"`,
          },
        ],
      }),
    });

    console.log("prede");

    const data = await response.json();
    const aiResponse = data.choices[0].message.content.toLowerCase();

    // Match the AI response with predefined categories
    const matchedCategory = Object.keys(predefinedCategories).find((category) =>
      aiResponse.includes(category)
    );

    return matchedCategory ? predefinedCategories[matchedCategory] : null;
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      if (inputText.length > 0) {
        const userMessage = {
          content: inputText,
          role: "user",
        };

        // Add user message to chat
        setChatBotMessages((prev) => [...prev, userMessage]);

        // Fetch response from OpenAI API
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [...chatBotMessaages, userMessage],
            }),
          }
        );

        const data = await response.json();
        const botMessage = data.choices[0].message;
        setChatBotMessages((prev) => [...prev, botMessage]);
        setInputText("");
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className="absolute w-[20px] h-[20px] top-2 left-2 flex justify-center items-center cursor-pointer"
        onClick={() => setOpenChatBot(false)}
      >
        <RxCross2 />
      </div>
      <div
        className="h-[315px] tailwind-scrollbar scrollbar-custom overflow-y-auto mb-2 relative z-10 cursor-pointer"
        ref={chatRef}
      >
        {chatBotMessaages?.map((chat, index) => (
          <div
            key={index}
            className={`p-2 m-1 rounded-sm max-w-[85%] w-auto text-wrap ${
              chat.role === "user"
                ? "mr-auto bg-slate-900" // Align to right when it's the user
                : "ml-auto bg-slate-700 text-right" // Align to left when it's the bot
            }`}
          >
            <div>{chat.content}</div>
          </div>
        ))}
      </div>
      <Input
        placeholder="Email"
        className="bg-gray-500 text-gray-200"
        value={inputText}
        onChange={(e) => handleInputText(e)}
        onKeyDown={(e) => handleKeyPress(e)}
      />
    </div>
  );
};

export default ChatBot;
