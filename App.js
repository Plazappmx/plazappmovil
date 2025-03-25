import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import AuthProvider from "./src/contexts/auth/AuthProvider";
import RootNavigator from "./src/navigators/RootNavigator";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <PaperProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <RootNavigator />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
