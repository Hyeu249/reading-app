import React, { useState, useEffect } from "react";
import { YStack, XStack, Text, Button } from "tamagui";
import { Play, Pause, RotateCcw, RotateCw } from "@tamagui/lucide-icons";
import { Image } from "react-native";
import Progress from "@/components/Progress";
import { useReadingContext } from "@/context/ReadingContext";
import * as Speech from "expo-speech";

export default function AudioPlayerControls({ text }: { text: string }) {
  const [isPlay, setIsPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const { theme, voice, cWordIndex, setCWordIndex } = useReadingContext();

  const words = text.split(/\s+/);

  const speak = () => {
    setCWordIndex(null);
    Speech.stop();

    Speech.speak(text, {
      voice: voice,
      onBoundary: (event: any) => {
        if (event.name === "word") {
          // Đếm số khoảng trắng trước charIndex để tìm index của từ
          const wordIndex =
            event.target.text.slice(0, event.charIndex).split(/\s+/).length - 1;
          setCWordIndex(wordIndex);
          setProgress((wordIndex / words.length) * 100);
        }
      },
      onDone: () => {
        setCWordIndex(null);
        setIsPlay(false);
      },
    });
  };

  const handlePlay = () => {
    if (cWordIndex === null) {
      speak();
      setIsPlay(true);
      console.log("play", voice);
    } else if (isPlay) {
      Speech.pause();
      setIsPlay(false);
      console.log("pause");
    } else {
      Speech.resume();
      setIsPlay(true);
      console.log("resume");
    }
  };

  return (
    <YStack
      width={320}
      backgroundColor="$background"
      borderRadius="$4"
      padding="$3"
      alignItems="center"
      gap="$2"
      shadowColor="$shadow3"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.5}
      shadowRadius={6}
    >
      {/* Progress bar */}
      <XStack width="100%" justifyContent="space-between" alignItems="center">
        <Text fontSize="$2" color="$color">
          0:06
        </Text>
        <Progress progress={progress} setProgress={setProgress} />
        <Text fontSize="$2" color="$color">
          0:12
        </Text>
      </XStack>

      {/* Control buttons */}
      <XStack width="100%" justifyContent="space-around" alignItems="center">
        {/* Flag */}
        <Image
          source={{ uri: "https://flagcdn.com/us.svg" }}
          style={{ width: 32, height: 32, borderRadius: 16 }}
        />

        {/* Rewind 10 */}
        <Button
          chromeless
          borderWidth={0}
          icon={<RotateCcw size={24} />}
          onPress={() => setProgress((prev) => prev - 5)}
        ></Button>

        {/* Play */}
        <Button
          size="$6"
          circular
          icon={
            isPlay ? (
              <Pause size={28} color="white" />
            ) : (
              <Play size={28} color="white" />
            )
          }
          backgroundColor={`$${theme}9`}
          hoverStyle={{ backgroundColor: `$${theme}10` }}
          pressStyle={{ backgroundColor: `$${theme}11` }}
          onPress={() => {
            handlePlay();
          }}
        />

        {/* Forward 10 */}
        <Button
          chromeless
          borderWidth={0}
          icon={<RotateCw size={24} />}
          onPress={() => setProgress((prev) => prev + 5)}
        ></Button>

        {/* Speed */}
        <Button size="$4" circular backgroundColor="$backgroundHover">
          <Text fontSize="$3" fontWeight="600" color="$color">
            1.5×
          </Text>
        </Button>
      </XStack>
    </YStack>
  );
}
