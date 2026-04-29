// import React, { useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import COLORS from "../../constants/colors";

// export default function SplashScreen({ navigation }) {
//   useEffect(() => {
//     const checkLogin = async () => {
//       const token = await AsyncStorage.getItem("token");

//       setTimeout(() => {
//         if (token) {
//           // غيري "Login" لـ اسم الشاشة الرئيسية عندك لو موجودة
//           navigation.replace("Login");
//         } else {
//           navigation.replace("Login");
//         }
//       }, 1800);
//     };

//     checkLogin();
//   }, [navigation]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.bgTopLeft} />
//       <View style={styles.bgTopRight} />
//       <View style={styles.bgBottomLeft} />
//       <View style={styles.bgBottomRight} />

//       <View style={styles.dot1} />
//       <View style={styles.dot2} />
//       <View style={styles.dot3} />
//       <View style={styles.dot4} />

//       <View style={styles.card}>
//         <Text style={styles.smallText}>let&apos;s start</Text>

//         <View style={styles.illustrationWrap}>
//           <View style={styles.clockBubble}>
//             <Text style={styles.bubbleEmoji}>⏱</Text>
//           </View>

//           <View style={styles.mainCharacter}>
//             <Text style={styles.characterEmoji}>🧑🏽‍💻</Text>
//           </View>

//           <View style={styles.sideBubble1}>
//             <Text style={styles.bubbleEmoji}>🗂</Text>
//           </View>

//           <View style={styles.sideBubble2}>
//             <Text style={styles.bubbleEmoji}>📝</Text>
//           </View>
//         </View>

//         <Text style={styles.title}>Task Management{"\n"}& To-Do List</Text>

//         <Text style={styles.subtitle}>
//           This productive tool is designed to help you better manage your task
//           project-wise conveniently!
//         </Text>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.replace("Login")}
//           activeOpacity={0.85}
//         >
//           <Text style={styles.buttonText}>Let’s Start</Text>
//           <Text style={styles.arrow}>➜</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     overflow: "hidden",
//   },

//   bgTopLeft: {
//     position: "absolute",
//     width: 180,
//     height: 180,
//     borderRadius: 90,
//     backgroundColor: COLORS.softBlue,
//     top: 60,
//     left: -70,
//   },
//   bgTopRight: {
//     position: "absolute",
//     width: 180,
//     height: 180,
//     borderRadius: 90,
//     backgroundColor: COLORS.softMint,
//     top: 100,
//     right: -70,
//   },
//   bgBottomLeft: {
//     position: "absolute",
//     width: 220,
//     height: 220,
//     borderRadius: 110,
//     backgroundColor: COLORS.softLavender,
//     bottom: -50,
//     left: -90,
//   },
//   bgBottomRight: {
//     position: "absolute",
//     width: 180,
//     height: 180,
//     borderRadius: 90,
//     backgroundColor: COLORS.softPink,
//     bottom: 40,
//     right: -80,
//   },

//   dot1: {
//     position: "absolute",
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "#F6A4C9",
//     top: 120,
//     left: 50,
//   },
//   dot2: {
//     position: "absolute",
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "#B0D7FF",
//     top: 160,
//     right: 55,
//   },
//   dot3: {
//     position: "absolute",
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "#E8DC4F",
//     bottom: 180,
//     right: 60,
//   },
//   dot4: {
//     position: "absolute",
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: "#A8F0B2",
//     bottom: 220,
//     left: 72,
//   },

//   card: {
//     width: "100%",
//     maxWidth: 370,
//     backgroundColor: "rgba(255,255,255,0.8)",
//     borderRadius: 32,
//     paddingHorizontal: 24,
//     paddingTop: 24,
//     paddingBottom: 24,
//     alignItems: "center",
//   },

//   smallText: {
//     alignSelf: "flex-start",
//     color: "#4C8DFF",
//     fontSize: 14,
//     fontWeight: "700",
//     marginBottom: 14,
//   },

//   illustrationWrap: {
//     width: 220,
//     height: 220,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 24,
//     position: "relative",
//   },

//   mainCharacter: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: COLORS.white,
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: COLORS.shadow,
//     shadowOpacity: 0.08,
//     shadowRadius: 14,
//     shadowOffset: { width: 0, height: 8 },
//     elevation: 5,
//   },

//   characterEmoji: {
//     fontSize: 54,
//   },

//   clockBubble: {
//     position: "absolute",
//     top: 8,
//     left: 26,
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     backgroundColor: COLORS.white,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   sideBubble1: {
//     position: "absolute",
//     right: 12,
//     top: 60,
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     backgroundColor: COLORS.white,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   sideBubble2: {
//     position: "absolute",
//     left: 6,
//     bottom: 35,
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     backgroundColor: COLORS.white,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   bubbleEmoji: {
//     fontSize: 20,
//   },

//   title: {
//     fontSize: 34,
//     lineHeight: 40,
//     textAlign: "center",
//     fontWeight: "800",
//     color: COLORS.textPrimary,
//     marginBottom: 14,
//   },

//   subtitle: {
//     fontSize: 15,
//     lineHeight: 22,
//     textAlign: "center",
//     color: COLORS.textSecondary,
//     marginBottom: 28,
//     paddingHorizontal: 4,
//   },

//   button: {
//     width: "100%",
//     backgroundColor: COLORS.primary,
//     minHeight: 56,
//     borderRadius: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: COLORS.primary,
//     shadowOpacity: 0.28,
//     shadowRadius: 14,
//     shadowOffset: { width: 0, height: 8 },
//     elevation: 6,
//   },

//   buttonText: {
//     color: COLORS.white,
//     fontSize: 17,
//     fontWeight: "800",
//   },

//   arrow: {
//     color: COLORS.white,
//     fontSize: 18,
//     marginLeft: 10,
//     fontWeight: "700",
//   },
// });


import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import COLORS from "../constants/colors";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");

      setTimeout(() => {
        if (token) {
          router.replace("/home");
        } else {
          router.replace("/auth/login");
        }
      }, 3500);
    };

    checkLogin();
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgTopLeft} />
      <View style={styles.bgTopRight} />
      <View style={styles.bgBottomLeft} />
      <View style={styles.bgBottomRight} />

      <View style={styles.dot1} />
      <View style={styles.dot2} />
      <View style={styles.dot3} />
      <View style={styles.dot4} />

      <View style={styles.card}>
        <Text style={styles.smallText}>let&apos;s start</Text>

        <View style={styles.illustrationWrap}>
          <View style={styles.clockBubble}>
            <Text style={styles.bubbleEmoji}>⏱</Text>
          </View>

          <View style={styles.mainCharacter}>
            <Text style={styles.characterEmoji}>🧑🏽‍💻</Text>
          </View>

          <View style={styles.sideBubble1}>
            <Text style={styles.bubbleEmoji}>🗂</Text>
          </View>

          <View style={styles.sideBubble2}>
            <Text style={styles.bubbleEmoji}>📝</Text>
          </View>
        </View>

        <Text style={styles.title}>Task Management{"\n"}& To-Do List</Text>

        <Text style={styles.subtitle}>
          This productive tool is designed to help you better manage your task
          project-wise conveniently!
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/auth/login")}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Let’s Start</Text>
          <Text style={styles.arrow}>➜</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    overflow: "hidden",
  },

  bgTopLeft: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.softBlue,
    top: 60,
    left: -70,
  },

  bgTopRight: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.softMint,
    top: 100,
    right: -70,
  },

  bgBottomLeft: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: COLORS.softLavender,
    bottom: -50,
    left: -90,
  },

  bgBottomRight: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.softPink,
    bottom: 40,
    right: -80,
  },

  dot1: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F6A4C9",
    top: 120,
    left: 50,
  },

  dot2: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#B0D7FF",
    top: 160,
    right: 55,
  },

  dot3: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E8DC4F",
    bottom: 180,
    right: 60,
  },

  dot4: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#A8F0B2",
    bottom: 220,
    left: 72,
  },

  card: {
    width: "100%",
    maxWidth: 370,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: "center",
  },

  smallText: {
    alignSelf: "flex-start",
    color: "#4C8DFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 14,
  },

  illustrationWrap: {
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    position: "relative",
  },

  mainCharacter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },

  characterEmoji: {
    fontSize: 54,
  },

  clockBubble: {
    position: "absolute",
    top: 8,
    left: 26,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  sideBubble1: {
    position: "absolute",
    right: 12,
    top: 60,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  sideBubble2: {
    position: "absolute",
    left: 6,
    bottom: 35,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  bubbleEmoji: {
    fontSize: 20,
  },

  title: {
    fontSize: 34,
    lineHeight: 40,
    textAlign: "center",
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 14,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    color: COLORS.textSecondary,
    marginBottom: 28,
    paddingHorizontal: 4,
  },

  button: {
    width: "100%",
    backgroundColor: COLORS.primary,
    minHeight: 56,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primary,
    shadowOpacity: 0.28,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
  },

  arrow: {
    color: COLORS.white,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "700",
  },
});