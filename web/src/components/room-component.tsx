"use client";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  StartAudio,
} from "@livekit/components-react";
import { useState } from "react";
import { ChevronLeft, Settings, Menu } from "lucide-react";

import { ConfigurationForm } from "@/components/configuration-form";
import { Chat } from "@/components/chat";
import { useConnection } from "@/hooks/use-connection";
import { AgentProvider } from "@/hooks/use-agent";

export function RoomComponent() {
  const { shouldConnect, wsUrl, token } = useConnection();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <LiveKitRoom
      serverUrl={wsUrl}
      token={token}
      connect={shouldConnect}
      audio={true}
      className="flex h-full w-full overflow-hidden bg-black"
      options={{
        publishDefaults: {
          stopMicTrackOnMute: true,
        },
      }}
    >
      <AgentProvider>
        <div className="flex h-full w-full">
          {/* Professional Industry-Level Sidebar */}
          <div
            className={`
              flex-shrink-0 h-full transition-all duration-300 ease-in-out
              ${sidebarOpen ? "w-80" : "w-16"}
              bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950
              border-r border-neutral-700/50
              backdrop-blur-xl
              shadow-2xl shadow-black/20
              flex flex-col
              relative
            `}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-700/50 bg-gradient-to-r from-neutral-800/50 to-neutral-800/30 flex-shrink-0">
              <div className={`flex items-center space-x-3 transition-all duration-300 overflow-hidden ${sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}`}>
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 flex-shrink-0">
                  <Settings className="w-5 h-5 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-white tracking-tight truncate">
                    Configuration
                  </h2>
                  <p className="text-xs text-neutral-400 truncate">Advanced Voice Assistant Settings</p>
                </div>
              </div>
              
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`
                  p-2.5 rounded-lg transition-all duration-200 flex-shrink-0
                  bg-neutral-800/80 hover:bg-neutral-700/80
                  border border-neutral-600/30 hover:border-neutral-500/50
                  text-neutral-300 hover:text-white
                  shadow-lg hover:shadow-xl
                  backdrop-blur-sm
                  ${!sidebarOpen ? "mx-auto" : ""}
                `}
                title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                {sidebarOpen ? (
                  <ChevronLeft className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {sidebarOpen ? (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    <ConfigurationForm />
                  </div>
                  
                  {/* Sidebar Footer */}
                  <div className="p-4 border-t border-neutral-700/50 bg-gradient-to-r from-neutral-800/30 to-neutral-800/10 flex-shrink-0">
                    <div className="flex items-center space-x-2 text-xs text-neutral-500">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span>Assistant Ready</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center py-6 space-y-4">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="
                      p-3 rounded-lg transition-all duration-200
                      bg-neutral-800/80 hover:bg-blue-600/80
                      border border-neutral-600/30 hover:border-blue-500/50
                      text-neutral-300 hover:text-white
                      shadow-lg hover:shadow-xl
                      backdrop-blur-sm
                      group
                    "
                    title="Open configuration"
                  >
                    <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-200" />
                  </button>
                  
                  {/* Collapsed Status Indicator */}
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse opacity-60"></div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area - Takes remaining space */}
          <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
            <div className={`flex-1 flex flex-col h-full transition-all duration-500 ease-in-out ${sidebarOpen ? 'p-4 pl-6' : 'p-0'} min-w-0`}>
              <div className={`
                w-full h-full flex flex-col min-w-0 overflow-hidden
                transition-all duration-500 ease-in-out
                ${sidebarOpen 
                  ? 'rounded-2xl bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-900 border border-neutral-700/50 shadow-2xl shadow-black/20 backdrop-blur-xl' 
                  : 'bg-black'
                }
              `}>
                {/* Main Content Header */}
                {sidebarOpen && (
                  <div className={`px-6 py-4 flex-shrink-0 transition-all duration-500 ease-in-out border-b border-neutral-700/50 bg-gradient-to-r from-neutral-800/20 to-transparent`}>
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <h1 className="text-xl font-semibold text-white tracking-tight truncate">
                          Voice Assistant
                        </h1>
                        <p className="text-sm text-neutral-400 mt-1 truncate">
                          Multimodal AI conversation interface
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs text-neutral-400">Live</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Chat Container */}
                <div className="flex-1 overflow-hidden min-h-0">
                  <Chat />
                </div>
              </div>
            </div>
          </div>
        </div>

        <RoomAudioRenderer />
        <StartAudio label="Click to allow audio playbook" />
      </AgentProvider>
    </LiveKitRoom>
  );
}
