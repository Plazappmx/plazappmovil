import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/DashboardScreen";
import { Icon } from "react-native-paper";
import DocumentsScreen from "../screens/DocumentsScreen";

const Tab = createBottomTabNavigator();

const DashboardNavigator = () => {
  return (
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
          title: "Dashboard",
          tabBarIcon: () => <Icon source="home" color="#334cbb" size={30} />,
        }}
      />
      <Tab.Screen
        name="Documentos"
        component={DocumentsScreen}
        options={{
          tabBarIcon: () => <Icon source="file" color="#334cbb" size={30} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardNavigator;
