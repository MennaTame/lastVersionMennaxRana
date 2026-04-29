import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import COLORS from "./colors";

type Styles = {
  screen: ViewStyle;
  centeredScreen: ViewStyle;
  authWrapper: ViewStyle;
  authCard: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  input: TextStyle;
  button: ViewStyle;
  buttonDisabled: ViewStyle;
  buttonText: TextStyle;
  linkText: TextStyle;
  message: TextStyle;
  successText: TextStyle;
  errorText: TextStyle;
};

const globalStyles = StyleSheet.create<Styles>({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  centeredScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  authWrapper: {
    width: "100%",
    maxWidth: 390,
    alignSelf: "center",
    justifyContent: "center",
  },

  authCard: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 22,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    overflow: "hidden",
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },

  input: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1.5,
    borderColor: "#C5B6FF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 14,
  },

  button: {
    backgroundColor: COLORS.primary,
    minHeight: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.28,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },

  buttonDisabled: {
    opacity: 0.75,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
  },

  linkText: {
    marginTop: 18,
    color: COLORS.primaryDark,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },

  message: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },

  successText: {
    color: COLORS.success,
  },

  errorText: {
    color: COLORS.error,
  },
});

export default globalStyles;