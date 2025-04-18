import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuthContext from "../../hooks/useAuthContext";
import { logout } from "../../services/authService";

const PublicLayout = ({ children }) => {
  const { isAuth, loggedUser } = useAuthContext();
  const navigation = useNavigation();

  useEffect(() => {
    if (isAuth && loggedUser?.role === "tenant") {
      navigation.navigate("Private");
      return;
    }

    if (!loggedUser?.role === "tenant") {
      (async () => {
        await logout();
      })();
      console.log("Sesión terminada");
    }
  }, [isAuth]);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.logo}>PLAZAPP</Text>
        {children}
      </View>
    </View>
  );
};

export default PublicLayout;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
  },
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    paddingHorizontal: 16,
  },
});
