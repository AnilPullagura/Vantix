import React from "react";
import "./item.css";
import { Sparkles, Download, Copy, RefreshCw } from "lucide-react";

const Item = ({ msg }) => {
  if (!msg) return null;

  const renderContent = () => {
    switch (msg.type) {
      case "ai":
        return (
          <div className="ai-message max-w-2xl flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-900/30 flex items-center justify-center border border-indigo-500/20 shadow-lg">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
            <div
              className={`p-4 rounded-2xl text-box glass ${msg.isRefined ? "border-indigo-500/30 bg-indigo-500/5" : ""}`}
            >
              <p className="text-sm leading-relaxed text-slate-200">
                {msg.text}
              </p>
            </div>
          </div>
        );
      case "user":
        return (
          <div className="user-message max-w-xl ml-auto flex justify-end">
            <div className="p-4 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-right shadow-md">
              <p className="text-sm text-indigo-100">{msg.text}</p>
            </div>
          </div>
        );
      case "media":
        return (
          <div className="media-item max-w-2xl mx-auto space-y-4">
            <div className="media-card glass p-2">
              <img
                src={msg.imageUrl}
                alt={msg.prompt}
                className="w-full ai-media rounded-2xl object-cover"
              />
              <div className="media-overlay">
                <ActionButton icon={<Download size={20} />} label="Save" />
                <ActionButton icon={<Copy size={20} />} label="Prompt" />
                <ActionButton icon={<RefreshCw size={20} />} label="Remix" />
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center px-8 italic font-medium">
              "{msg.prompt}"
            </p>
          </div>
        );
      case "error":
        return (
          <div className="max-w-md mx-auto p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-medium shadow-sm">
            {msg.text}
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="message-item">{renderContent()}</div>;
};

const ActionButton = ({ icon, label }) => (
  <button className="icon-btn-container group/btn border-none outline-none">
    <div className="text-white group-hover/btn:scale-110 transition-transform">
      {icon}
    </div>
    <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">
      {label}
    </span>
  </button>
);

export default Item;
