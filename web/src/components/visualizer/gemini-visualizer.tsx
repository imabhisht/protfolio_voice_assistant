"use client";

import Orb from "@/components/visualizer/Orb";
import FuzzyText from '@/components/visualizer/FuzzyText';

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
  return (
    <div
      className="flex h-full w-full items-center justify-center relative"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Main container with proper centering */}
      <div 
        className="relative flex items-center justify-center"
        style={{ 
          width: '600px', 
          height: '600px',
          margin: '0 auto'
        }}
      >
        {/* Orb container - perfectly centered */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            width: '100%',
            height: '100%',
          }}
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
        
        {/* FuzzyText overlay in the center */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            zIndex: 10,
          }}
        >
          <div 
            className="pointer-events-auto text-center"
            style={{
              // Scale with volume for better integration
              transform: `scale(${agentState === "disconnected" ? 0.8 : 1 + agentVolume * 0.1})`,
              transition: 'transform 0.15s ease-out',
              // Adjust opacity based on state
              opacity: agentState === "disconnected" ? 0.3 : 1,
            }}
          >
            <FuzzyText 
              baseIntensity={0.26} 
              hoverIntensity={0.56} 
              enableHover={true}
              fontSize="3rem"
              fontWeight={700}
              color="#ffffff"
              fontFamily="font-mono"
            >
              Voice Assistant
            </FuzzyText>
          </div>
        </div>
      </div>
      <Shadow volume={agentVolume} state={agentState} />
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
