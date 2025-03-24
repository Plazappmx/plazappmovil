import { View, StyleSheet } from "react-native";
import Navbar from "./Navbar";

const PrivateLayout = ({ children }) => {
  return (
    <View style={styles.main}>
      <Navbar />
      <View style={styles.container}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 18,
  },
  container: {
    gap: 16,
    width: "100%",
  },
});

export default PrivateLayout;
