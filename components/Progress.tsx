import React from "react";
import type { SizeTokens } from "tamagui";
import { Button, Paragraph, Progress, Slider, XStack, YStack } from "tamagui";
import { Play, RotateCcw } from "@tamagui/lucide-icons";
import { useReadingContext } from "@/context/ReadingContext";

type Props = {
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
};

export default function ProgressDemo({ progress, setProgress }: Props) {
  const { theme } = useReadingContext();
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(60), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Progress
        width="70%"
        backgroundColor="$white7"
        borderRadius={999}
        size={"$1"}
        value={progress}
      >
        <Progress.Indicator animation="bouncy" backgroundColor={`$${theme}9`} />
      </Progress>
    </>
  );
}
