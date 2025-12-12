"use client";
import { useState } from "react";
import { SpinnerIcon } from "@sanity/icons";
import {Bot, User} from 'lucide-react'

interface RoleProps {
  role : string,
  content : string
}

export default function Chat() {
  const [messages, setMessages] = useState<RoleProps[]>([])
  console.log("Messages :", messages)
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  async function sendMessage() {
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      setLoading(true);
      const res = await fetch("api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages([...newMessages, data.reply]);
        setLoading(false);
      }
    } catch (error) {
      throw new Error("Error while connecting to ai api");
    }
  }

  function getIcon (role : string) {
    if (role === 'assistant') return <Bot className="w-5 g-5 text-blue-500"/>
    return <User className="w-5 h-5 text-gray-500"/>
  }
  return (
    <div className="p-4">
      {messages
       
        .map((m, i) => (
          <div key={i} className="flex items-center gap-2">
            <div>{getIcon(m.role)}</div>
            <div className="bg-gray-100 p-2 rounded-lg max-w-[75%]">{m.role}:</div> {m.content}
          </div>
        ))}
      {loading && (
        <div className="flex items-center gap-2 text-gray-500 mt-2">
          <SpinnerIcon className="animate-spin" />
          <span>Responding...</span>
        </div>
      )}
      <div className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-1"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
