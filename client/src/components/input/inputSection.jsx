import React from "react";
import "./inputSection.css";
import { Wand2, Upload, Send, RefreshCw } from "lucide-react";

const InputSection = ({
  input,
  setInput,
  onEnhance,
  onGenerate,
  onUpload,
  isEnhancing,
  isGenerating,
}) => {
  return (
    <div className="input-section-container">
      <div className="action-bar glass shadow-2xl">
        <button
          type="button"
          onClick={onEnhance}
          disabled={isEnhancing || isGenerating || !input}
          className={`icon-button ${isEnhancing ? "active-wand" : ""}`}
          title="Enhance with Groq"
        >
          <Wand2 size={22} className={isEnhancing ? "animate-pulse" : ""} />
        </button>

        <div className="divider" />

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your vision..."
          className="prompt-input"
          onKeyDown={(e) => e.key === "Enter" && onGenerate()}
        />

        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/*"
          onChange={onUpload}
        />

        <button
          onClick={() => document.getElementById("fileInput").click()}
          disabled={isEnhancing || isGenerating}
          className="icon-button"
          title="Upload Base Image"
        >
          <Upload size={22} className={isEnhancing ? "animate-pulse" : ""} />
        </button>

        <button
          onClick={onGenerate}
          disabled={isGenerating || !input}
          className="primary-button flex items-center justify-center gap-2 px-5 py-2.5 ml-2"
        >
          {isGenerating ? (
            <RefreshCw size={18} className="animate-spin" />
          ) : (
            <>
              <span className="hidden gen sm:inline"></span>
              <Send size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputSection;
