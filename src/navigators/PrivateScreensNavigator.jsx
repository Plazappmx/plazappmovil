import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/DashboardScreen";
import { Icon } from "react-native-paper";

const Tab = createBottomTabNavigator();

const PrivateScreensNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarActiveTintColor: "#334cbb",
      }}
      backBehavior="history"
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: () => <Icon source="home" color="#334cbb" size={30} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default PrivateScreensNavigator;
