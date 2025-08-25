import { Paragraph, ScrollView, Text } from "tamagui";
import { useReadingContext } from "@/context/ReadingContext";
import { useEffect } from "react";

export default ({ text }: { text: string }) => {
  const {
    theme,
    font,
    fontSize,
    textAlign,
    lineHeight,
    cWordIndex,
    setCWordIndex,
  } = useReadingContext();
  const fontFamily = `$${font}`;

  const words = text.split(/\s+/);

  const renderContent = () => {
    if (cWordIndex === null) {
      return text; // render toàn bộ text nếu chưa highlight
    }

    const before = words.slice(0, cWordIndex).join(" ");
    const highlight = words[cWordIndex] || "";
    const after = words.slice(cWordIndex + 1).join(" ");

    return (
      <>
        {before && `${before} `}
        <Text
          color={`$${theme}11`}
          backgroundColor={`$${theme}5`}
          borderRadius={5}
        >
          {highlight}
        </Text>
        {after && ` ${after}`}
      </>
    );
  };

  return (
    <ScrollView width="100%" borderRadius="$4" marginBottom={30}>
      <Paragraph
        fontSize={fontSize}
        fontFamily={fontFamily}
        textAlign={textAlign}
        lineHeight={lineHeight * fontSize}
      >
        {renderContent()}
      </Paragraph>
    </ScrollView>
  );
};
