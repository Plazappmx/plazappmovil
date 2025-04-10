import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import DashboardNavigator from "./DashboardNavigator";
import PlazasProvider from "../contexts/plazas/PlazasProvider";
import UsersProvider from "../contexts/users/UsersProvider";
import { PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator();

const PrivateScreensNavigator = () => {
  return (
    <PlazasProvider>
      <UsersProvider>
        <PaperProvider>
          <Stack.Navigator
            initialRouteName="DashboardNav"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="DashboardNav" component={DashboardNavigator} />
            <Stack.Screen name="Perfil" component={ProfileScreen} />
          </Stack.Navigator>
        </PaperProvider>
      </UsersProvider>
    </PlazasProvider>
  );
};

export default PrivateScreensNavigator;
