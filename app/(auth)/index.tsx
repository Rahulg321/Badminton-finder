import ThemedText from "@/components/ThemedText";
import ThemedButton from "@/components/ThemedButton";
import { StyleSheet, View, Text } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import * as AC from "@bacons/apple-colors";

export default function Page() {
  return (
    <View style={styles.container}>
      <ThemedText variant="label">Hello world</ThemedText>
      <ThemedButton
        label="Hello world"
        variant="outline"
        leftIcon={<IconSymbol name="star.bubble.fill" color={AC.systemCyan} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
