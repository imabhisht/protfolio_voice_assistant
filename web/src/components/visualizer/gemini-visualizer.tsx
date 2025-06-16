"use client";

import Orb from "@/components/visualizer/Orb";

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
      <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0} // Default hue
          forceHoverState={false}
          volume={agentVolume}
          state={agentState}
        />
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
