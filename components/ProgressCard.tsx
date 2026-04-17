import { View, Text, StyleSheet } from "react-native";

export default function ProgressCard({ progress }: { progress: number }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your Today is Almost Done!</Text>
      <Text style={styles.percent}>{progress}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#6C4CF1",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: { color: "#fff" },
  percent: { color: "#fff", fontSize: 22, marginTop: 10 },
});