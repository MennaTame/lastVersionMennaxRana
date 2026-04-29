// import { Stack } from "expo-router";

// export default function Layout() {
//   return <Stack screenOptions={{ headerShown: false }} />;
// }

// import { useEffect } from "react";
// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return <Stack screenOptions={{ headerShown: false }} />;
// }

// export default function Index() {
//   const router = useRouter();

//   useEffect(() => {
//     router.replace("/(auth)/login");
//   }, []);

//   return null;
// }

import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}