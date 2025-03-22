import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import FormLogin from "../components/FormLogin";
import RootLayout from "../components/layout/RootLayout";

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <RootLayout>
      <FormLogin>
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
      </FormLogin>
    </RootLayout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPassword: {
    flexDirection: "row",
    gap: 4,
  },
  link: {
    fontSize: 14,
    color: "#4290f0",
    fontWeight: "bold",
  },
});
