import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import API from "../../services/api";
import globalStyles from "../constants/globalStyles";
import COLORS from "../constants/colors";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleRegister = async () => {
    setMessage("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (trimmedPassword.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      };

      const res = await API.post("/auth/register", payload);

      console.log("REGISTER SUCCESS:", res.data);
      setMessage("Account created successfully.");

      setTimeout(() => {
        router.replace("/auth/login");
      }, 1200);
    } catch (error) {
      const data = error.response?.data;

      if (typeof data === "string" && data.trim()) {
        setMessage(data);
      } else if (data?.detail) {
        setMessage(
          typeof data.detail === "string"
            ? data.detail
            : JSON.stringify(data.detail)
        );
      } else if (data?.message) {
        setMessage(data.message);
      } else if (data?.error) {
        setMessage(data.error);
      } else if (!error.response) {
        setMessage("Cannot connect to server.");
      } else {
        setMessage("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgTopLeft} />
      <View style={styles.bgTopRight} />
      <View style={styles.bgBottomRight} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={globalStyles.authWrapper}>
          <View style={globalStyles.authCard}>
            <View style={styles.topGlow} />

            <Text style={styles.pageLabel}>Sign Up</Text>

            <Text style={styles.mainTitle}>Welcome</Text>
            <Text style={styles.mainSubtitle}>
              It’s time to be productive
            </Text>

            <View style={styles.formHeaderRow}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>⇥</Text>
              </View>

              <View>
                <Text style={styles.formTitle}>Sign Up</Text>
                <Text style={styles.formHint}>
                  Enter Your Credentials to continue
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              placeholder="Your Name"
              placeholderTextColor="#A497CE"
              style={globalStyles.input}
              onChangeText={setName}
              value={name}
            />

            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="#A497CE"
              style={globalStyles.input}
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#A497CE"
              secureTextEntry
              style={globalStyles.input}
              onChangeText={setPassword}
              value={password}
            />

            <TouchableOpacity
              style={[globalStyles.button, loading && globalStyles.buttonDisabled]}
              onPress={handleRegister}
              disabled={loading}
              activeOpacity={0.85}
            >
              <Text style={globalStyles.buttonText}>
                {loading ? "Creating account..." : "Let’s Start"}
              </Text>
            </TouchableOpacity>

            {message ? (
              <Text
                style={[
                  globalStyles.message,
                  message.toLowerCase().includes("success")
                    ? globalStyles.successText
                    : globalStyles.errorText,
                ]}
              >
                {message}
              </Text>
            ) : null}

            <Text
              style={globalStyles.linkText}
              onPress={() => router.push("/auth/login")}
            >
              Already have an account? Login
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },

  bgTopLeft: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: COLORS.softPink,
    top: -50,
    left: -80,
  },

  bgTopRight: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: COLORS.softMint,
    top: 50,
    right: -70,
  },

  bgBottomRight: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: COLORS.softBlue,
    bottom: -95,
    right: -90,
  },

  topGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 140,
    backgroundColor: "#F7F7F3",
    opacity: 0.7,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  pageLabel: {
    fontSize: 14,
    color: "#A7A1BE",
    fontWeight: "600",
    marginBottom: 8,
  },

  mainTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginTop: 8,
  },

  mainSubtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 26,
  },

  formHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#B8A9FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  iconText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "800",
  },

  formTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },

  formHint: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#2D2547",
    opacity: 0.2,
    marginBottom: 18,
  },

  inputLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
});