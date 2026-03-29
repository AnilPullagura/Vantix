import React, { useState } from "react";
import Header from "../header/header";
import Item from "../item/item";
import InputSection from "../input/inputSection";
import "./Home.css";
import { LayoutDashboard, Library, Settings, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "https://vantix-6ha0.onrender.com/api";

const Home = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      text: "Welcome to Vantix. Start by describing an image or upload one for a variation.",
      isWelcome: true,
    },
  ]);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, { ...msg, id: Date.now() }]);
  };

  const handleEnhance = async () => {
    if (!input) return;
    setIsEnhancing(true);
    console.log("cliked");
    try {
      const response = await fetch(`${API_BASE}/text-enhance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      const data = await response.json();

      if (data.success) {
        const polished = data.message;
        setInput(polished);
        addMessage({
          type: "ai",
          text: `✨ Refined prompt: "${polished}"`,
          isRefined: true,
        });
        console.log("clicked");
      }
    } catch (err) {
      console.error("Enhance error:", err);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerate = async () => {
    if (!input) return;
    setIsGenerating(true);
    addMessage({ type: "user", text: input });

    try {
      const response = await fetch(`${API_BASE}/gen-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();

      if (data.success) {
        addMessage({
          type: "media",
          imageUrl: data.image_url,
          prompt: input,
        });
      }
    } catch (err) {
      console.error("Generation error:", err);
      addMessage({
        type: "error",
        text: "Failed to generate image. Please try again.",
      });
    } finally {
      setIsGenerating(false);
      setInput("");
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsEnhancing(true);
    addMessage({ type: "ai", text: "Analyzing your image for a variation..." });

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${API_BASE}/analyze-image`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        const description = data.message;
        setInput(description);
        addMessage({
          type: "ai",
          text: `🔍 Analysis complete: "${description}". You can now edit this or hit Generate for a variation.`,
          isRefined: true,
        });
      }
    } catch (err) {
      console.error("Upload error:", err);
      addMessage({ type: "error", text: "Failed to analyze image." });
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="home-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Vantix</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <button className="nav-item active">
            <LayoutDashboard size={18} />
            <span>Creative Suite</span>
          </button>

          <button className="nav-item">
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="usage-card space-y-3">
          <p className="text-xs text-slate-400 font-medium tracking-wide">
            Usage Limit / Free Tier
          </p>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full w-[40%] bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
          </div>
          <p className="text-[10px] text-slate-500 font-medium">30 RPM</p>
        </div>
      </aside>

      <div className="main-content">
        <Header />

        <div className="feed-container">
          <div className="feed-grid">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Item msg={msg} />
                </motion.div>
              ))}
            </AnimatePresence>

            {isGenerating && (
              <div className="loading-indicator">
                <RefreshCw size={14} className="animate-spin text-indigo-400" />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  Imagining media...
                </span>
              </div>
            )}
          </div>
        </div>

        <InputSection
          input={input}
          setInput={setInput}
          onEnhance={handleEnhance}
          onGenerate={handleGenerate}
          onUpload={handleUpload}
          isEnhancing={isEnhancing}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  );
};

const RefreshCw = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

export default Home;
