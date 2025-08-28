import React, { createContext, useContext, useState } from "react";
import { FontType } from "@/config/tamagui.config";

type ThemeContextType = {
  theme: ThemeMode;
  setTheme: React.Dispatch<React.SetStateAction<ThemeMode>>;

  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;

  font: FontType;
  setFont: React.Dispatch<React.SetStateAction<FontType>>;

  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;

  textAlign: TextAlign;
  setTextAlign: React.Dispatch<React.SetStateAction<TextAlign>>;

  lineHeight: LineHeight;
  setLineHeight: React.Dispatch<React.SetStateAction<LineHeight>>;

  voice: string;
  setVoice: React.Dispatch<React.SetStateAction<string>>;

  cWordIndex: number | null;
  setCWordIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

export type ThemeMode = "blue" | "yellow" | "red" | "green";
export type Mode = "light" | "dark";
export type Font = FontType;
export type LineHeight = 1.4 | 1.6 | 1.7;
export type TextAlign =
  | "left"
  | "right"
  | "unset"
  | "auto"
  | "center"
  | "justify"
  | undefined;

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ReadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<ThemeMode>("blue"); // giá trị mặc định
  const [mode, setMode] = useState<Mode>("light"); // giá trị mặc định
  const [font, setFont] = useState<FontType>("Bookerly"); // giá trị mặc định
  const [fontSize, setFontSize] = useState<number>(22); // giá trị mặc định
  const [textAlign, setTextAlign] = useState<TextAlign>("center"); // giá trị mặc định
  const [lineHeight, setLineHeight] = useState<LineHeight>(1.4); // giá trị mặc định
  const [voice, setVoice] = useState<string>(""); // giá trị mặc định
  const [cWordIndex, setCWordIndex] = useState<number | null>(null);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        mode,
        setMode,
        font,
        setFont,
        fontSize,
        setFontSize,
        textAlign,
        setTextAlign,
        lineHeight,
        setLineHeight,
        voice,
        setVoice,
        cWordIndex,
        setCWordIndex,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useReadingContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useReadingContext must be used within ReadingProvider");
  }
  return context;
};
