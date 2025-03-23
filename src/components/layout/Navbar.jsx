import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-paper";

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navBar}>
      <Text style={styles.logo}>PlAZAPP</Text>
      <Pressable
        // onPress={() => {
        //   navigation.navigate("Profile");
        // }}
        style={styles.profile}
      >
        <Text style={styles.email}>Perfil</Text>
        <Icon source="account" size={20} />
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
    paddingHorizontal: 24,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  email: {
    fontSize: 20,
    fontWeight: "600",
  },
});

export default Navbar;
