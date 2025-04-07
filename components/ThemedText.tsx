import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import * as AC from "@bacons/apple-colors";

type VariantType = "h1" | "h2" | "h3" | "h4" | "body" | "caption" | "label";
type WeightType = "regular" | "medium" | "semibold" | "bold";

interface ThemedTextProps extends TextProps {
  variant?: VariantType;
  weight?: WeightType;
  color?: string;
  centered?: boolean;
}

const ThemedText: React.FC<ThemedTextProps> = ({
  variant = "body",
  weight = "regular",
  color,
  centered = false,
  style,
  children,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Default text color based on theme
  const defaultColor = isDark ? AC.darkText : AC.lightText;

  // Combine styles based on props
  const textStyle = [
    styles.base,
    styles[variant],
    styles[weight],
    centered && styles.centered,
    { color: color || defaultColor },
    style,
  ];

  return (
    <Text style={textStyle} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontSize: 16,
    letterSpacing: 0.5,
  },
  centered: {
    textAlign: "center",
  },
  // Variants
  h1: {
    fontSize: 32,
    lineHeight: 38,
  },
  h2: {
    fontSize: 28,
    lineHeight: 34,
  },
  h3: {
    fontSize: 24,
    lineHeight: 30,
  },
  h4: {
    fontSize: 20,
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    fontSize: 12,
    lineHeight: 18,
  },
  // Weights
  regular: {
    fontWeight: "400",
  },
  medium: {
    fontWeight: "500",
  },
  semibold: {
    fontWeight: "600",
  },
  bold: {
    fontWeight: "700",
  },
});

export default ThemedText;
