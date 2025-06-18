"use client";

import Orb from "@/components/visualizer/Orb";
import { useConnection } from "@/hooks/use-connection";
import { useState, useCallback } from "react";

import {
  AgentState,
  TrackReference,
  useTrackVolume,
} from "@livekit/components-react";

type GeminiVisualizerProps = {
  agentState: AgentState;
  agentTrackRef?: TrackReference;
};

export function GeminiVisualizer({
  agentTrackRef,
  agentState,
}: GeminiVisualizerProps) {
  const agentVolume = useTrackVolume(agentTrackRef);
  const { connect, shouldConnect } = useConnection();
  const [connecting, setConnecting] = useState(false);

  const handleOrbClick = useCallback(async () => {
    // Only allow starting conversation, not stopping
    if (shouldConnect || agentState === "listening" || agentState === "thinking" || agentState === "speaking" || connecting) {
      return;
    }

    setConnecting(true);
    try {
      await connect();
    } catch (error) {
      console.error("Connection failed:", error);
    } finally {
      setConnecting(false);
    }
  }, [shouldConnect, agentState, connect, connecting]);

  // Allow clicking when not connected and not in an active state
  const isClickable = !shouldConnect && agentState !== "listening" && agentState !== "thinking" && agentState !== "speaking" && !connecting;
  return (
    <div
      className="flex h-full w-full items-center justify-center relative"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Main container with proper centering and responsive sizing */}
      <div 
        className="relative flex items-center justify-center"
        style={{ 
          width: 'min(400px, 90vw)', 
          height: 'min(400px, 90vw)',
          maxWidth: '600px',
          maxHeight: '600px',
          margin: '0 auto'
        }}
      >
        {/* Background glow effect */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {/* Multiple layered glow rings for depth */}
          <div 
            className="absolute rounded-full transition-all duration-500 ease-out"
            style={{
              width: '80%',
              height: '80%',
              background: `radial-gradient(circle, 
                rgba(156, 67, 254, ${agentState === "disconnected" ? 0.1 : 0.1 + agentVolume * 0.1}) 0%, 
                rgba(76, 194, 233, ${agentState === "disconnected" ? 0.08 : 0.08 + agentVolume * 0.08}) 40%, 
                rgba(16, 20, 153, ${agentState === "disconnected" ? 0.05 : 0.05 + agentVolume * 0.06}) 70%, 
                transparent 100%)`,
              filter: `blur(${agentState === "disconnected" ? 20 : 20 + agentVolume * 8}px)`,
              transform: `scale(${agentState === "disconnected" ? 0.8 : 0.8 + agentVolume * 0.1})`,
            }}
          />
          
          {/* Outer glow ring */}
          <div 
            className="absolute rounded-full transition-all duration-700 ease-out"
            style={{
              width: '120%',
              height: '120%',
              background: `radial-gradient(circle, 
                rgba(156, 67, 254, ${agentState === "disconnected" ? 0.05 : 0.05 + agentVolume * 0.05}) 0%, 
                rgba(76, 194, 233, ${agentState === "disconnected" ? 0.03 : 0.03 + agentVolume * 0.04}) 30%, 
                transparent 60%)`,
              filter: `blur(${agentState === "disconnected" ? 40 : 40 + agentVolume * 10}px)`,
              transform: `scale(${agentState === "disconnected" ? 0.6 : 0.6 + agentVolume * 0.15})`,
            }}
          />
          
          {/* Subtle ambient glow */}
          <div 
            className="absolute rounded-full transition-all duration-1000 ease-out"
            style={{
              width: '160%',
              height: '160%',
              background: `radial-gradient(circle, 
                rgba(156, 67, 254, ${agentState === "disconnected" ? 0.02 : 0.02 + agentVolume * 0.03}) 0%, 
                rgba(76, 194, 233, ${agentState === "disconnected" ? 0.01 : 0.01 + agentVolume * 0.02}) 20%, 
                transparent 40%)`,
              filter: `blur(${agentState === "disconnected" ? 60 : 60 + agentVolume * 15}px)`,
              transform: `scale(${agentState === "disconnected" ? 0.4 : 0.4 + agentVolume * 0.2})`,
            }}
          />
        </div>

        {/* Orb container - perfectly centered */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
            isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-default'
          }`}
          style={{
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
          onClick={isClickable ? handleOrbClick : undefined}
          title={isClickable ? "Click to start conversation" : undefined}
        >
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={0} // Default hue
            forceHoverState={false}
            volume={agentVolume}
            state={agentState}
          />
        </div>
      </div>
    </div>
  );
}

const Shadow = ({ volume, state }: { volume: number; state?: AgentState }) => {
  return (
    <div
      className="absolute z-0"
      style={{
        transform: "translateY(140px) rotate3d(1, 0, 0, 80deg)",
        transformStyle: "preserve-3d",
        zIndex: -1,
      }}
    >
      <div
        className={`absolute w-[200px] h-[100px] transition-all duration-150 left-1/2 top-1/2 rounded-full bg-gemini-blue`}
        style={{
          transform: `translate(-50%, calc(-50% + 50px)) scale(${state === "disconnected" ? 0.6 : 0.75 + volume * 0.1})`,
          filter: `blur(30px) ${state === "disconnected" ? "saturate(0.0)" : "saturate(1.0)"}`,
          opacity: state === "disconnected" ? 0.05 : volume > 0 ? 0.4 : 0.15,
        }}
      ></div>
    </div>
  );
};
