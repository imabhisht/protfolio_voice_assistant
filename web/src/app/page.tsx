import { Metadata } from "next";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { RoomComponent } from "@/components/room-component";
import Heart from "@/assets/heart.svg";
import { defaultPresets } from "@/data/presets";


export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  let title = "AI Voice Assistant | Abhisht Chouhan";
  let description =
    "Interactive speech-to-speech voice assistant, powered by advanced AI, that can understand and respond to your voice commands in real-time. Experience the future of voice interaction with customizable AI personalities.";

  const presetId = searchParams?.preset;
  if (presetId) {
    const selectedPreset = defaultPresets.find(
      (preset) => preset.id === presetId
    );
    if (selectedPreset) {
      title = `AI Voice Assistant Playground`;
      description = `Speak to a "${selectedPreset.name}" in an interactive speech-to-speech with advanced AI capabilities.`;
    }
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: "",
      images: [
        {
          url: "",
          width: 1200,
          height: 676,
          type: "image/png",
          alt: title,
        },
      ],
    },
  };
}

export default function Dashboard() {
  return (
    <div className="flex flex-col h-dvh bg-black">
      <main className="flex flex-col flex-grow overflow-hidden p-0 pb-4 lg:pb-0 w-full md:mx-auto">
        <RoomComponent />
      </main>
      <footer className="hidden md:flex md:items-center md:gap-2 md:justify-end font-mono uppercase text-right py-3 px-8 text-xs text-neutral-600 w-full md:mx-auto">
        Built with
        <Heart />
        By
        <a
          href="https://linkedin.com/in/imabhisht/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Abhisht Chouhan
        </a>{" "}
        •
        <a
          href="https://github.com/imabhisht/protfolio_voice_assistant"
          target="_blank"
          rel="noopener noreferrer"
          className="underline inline-flex items-center gap-1"
        >
          <GitHubLogoIcon className="h-4 w-4" />
          View source on GitHub
        </a>
      </footer>
    </div>
  );
}
