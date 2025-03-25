import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Navbar from "./Navbar";
import useAuthContext from "../../hooks/useAuthContext";
import usePlazasContext from "../../hooks/usePlazasContext";
import useUsersContext from "../../hooks/useUsersContext";
import { getOneStore } from "../../services/plazasService";
import { getOneUser } from "../../services/userServices";

const PrivateLayout = ({ children }) => {
  const { isAuth, loggedUser } = useAuthContext();
  const { store, setStore } = usePlazasContext();
  const { setUserTenant } = useUsersContext();

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
    backgroundColor: "#F3F3F3",
  },
  container: {
    gap: 16,
    width: "100%",
  },
});

export default PrivateLayout;
