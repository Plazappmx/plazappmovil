import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Navbar from "./Navbar";
import useAuthContext from "../../hooks/useAuthContext";
import usePlazasContext from "../../hooks/usePlazasContext";
import useUsersContext from "../../hooks/useUsersContext";
import { getOneStore } from "../../services/plazasService";
import { getOneUser } from "../../services/userServices";
import CustomModal from "./CustomModal";
import TermsNotification from "../ui/TermsNotification";
import PasswordNotification from "../ui/PasswordNotification";

const PrivateLayout = ({ children }) => {
  const { isAuth, loggedUser } = useAuthContext();
  const { store, setStore } = usePlazasContext();
  const { setUserTenant } = useUsersContext();
  const [modal, setModal] = useState({ visible: false, notif: null });

  const fetchStore = async () => {
    const res = await getOneStore(loggedUser?.storeId);
    setStore(res);
  };

  const fetchUserTenant = async () => {
    if (store?.tenantId) {
      const res = await getOneUser(store?.tenantId);
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

      if (store?.tenantId) {
        fetchUserTenant();
      }
    }
  }, [loggedUser?.storeId, store?.tenantId]);

  useEffect(() => {
    if (!loggedUser?.termsAccepted) {
      setModal({ visible: true, notif: "terms" });
    } else if (loggedUser?.termsAccepted && !loggedUser?.passwordChanged) {
      setModal({ visible: true, notif: "password" });
    }
  }, []);

  return (
    <View style={styles.main}>
      <Navbar />
      <View style={styles.container}>{children}</View>
      <CustomModal visible={modal.visible}>
        {modal.notif === "terms" ? (
          <TermsNotification
            loggedUserId={loggedUser?.id}
            updateModal={() => setModal({ visible: true, notif: "password" })}
          />
        ) : (
          <PasswordNotification
            hideModal={() => setModal({ visible: false, notif: null })}
          />
        )}
      </CustomModal>
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
