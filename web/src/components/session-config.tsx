"use client";

import { VoiceSelector } from "@/components/voice-selector";
import { TemperatureSelector } from "./temperature-selector";
import { ConfigurationFormFieldProps } from "./configuration-form";

export function SessionConfig({ form }: ConfigurationFormFieldProps) {
  return (
    <div className="space-y-4 pt-2">
      <VoiceSelector form={form} />
      <TemperatureSelector form={form} />
    </div>
  );
}
