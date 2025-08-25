import { Circle, ScrollView, Square, XStack, YStack, Theme } from "tamagui";
import Tamagay from "@/components/Tamagay";
import Paper from "@/components/Paper";
import ReadingOptions from "@/components/ReadingOptions";
import { useReadingContext } from "@/context/ReadingContext";

const text =
  "My favorite hobby is reading books. I enjoy reading because it helps me learn new things and improve my imagination. Every day, I spend about one hour reading novels or short stories. Sometimes I read in the morning, but I usually read before going to bed. Reading makes me feel relaxed and happy. It is the best way for me to reduce stress after a long day.";

export default function ScrollViewDemo() {
  const { theme } = useReadingContext();
  return (
    <Theme name={theme}>
      <XStack flex={1} backgroundColor={"$background"}>
        <YStack width={"24%"} padding={15}>
          <ReadingOptions />
        </YStack>
        <YStack
          flex={1}
          padding={"$7"}
          paddingBottom={"$4"}
          alignItems="center"
          justifyContent="space-between"
          flexShrink={1}
        >
          <Paper text={text} />
          <Tamagay text={text} />
        </YStack>
        <YStack width={"24%"}></YStack>
      </XStack>
    </Theme>
  );
}
