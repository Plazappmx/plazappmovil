import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/navigators/RootStack";


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <RootStack />
    </NavigationContainer>
  )
}
