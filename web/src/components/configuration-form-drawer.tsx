import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { ConfigurationForm } from "@/components/configuration-form";
import { Settings } from "lucide-react";

interface ConfigurationFormDrawerProps {
  children: React.ReactNode;
}

export function ConfigurationFormDrawer({
  children,
}: ConfigurationFormDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 border-t border-neutral-700/50 backdrop-blur-xl shadow-2xl shadow-black/20">
        <div className="mx-auto mt-4 h-1 w-[60px] rounded-full bg-neutral-600/50" />
        <div className="flex flex-col h-[70vh] max-h-[600px]">
          {/* Header matching sidebar style */}
          <DrawerHeader className="flex-shrink-0 p-4 border-b border-neutral-700/50 bg-gradient-to-r from-neutral-800/50 to-neutral-800/30">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 flex-shrink-0">
                <Settings className="w-5 h-5 text-blue-400" />
              </div>
              <div className="min-w-0">
                <DrawerTitle className="text-lg font-semibold text-white tracking-tight truncate">
                  Configuration
                </DrawerTitle>
                <p className="text-xs text-neutral-400 truncate">Advanced Voice Assistant Settings</p>
              </div>
            </div>
          </DrawerHeader>
          
          {/* Content area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            <ConfigurationForm />
          </div>
          
          {/* Footer matching sidebar style */}
          <div className="p-4 border-t border-neutral-700/50 bg-gradient-to-r from-neutral-800/30 to-neutral-800/10 flex-shrink-0">
            <div className="flex items-center space-x-2 text-xs text-neutral-500">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Assistant Ready</span>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
