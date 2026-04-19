import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const AIChat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };
    setChat((prev) => [...prev, userMsg]);
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "https://dr-ease.onrender.com/api/ai/chat",
        { message }
      );

      const aiMsg = { sender: "ai", text: res.data.reply };
      setChat((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <>
      {/* ✨ Floating Premium Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-6 right-6 z-[999]
        bg-gradient-to-r from-[#06353b] to-[#0E5C63]
        text-white px-7 py-3 rounded-full
        shadow-[0_20px_60px_rgba(6,53,59,0.5)]
        border border-white/10
        text-sm tracking-wide"
      >
        AI Chat
      </motion.button>

      {/* ✨ Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 right-6 z-[999]
            w-[380px] max-w-[95vw]
            max-h-[85vh]
            bg-white/70 backdrop-blur-xl
            border border-white/30
            rounded-3xl
            shadow-[0_40px_120px_rgba(0,0,0,0.3)]
            flex flex-col overflow-hidden"
          >
            {/* ✅ Header */}
            <div className="relative px-6 py-5 bg-gradient-to-r from-[#06353b] to-[#0E5C63] text-white">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

              <div className="relative flex justify-between items-center">
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-white/70">
                    Private Assistant
                  </p>
                  <h3 className="text-lg font-light mt-1">
                    Clinic Concierge
                  </h3>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="text-white/70 hover:text-white text-xl transition"
                >
                  ×
                </button>
              </div>
            </div>

            {/* ✅ Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 bg-gradient-to-b from-white to-[#F4F8F7] text-sm">
              <AnimatePresence>
                {chat.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${
                      msg.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] px-5 py-3 rounded-2xl leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-[#06353b] text-white shadow-md rounded-br-md"
                          : "bg-white text-[#06353b] border border-[#06353b]/10 shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* ✅ Typing Indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-[#06353b]/10 px-4 py-3 rounded-2xl shadow-sm flex space-x-2">
                    <span className="w-2 h-2 bg-[#D4B26A] rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-[#D4B26A] rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-[#D4B26A] rounded-full animate-bounce delay-300"></span>
                  </div>
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* ✅ Input Section */}
            <div className="flex items-center px-5 py-4 border-t border-[#06353b]/10 bg-white">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about treatments..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#06353b]/40"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />

              <button
                onClick={sendMessage}
                className="ml-4 text-sm tracking-wide text-[#06353b] hover:text-[#D4B26A] transition"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
