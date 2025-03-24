import { ScrollView, StyleSheet, Text, View } from "react-native";
import PrivateLayout from "../components/layout/PrivateLayout";
import useAuthContext from "../hooks/useAuthContext";
import { getOneStore } from "../services/plazasService";
import { useEffect } from "react";
import usePlazasContext from "../hooks/usePlazasContext";
import useUsersContext from "../hooks/useUsersContext";
import { getOneUser } from "../services/userServices";

const DashboardScreen = () => {
  const { isAuth, loggedUser } = useAuthContext();
  const { store, setStore } = usePlazasContext();
  const { userTenant, setUserTenant } = useUsersContext();

  const fetchStore = async () => {
    const res = await getOneStore(loggedUser?.storeId);
    setStore(res);
  };

  const fetchUserTenant = async () => {
    if (store?.tenantId) {
      const res = await getOneUser(store.tenantId);
      setUserTenant(res);
    } else {
      setUserTenant({});
    }
  };

  useEffect(() => {
    if (isAuth) {
      if (loggedUser?.storeId) {
        fetchStore();
      }

      if (store.tenantId) {
        fetchUserTenant();
      }
    }
  }, [loggedUser?.storeId, store.tenantId]);

  const TENANT_INFO = [
    { label: "Nombre", value: userTenant?.name },
    { label: "Correo", value: userTenant?.email },
    { label: "Domicilio", value: userTenant?.address ?? "--" },
    { label: "Teléfono", value: userTenant?.phoneNumber ?? "--" },
  ];

  return (
    <PrivateLayout>
      <View style={styles.fixedHeader}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subTitle}>
          Información del Local: {store?.name}
        </Text>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingTop: 100 }}>
          <View style={styles.info}>
            <Text style={styles.infoTitle}>Arrendatario</Text>
            {TENANT_INFO.map((item, index) => (
              <View key={`${item.label}-${index}`}>
                <Text style={styles.infoContent}>
                  <Text style={styles.infoContentLabel}>{item.label}:</Text>{" "}
                  {item.value}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.info}>
            <Text style={styles.infoTitle}>Obligado Solidario</Text>
            {["Nombre", "Correo", "Dirección"].map((item, index) => (
              <View key={`${item}-${index}`}>
                <Text style={styles.infoContent}>
                  <Text style={styles.infoContentLabel}>{item}:</Text>{" "}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.info}>
            <Text style={styles.infoTitle}>Información del Contacto</Text>
            {[
              "Objeto del local",
              "Monto",
              "Mts cuadrados",
              "Interés moratorio",
              "Último día de pago",
              "Fecha de inicio del Contrato de Arrendamiento",
              "Fecha de terminación del Contrato de Arrendamiento",
              "Nueva fecha de terminación de Contrato de Arrendamiento Renovado",
              "Nueva Vigencia",
            ].map((item, index) => (
              <View key={`${item}-${index}`}>
                <Text style={styles.infoContent}>
                  <Text style={styles.infoContentLabel}>{item}:</Text>{" "}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </PrivateLayout>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    zIndex: 10,
    paddingHorizontal: 8,
  },
  scrollContainer: { paddingBottom: 64 },
  title: {
    paddingVertical: 16,
    fontSize: 24,
    fontWeight: "600",
  },
  container: {
    paddingHorizontal: 8,
  },
  subTitle: {
    marginBottom: 12,
    fontSize: 20,
    fontWeight: "500",
  },
  info: {
    padding: 12,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#dde2f7",
    borderRadius: 16,
  },
  infoTitle: {
    marginBottom: 6,
    fontSize: 20,
    fontWeight: "600",
    color: "#334cbb",
  },
  infoContent: {
    marginBottom: 4,
    paddingHorizontal: 4,
    fontSize: 18,
    color: "#6e81da",
  },
  infoContentLabel: {
    fontWeight: "500",
    color: "#4866f0",
  },
});
