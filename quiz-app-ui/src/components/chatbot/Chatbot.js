import React, { useState, useEffect } from 'react';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
const { GoogleGenerativeAI } = require("@google/generative-ai");

const Chatbot = () => {
  const [genAI, setGenAI] = useState(null);
  const [chatModel, setChatModel] = useState(null);
  const [chatInstance, setChatInstance] = useState(null);

  useEffect(() => {
    // Initialize Google Generative AI instance
    const initializeGenerativeAI = async () => {
      const genAIInstance = new GoogleGenerativeAI("AIzaSyA8nr9Sxcfj3UQIdjd1t588Oil4OzWWcAA");

      setGenAI(genAIInstance);

      // Load the model
      const model = genAIInstance.getGenerativeModel({ model: "gemini-1.5-flash" });
      setChatModel(model);

      // Start chat instance
      const chat = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 100
        }
      });
      setChatInstance(chat);
    };

    initializeGenerativeAI();
  }, []);

  const handleNewUserMessage = async (newMessage) => {
    addUserMessage(newMessage);

    try {
      // Ensure chat instance is loaded
      if (!chatInstance) {
        addResponseMessage('Chatbot initializing...');
        return;
      }

      // Send message to chat instance
      const result = await chatInstance.sendMessage(newMessage);
      const response = await result.response;
      const text = response.text();
      addResponseMessage(text);

    } catch (error) {
      console.error('Error sending message:', error);
      addResponseMessage('Error processing request.');
    }
  };

  return (
    <div className="chatbot">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Chatbot"
        subtitle="Ask me anything!"
      />
    </div>
  );
};

export default Chatbot;
