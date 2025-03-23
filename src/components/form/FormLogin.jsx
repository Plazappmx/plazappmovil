import { StyleSheet, Text, View } from "react-native";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { signIn } from "../../services/authService";

const FormLogin = ({ children }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const INPUT_LOGIN_FIELDS = [
    {
      name: "email",
      value: email,
      onChange: setEmail,
      label: "Ingresa tu email",
      icon: "email",
    },
    {
      name: "password",
      value: password,
      onChange: setPassword,
      label: "Ingresa tu contraseña",
      icon: "key",
      secure: true,
    },
  ];

  const onSubmit = async () => {
    try {
      const res = await signIn({ email, password });
      if (res) {
        navigation.replace("Dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Inicia sesión con tu email y contraseña:</Text>
      {INPUT_LOGIN_FIELDS.map(
        ({ label, value, onChange, icon, secure }, index) => (
          <View key={`input-${index}`} style={styles.inputContainer}>
            <CustomInput
              label={label}
              value={value}
              onChange={onChange}
              icon={icon}
              secure={secure}
            />
          </View>
        )
      )}
      <CustomButton label="Iniciar Sesión" onPress={onSubmit} />
      {children}
    </View>
  );
};

export default FormLogin;

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
    fontFamily: "DMSans-Regular",
    color: "#000000",
  },
  inputContainer: {
    width: "100%",
  },
});
