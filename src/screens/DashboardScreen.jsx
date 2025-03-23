import { FlatList, StyleSheet, Text, View } from "react-native";
import PrivateLayout from "../components/layout/PrivateLayout";

const DashboardScreen = () => {
  return (
    <PrivateLayout>
      <Text style={styles.title}>Dashboard</Text>
      <View>
        <Text style={styles.subTitle}>Información del Local</Text>

        <View style={styles.info}>
          <Text style={styles.infoTitle}>Arrendatario</Text>
          <FlatList
            style={styles.navContainer}
            data={["Nombre", "Correo", "Domicilio", "Teléfono"]}
            renderItem={({ item }) => (
              <Text style={styles.infoContent}>{item}: </Text>
            )}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.infoTitle}>Obligado Solidario</Text>
          <FlatList
            style={styles.navContainer}
            data={["Nombre", "Correo", "Dirección"]}
            renderItem={({ item }) => (
              <Text style={styles.infoContent}>{item}: </Text>
            )}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.infoTitle}>Información del Contacto</Text>
          <FlatList
            style={styles.navContainer}
            data={[
              "Objeto del local",
              "Monto",
              "Mts cuadrados",
              "Interés moratorio",
            ]}
            renderItem={({ item }) => (
              <Text style={styles.infoContent}>{item}: </Text>
            )}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </PrivateLayout>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  title: {
    paddingTop: 16,
    fontSize: 24,
    fontWeight: "600",
  },
  subTitle: {
    marginBottom: 12,
    fontSize: 20,
    fontWeight: "500",
  },
  info: {
    marginBottom: 12,
  },
  infoTitle: {
    marginBottom: 6,

    fontSize: 20,
    fontWeight: "500",
    color: "#4866f0",
  },
  infoContent: {
    fontSize: 18,
    color: "#4866f0",
  },
});
