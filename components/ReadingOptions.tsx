import {
  Moon,
  Star,
  Sun,
  Activity,
  Check,
  ChevronDown,
  ChevronUp,
} from "@tamagui/lucide-icons";
import { useState, useEffect } from "react";
import {
  Button,
  Popover,
  YStack,
  YGroup,
  ListItem,
  Separator,
  PopoverProps,
  Text,
  Slider,
  SliderProps,
  XStack,
  ScrollView,
} from "tamagui";
import {
  useReadingContext,
  Mode,
  ThemeMode,
  Font,
  TextAlign,
  LineHeight,
} from "@/context/ReadingContext";
import * as Speech from "expo-speech";
import React from "react";

import type { FontSizeTokens, SelectProps } from "tamagui";
import { Adapt, Label, Select, Sheet, getFontSize } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

type Option = {
  label?: string;
  value: any;
  icon?: any;
  onPress?: (value: any) => void;
};

// Component Demo tổng
export default function PopoverDemo() {
  const {
    mode,
    setMode,
    theme,
    setTheme,
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
  } = useReadingContext();
  const [voices, setVoices] = useState<Option[]>([]);

  useEffect(() => {
    const fetchVoices = async () => {
      const voicesList = await Speech.getAvailableVoicesAsync();
      setVoices(
        voicesList.map((e) => ({
          label: e.name,
          value: e.identifier,
        }))
      );
    };

    fetchVoices();
  }, []);

  useEffect(() => {
    if (voices.length) setVoice(voices[2]?.value);
  }, [voices.length]);

  const lineHeightOptions = [
    {
      label: "Small",
      value: 1.4,
      icon: Sun,
      onPress: (value: LineHeight) => setLineHeight(value),
    },
    {
      label: "Medium",
      value: 1.6,
      icon: Moon,
      onPress: (value: LineHeight) => setLineHeight(value),
    },
    {
      label: "Large",
      value: 1.8,
      icon: Moon,
      onPress: (value: LineHeight) => setLineHeight(value),
    },
  ];

  const textAlignOptions = [
    {
      value: "center",
      icon: Sun,
      onPress: (value: TextAlign) => setTextAlign(value),
    },
    {
      value: "left",
      icon: Moon,
      onPress: (value: TextAlign) => setTextAlign(value),
    },
    {
      value: "right",
      icon: Moon,
      onPress: (value: TextAlign) => setTextAlign(value),
    },
    {
      value: "justify",
      icon: Moon,
      onPress: (value: TextAlign) => setTextAlign(value),
    },
  ];

  const fontOptions = [
    { value: "Bookerly", icon: Sun, onPress: (font: Font) => setFont(font) },
    { value: "SpaceMono", icon: Star, onPress: (font: Font) => setFont(font) },
    { value: "Inter", icon: Moon, onPress: (font: Font) => setFont(font) },
    { value: "InterBold", icon: Sun, onPress: (font: Font) => setFont(font) },
  ];

  const colorModeOptions = [
    {
      value: "light",
      icon: Sun,
      onPress: (mode: Mode) => setMode(mode),
    },
    {
      value: "dark",
      icon: Moon,
      onPress: (mode: Mode) => setMode(mode),
    },
  ];

  const themeOptions = [
    {
      value: "blue",
      icon: Star,
      onPress: (mode: ThemeMode) => setTheme(mode),
    },
    { value: "red", icon: Moon, onPress: (mode: ThemeMode) => setTheme(mode) },
    {
      value: "yellow",
      icon: Sun,
      onPress: (mode: ThemeMode) => setTheme(mode),
    },
    { value: "green", icon: Sun, onPress: (mode: ThemeMode) => setTheme(mode) },
  ];

  return (
    <YStack gap="$2" justifyContent="center" alignItems="flex-start">
      {/*  */}
      <SelectDemoContents
        id="select-demo-1"
        label="Voice"
        options={voices}
        setValue={setVoice}
        firstValue={voice}
      />
      <SelectDemoContents
        id="select-demo-2"
        label="Mode"
        options={colorModeOptions}
        setValue={setMode}
        firstValue={mode}
      />
      <SelectDemoContents
        id="select-demo-3"
        label="Theme"
        options={themeOptions}
        setValue={setTheme}
        firstValue={theme}
      />
      <SelectDemoContents
        id="select-demo-4"
        label="Font"
        options={fontOptions}
        setValue={setFont}
        firstValue={font}
      />
      <SelectDemoContents
        id="select-demo-5"
        label="Text Align"
        options={textAlignOptions}
        setValue={setTextAlign}
        firstValue={textAlign}
      />
      <SelectDemoContents
        id="select-demo-6"
        label="Line Height"
        options={lineHeightOptions}
        setValue={setLineHeight}
        firstValue={lineHeight}
      />
      <SliderWithLabel
        width={220}
        label="Font Size"
        value={[fontSize]}
        onChange={setFontSize}
      />
    </YStack>
  );
}

type Props = {
  name: string;
  defaultValue?: any;
  options: Option[];
};

// Component tái sử dụng
export function DynamicPopover({
  name,
  options,
  defaultValue = "",
  ...props
}: PopoverProps & Props) {
  const defaultOption = options.find((res) => res.value === defaultValue);
  const [selected, setSelected] = useState<any>();

  useEffect(() => {
    setSelected(
      defaultOption?.label === undefined ? defaultValue : defaultOption.label
    );
  }, [defaultValue]);

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  return (
    <Popover size="$5" allowFlip stayInFrame offset={15} resize {...props}>
      <Popover.Trigger asChild>
        <Button iconAfter={Activity} size="$3">
          {selected ? (
            <Text>
              {name}: {selected}
            </Text>
          ) : (
            name
          )}
        </Button>
      </Popover.Trigger>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        padding={0}
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          "quick",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <YGroup
          alignSelf="center"
          bordered
          width={240}
          size="$5"
          separator={<Separator />}
        >
          <ScrollView maxHeight={300} borderRadius="$4">
            {options.map((item, index) => (
              <YGroup.Item key={index}>
                <Popover.Close asChild>
                  <ListItem
                    hoverTheme
                    pressTheme
                    title={item.label === undefined ? item.value : item.label}
                    icon={item.icon}
                    onPress={() => {
                      handleSelect(
                        item.label === undefined ? item.value : item.label
                      );
                      if (item?.onPress) item?.onPress(item.value);
                    }}
                  />
                </Popover.Close>
              </YGroup.Item>
            ))}
          </ScrollView>
        </YGroup>
      </Popover.Content>
    </Popover>
  );
}

function SliderWithLabel({
  label,
  value,
  onChange,
  ...props
}: SliderProps & {
  label: string;
  value: number[];
  onChange: (value: number) => void;
}) {
  return (
    <YStack alignItems="center" justifyContent="center" gap="$2">
      <XStack>
        <Text>{label}: </Text>
        <Text width={50}>{value[0]}</Text>
      </XStack>
      <Slider
        defaultValue={value}
        max={70}
        min={10}
        step={1}
        onValueChange={(val) => onChange(val[0])}
        {...props}
      >
        <Slider.Track>
          <Slider.TrackActive />
        </Slider.Track>
        <Slider.Thumb size="$2" index={0} circular />
      </Slider>
    </YStack>
  );
}
type Select2Props = {
  label: string;
  options: Option[];
  firstValue?: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
};
export function SelectDemoContents(
  props: SelectProps & { trigger?: React.ReactNode } & Select2Props
) {
  const { options, firstValue, setValue, label } = props;
  const [val, setVal] = React.useState(firstValue);
  const defaultOption = options.find((res) => res.value === firstValue);

  useEffect(() => {
    setVal(
      defaultOption?.label === undefined ? firstValue : defaultOption.label
    );
  }, [firstValue]);

  return (
    <Select
      value={val}
      onValueChange={(value) => {
        setVal(value);
        setValue(value);
      }}
      disablePreventBodyScroll
      {...props}
    >
      {props?.trigger || (
        <Select.Trigger maxWidth={220} iconAfter={ChevronDown}>
          <Select.Value placeholder={label} />
        </Select.Trigger>
      )}

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={["$background", "transparent"]}
            borderRadius="$4"
          />
        </Select.ScrollUpButton>

        <Select.Viewport
          // to do animations:
          // animation="quick"
          // animateOnly={['transform', 'opacity']}
          // enterStyle={{ o: 0, y: -10 }}
          // exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
        >
          <Select.Group>
            <Select.Label>{label}</Select.Label>
            {/* for longer lists memoizing these is useful */}
            {React.useMemo(
              () =>
                options.map((item, i) => {
                  return (
                    <Select.Item index={i} key={item.value} value={item.value}>
                      <Select.ItemText>
                        {item.label === undefined ? item.value : item.label}
                      </Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [options]
            )}
          </Select.Group>
          {/* Native gets an extra icon */}
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={"$4"}
              pointerEvents="none"
            >
              <ChevronDown
                size={getFontSize((props.size as FontSizeTokens) ?? "$true")}
              />
            </YStack>
          )}
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={["transparent", "$background"]}
            borderRadius="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}

const items = [
  { name: "Apple" },
  { name: "Pear" },
  { name: "Blackberry" },
  { name: "Peach" },
  { name: "Apricot" },
  { name: "Melon" },
  { name: "Honeydew" },
  { name: "Starfruit" },
  { name: "Blueberry" },
  { name: "Raspberry" },
  { name: "Strawberry" },
  { name: "Mango" },
  { name: "Pineapple" },
  { name: "Lime" },
  { name: "Lemon" },
  { name: "Coconut" },
  { name: "Guava" },
  { name: "Papaya" },
  { name: "Orange" },
  { name: "Grape" },
  { name: "Jackfruit" },
  { name: "Durian" },
];
