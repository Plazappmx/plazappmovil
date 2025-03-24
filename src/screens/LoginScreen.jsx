import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FormLogin from "../components/form/FormLogin";
import PublicLayout from "../components/layout/PublicLayout";

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <PublicLayout>
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
    </PublicLayout>
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
