import { StyleSheet, Text, View } from "react-native";
import useAuthContext from "../../hooks/useAuthContext";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const RootLayout = ({ children }) => {
  const { isAuth } = useAuthContext();
  const navigation = useNavigation();

  useEffect(() => {
    if (isAuth) {
      navigation.navigate("Dashboard");
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

export default RootLayout;

const styles = StyleSheet.create({
  main: {
    flex: 1,
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
