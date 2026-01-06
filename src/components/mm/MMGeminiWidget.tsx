
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const MMGeminiWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Assalamualaikum! Saya Malika AI. Ada yang bisa saya bantu mengenai parenting, produk, atau kelas kami?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Keep chat session state
  const [chat, setChat] = useState<Chat | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  // Initialize Chat Session once when opened
  useEffect(() => {
    if (isOpen && !chat) {
      try {
        // Fix: Use the correct named parameter for apiKey and select a modern model.
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const newChat = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: "Anda adalah AI Advisor untuk 'Malika Maliaki', sebuah brand lifestyle keluarga holistik. Gaya bicara Anda: Ramah, Islami (universal), bijaksana, dan menenangkan. Fokus topik: Parenting, pendidikan anak fitrah, produk herbal/alami, dan manajemen rumah tangga. Jika ditanya harga spesifik produk, arahkan ke katalog. Jawab dengan ringkas.",
          },
        });
        setChat(newChat);
      } catch (e) {
        console.error("Failed to init chat", e);
      }
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!chat) {
      setMessages(prev => [...prev, { role: 'user', text: input }, { role: 'model', text: 'Maaf, koneksi AI belum siap. Coba refresh.' }]);
      return;
    }

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      // Fix: Access .text property instead of calling .text() on the response.
      const response: GenerateContentResponse = await chat.sendMessage({ message: userMsg });
      const text = response.text;
      setMessages(prev => [...prev, { role: 'model', text: text || '...' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Mohon maaf, ada gangguan koneksi.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#755233] text-white px-6 py-3 rounded-full shadow-xl hover:scale-105 transition flex items-center gap-2 z-50 border-2 border-[#c59d56]"
      >
        <span>✨</span>
        <span className="font-nunito font-bold">Tanya Malika</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-[#755233]/20 h-[500px] animate-fadeIn">
      {/* Header */}
      <div className="bg-[#755233] p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-[#c59d56] rounded-full flex items-center justify-center text-sm">🤖</div>
           <h3 className="font-playfair font-bold">Malika AI Advisor</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">✕</button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#e3ebe3]/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm font-nunito ${
              msg.role === 'user' 
                ? 'bg-[#c59d56] text-white rounded-br-none' 
                : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white p-3 rounded-2xl text-xs text-gray-400 italic">Sedang mengetik...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tanya tips parenting..."
            className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#755233]"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-[#755233] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#5e4126] disabled:opacity-50"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default MMGeminiWidget;
