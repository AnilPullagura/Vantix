import React from "react";
import { Sparkles } from "lucide-react";
import "./index.css";

const Header = () => {
  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#050510]/50 backdrop-blur-md sticky top-0 z-10 w-full">
      <div className="flex header-container items-center gap-4">
        <button className="primary-button text-xs py-1.5 px-4">
          Upgrade Pro
        </button>
      </div>
    </header>
  );
};

export default Header;
