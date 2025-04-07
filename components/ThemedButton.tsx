import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
  View,
} from "react-native";
import { useColorScheme } from "react-native";
import * as AC from "@bacons/apple-colors";
import ThemedText from "./ThemedText";

type ButtonVariant = "primary" | "secondary" | "outline" | "text";
type ButtonSize = "small" | "medium" | "large";

interface ThemedButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  variant = "primary",
  size = "medium",
  label,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Get styles based on variant and size
  const buttonStyles = getButtonStyles(variant, size, isDark, disabled);
  const textStyles = getTextStyles(variant, size, isDark, disabled);

  return (
    <TouchableOpacity
      style={[buttonStyles, style]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      <View style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={textStyles.color as string}
            style={styles.loader}
          />
        ) : (
          <>
            {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
            <ThemedText
              style={textStyles}
              weight={size === "small" ? "medium" : "semibold"}
            >
              {label}
            </ThemedText>
            {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const getButtonStyles = (
  variant: ButtonVariant,
  size: ButtonSize,
  isDark: boolean,
  disabled: boolean
): any => {
  // Base styles
  const baseStyles = {
    ...styles.button,
    ...styles[size],
  };

  // Opacity for disabled state
  const disabledOpacity = 0.5;

  // Variant specific styles
  switch (variant) {
    case "primary":
      return {
        ...baseStyles,
        backgroundColor: disabled
          ? isDark
            ? `rgba(10, 132, 255, ${disabledOpacity})`
            : `rgba(0, 122, 255, ${disabledOpacity})`
          : isDark
          ? AC.systemBlue
          : AC.systemBlue,
      };
    case "secondary":
      return {
        ...baseStyles,
        backgroundColor: disabled
          ? isDark
            ? `rgba(72, 72, 74, ${disabledOpacity})`
            : `rgba(242, 242, 247, ${disabledOpacity})`
          : isDark
          ? AC.systemGray
          : AC.systemGray,
      };
    case "outline":
      return {
        ...baseStyles,
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: disabled
          ? isDark
            ? `rgba(72, 72, 74, ${disabledOpacity})`
            : `rgba(142, 142, 147, ${disabledOpacity})`
          : isDark
          ? AC.systemGray
          : AC.systemGray,
      };
    case "text":
      return {
        ...baseStyles,
        backgroundColor: "transparent",
      };
    default:
      return baseStyles;
  }
};

const getTextStyles = (
  variant: ButtonVariant,
  size: ButtonSize,
  isDark: boolean,
  disabled: boolean
): any => {
  // Base text styles
  const baseTextStyles = {
    ...styles.buttonText,
  };

  // Size specific text styles
  const sizeTextStyles = {
    small: { fontSize: 14 },
    medium: { fontSize: 16 },
    large: { fontSize: 18 },
  };

  // Opacity for disabled state
  const disabledOpacity = 0.5;

  // Variant specific text styles
  switch (variant) {
    case "primary":
      return {
        ...baseTextStyles,
        ...sizeTextStyles[size],
        color: "#FFFFFF",
        opacity: disabled ? disabledOpacity : 1,
      };
    case "secondary":
    case "outline":
    case "text":
      return {
        ...baseTextStyles,
        ...sizeTextStyles[size],
        color: disabled
          ? isDark
            ? `rgba(255, 255, 255, ${disabledOpacity})`
            : `rgba(0, 0, 0, ${disabledOpacity})`
          : isDark
          ? AC.darkText
          : AC.lightText,
      };
    default:
      return baseTextStyles;
  }
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  medium: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  large: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    marginHorizontal: 8,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default ThemedButton;
