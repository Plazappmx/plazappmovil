import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/DashboardScreen";
import { Icon } from "react-native-paper";
import DocumentsScreen from "../screens/DocumentsScreen";
import PlazasProvider from "../contexts/plazas/PlazasProvider";
import UsersProvider from "../contexts/users/UsersProvider";

const Tab = createBottomTabNavigator();

const PrivateScreensNavigator = () => {
  return (
    <PlazasProvider>
      <UsersProvider>
        <Tab.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerShown: false,
            tabBarInactiveTintColor: "#9c9ea7",
            tabBarActiveTintColor: "#334cbb",
          }}
          backBehavior="history"
        >
          <Tab.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              tabBarIcon: () => (
                <Icon source="home" color="#334cbb" size={30} />
              ),
            }}
          />
          <Tab.Screen
            name="Documentos"
            component={DocumentsScreen}
            options={{
              tabBarIcon: () => (
                <Icon source="file" color="#334cbb" size={30} />
              ),
            }}
          />
        </Tab.Navigator>
      </UsersProvider>
    </PlazasProvider>
  );
};

export default PrivateScreensNavigator;
