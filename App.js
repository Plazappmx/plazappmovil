import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import AuthProvider from "./src/contexts/auth/AuthProvider";
import RootNavigator from "./src/navigators/RootNavigator";

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
