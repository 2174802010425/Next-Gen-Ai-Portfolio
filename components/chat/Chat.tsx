"use client";
import { useState, useRef, useEffect } from "react";
import { SpinnerIcon } from "@sanity/icons";
import { Bot, User, SendHorizontal } from 'lucide-react';

interface RoleProps {
  role: string;
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<RoleProps[]>([
    { role: 'assistant', content: 'Hi there! I am Jordan\'s AI. How can I help you today?' }
  ]);
  console.log('messages :', messages)
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages([...newMessages, data.reply]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-100 shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-50 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          AI Assistant
        </h3>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${m.role === 'user' ? 'bg-black text-white' : 'bg-blue-50 text-blue-600'}`}>
                {m.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
              </div>
              <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}>
                {m.content}
              </div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Bot size={18} />
            </div>
            <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
              <SpinnerIcon className="animate-spin" />
              <span className="text-xs text-gray-500 font-medium">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-50 bg-white">
        <div className="relative flex items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me anything..."
            className="w-full pl-4 pr-12 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
          />
          <button 
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="absolute right-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <SendHorizontal size={18} />
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-2">
          Jordan Truong AI - Powered by OpenAI
        </p>
      </div>
    </div>
  );
}