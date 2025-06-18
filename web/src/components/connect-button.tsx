"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useConnection } from "@/hooks/use-connection";
import { Loader2 } from "lucide-react";

export function ConnectButton() {
  const { connect, disconnect, shouldConnect } = useConnection();
  const [connecting, setConnecting] = useState<boolean>(false);

  const handleConnectionToggle = useCallback(async () => {
    if (shouldConnect) {
      await disconnect();
    } else {
      setConnecting(true);
      try {
        await connect();
      } catch (error) {
        console.error("Connection failed:", error);
      } finally {
        setConnecting(false);
      }
    }
  }, [connect, disconnect, shouldConnect]);

  return (
    <Button
      onClick={handleConnectionToggle}
      disabled={connecting || shouldConnect}
      variant="primary"
      className="text-sm font-semibold"
    >
      {connecting || shouldConnect ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting
        </>
      ) : (
        <>Start a conversation</>
      )}
    </Button>
  );
}
