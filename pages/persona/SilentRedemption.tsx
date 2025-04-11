// pages/persona/SilentRedemption.tsx
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ChatAgentTerminal } from "@/components/persona/ChatAgentTerminal";
import { DNAStatsCard } from "@/components/persona/DNAStatsCard";
import { EmotionalStateAura } from "@/components/persona/EmotionalStateAura";

// 3D GLB Viewer (Lazy load for performance)
const GLBViewer = dynamic(() => import("@/components/persona/GLBViewer"), {
  ssr: false,
});

export default function SilentRedemptionPage() {
  const [emotion, setEmotion] = useState<"calm" | "excited" | "balanced">("calm");

  const handleEmotionChange = (newEmotion: typeof emotion) => {
    setEmotion(newEmotion);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Aura */}
      <EmotionalStateAura emotion={emotion} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 md:p-12 relative z-10">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center md:text-left">
            Silent Redemption
          </h1>
          <ChatAgentTerminal onEmotionChange={handleEmotionChange} />
        </div>

        <div className="space-y-6 flex flex-col items-center">
          <GLBViewer modelUrl="/models/silent_redemption.glb" />
          <DNAStatsCard />
        </div>
      </div>
    </div>
  );
}
