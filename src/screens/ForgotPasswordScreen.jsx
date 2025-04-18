import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PublicLayout from "../components/layout/PublicLayout";
import FormForgotPassword from "../components/form/FormForgotPassword";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  return (
    <PublicLayout>
      <FormForgotPassword>
        <View style={styles.login}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.link}>¿Quieres iniciar sesión?</Text>
          </TouchableOpacity>
        </View>
      </FormForgotPassword>
    </PublicLayout>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    flexDirection: "row",
    gap: 4,
  },
  link: {
    fontSize: 14,
    color: "#4290f0",
    fontWeight: "bold",
  },
});
