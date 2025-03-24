import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-paper";
import useAuthContext from "../../hooks/useAuthContext";
import { logout } from "../../services/authService";

const Navbar = () => {
  const { loggedUser } = useAuthContext();
  const navigation = useNavigation();

  return (
    <View style={styles.navBar}>
      <Text style={styles.logo}>PLAZAPP</Text>
      <Pressable
        onPress={async () => {
          await logout();
          navigation.navigate("Login");
        }}
        style={styles.profile}
      >
        <Text style={styles.email}>{loggedUser?.email}</Text>
        <Icon source="account" color="#334cbb" size={24} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#334cbb",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  email: {
    fontSize: 20,
    fontWeight: "500",
    color: "#334cbb",
  },
});

export default Navbar;
