import { AlertDialog, Button, XStack, YStack, Theme } from "tamagui";
import { useRouter } from "expo-router";
import { useReadingContext } from "@/context/ReadingContext";

export default function AlertDialogDemo() {
  const { theme } = useReadingContext();
  const router = useRouter();
  return (
    <Theme name={theme}>
      <YStack
        flex={1}
        alignItems="center"
        backgroundColor="$background"
        paddingBottom={25}
      >
        <AlertDialog native>
          <AlertDialog.Trigger asChild>
            <Button>Reading</Button>
          </AlertDialog.Trigger>

          <AlertDialog.Portal>
            <AlertDialog.Overlay
              key="overlay"
              animation="quick"
              opacity={0.5}
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
            <AlertDialog.Content
              bordered
              elevate
              key="content"
              animation={[
                "quick",
                {
                  opacity: {
                    overshootClamping: true,
                  },
                },
              ]}
              enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
              exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
              x={0}
              scale={1}
              opacity={1}
              y={0}
            >
              <YStack gap="$4">
                <AlertDialog.Title>Accept</AlertDialog.Title>
                <AlertDialog.Description>
                  By pressing yes, you accept our terms and conditions.
                </AlertDialog.Description>

                <XStack gap="$3" justifyContent="flex-end">
                  <AlertDialog.Cancel asChild>
                    <Button>Cancel</Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action
                    asChild
                    onPress={() => {
                      console.log("Accepted!");
                      router.push("/Reading");
                      // Thực hiện logic ở đây, ví dụ:
                      // submitForm()
                      // hoặc gọi API
                    }}
                  >
                    <Button theme="accent">Accept</Button>
                  </AlertDialog.Action>
                </XStack>
              </YStack>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog>
      </YStack>
    </Theme>
  );
}
