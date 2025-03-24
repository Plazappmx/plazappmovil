import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthProvider from "./src/contexts/auth/AuthProvider";
import PlazasProvider from "./src/contexts/plazas/PlazasProvider";
import UsersProvider from "./src/contexts/users/UsersProvider";
import RootNavigator from "./src/navigators/RootNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <PlazasProvider>
        <UsersProvider>
          <SafeAreaView style={styles.container}>
            <NavigationContainer>
              <StatusBar style="auto" />
              <RootNavigator />
            </NavigationContainer>
          </SafeAreaView>
        </UsersProvider>
      </PlazasProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
