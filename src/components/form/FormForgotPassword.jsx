import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../ui/CustomInput";
import CustomButton from "../ui/CustomButton";
import { resetPassword } from "../../services/authService";

const FormForgotPassword = ({ children }) => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const onSubmit = async () => {
    try {
      await resetPassword({ email });
      navigation.replace("Login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>
        Ingresa tu email y te enviaremos un correo con un enlace para
        restablecer tu contraseña:
      </Text>
      <View style={styles.inputContainer}>
        <CustomInput
          label="Email"
          value={email}
          onChange={setEmail}
          icon="email"
        />
      </View>
      <CustomButton label="Restablecer contraseña" onPress={onSubmit} />
      {children}
    </View>
  );
};

export default FormForgotPassword;

const styles = StyleSheet.create({
  form: {
    width: "95%",
    maxWidth: 400,
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.33,
    shadowRadius: 24,
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
    fontSize: 18,
    color: "#000000",
  },
  inputContainer: {
    width: "100%",
  },
});
