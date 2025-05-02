import { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PrivateLayout from "../components/layout/PrivateLayout";
import DocsGrid from "../components/ui/DocsGrid";
import CustomModal from "../components/layout/CustomModal";
import FormDoc from "../components/form/FormDoc";
import usePlazasContext from "../hooks/usePlazasContext";
import useUsersContext from "../hooks/useUsersContext";
import { getDocumentsByUserAndSubcollection } from "../services/documentServices";
import useAuthContext from "../hooks/useAuthContext";
import CameraCapture from "../components/ui/CameraCapture";

const DocumentsScreen = () => {
  const { loggedUser } = useAuthContext();
  const { store } = usePlazasContext();
  const { userTenant } = useUsersContext();
  const [visible, setVisible] = useState(false);
  const [docs, setDocs] = useState([]);
  const [allowDeleteDocs, setAllowDeleteDocs] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "lessor", title: "Arrendador" },
    { key: "general", title: "General" },
    { key: "invoices", title: "Facturas" },
    {
      key: "paymentReceipts",
      title: "Comprobantes de Pago",
    },
    {
      key: "electricity",
      title: "Electricidad",
    },
    {
      key: "water",
      title: "Agua",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [photo, setPhoto] = useState(null);
  const layout = useWindowDimensions();

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setPhoto(null);
  };

  const openCamera = () => setCameraVisible(true);
  const closeCamera = () => setCameraVisible(false);

  const allowDelete = allowDeleteDocs?.includes(routes[index].key);
  const isTenant = loggedUser && loggedUser?.role === "tenant";

  const userId =
    routes[index].key === "lessor" ? loggedUser?.adminId : userTenant?.id;

  const getDocs = async () => {
    setIsLoading(true);
    if (userId) {
      const data = await getDocumentsByUserAndSubcollection(
        userId,
        routes[index].key
      );
      setDocs(data?.docs);
      setAllowDeleteDocs(data?.allowDeleteDocs);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDocs();
  }, [userTenant?.id, index]);

  const renderComponent = () =>
    !isLoading ? (
      docs?.length > 0 ? (
        <DocsGrid
          userId={userTenant?.id}
          docs={docs}
          docType={routes[index].key}
          allowDelete={allowDelete || !isTenant}
          getDocs={getDocs}
        />
      ) : (
        <View style={{ width: "100%", alignItems: "center", padding: 50 }}>
          <Text>No hay documentos para mostrar</Text>
        </View>
      )
    ) : (
      <View style={{ width: "100%", alignItems: "center", padding: 50 }}>
        <Text>Cargando documentos...</Text>
      </View>
    );

  const renderScene = SceneMap({
    lessor: renderComponent,
    general: renderComponent,
    invoices: renderComponent,
    paymentReceipts: renderComponent,
    electricity: renderComponent,
    water: renderComponent,
  });

  const onIndexChange = (index) => {
    setIsLoading(true);
    setIndex(index);
  };

  return (
    <PrivateLayout visible={visible} hideModal={hideModal}>
      <View style={styles.fixedHeader}>
        <Text style={styles.title}>Documentos</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.subTitle}>{store?.name}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 6,
              alignItems: "center",
            }}
          >
            <Button
              mode="contained"
              buttonColor="#e4e4e4"
              textColor="#4866f0"
              onPress={showModal}
              style={{ borderRadius: 12 }}
            >
              Subir documento
            </Button>
          </View>

          <CustomModal visible={visible} hideModal={hideModal}>
            <FormDoc
              photo={photo}
              setPhoto={setPhoto}
              userId={userTenant?.id}
              getDocs={getDocs}
              hideModal={hideModal}
              openCamera={openCamera}
            />
          </CustomModal>
        </View>
      </View>
      <View style={styles.container}>
        <TabView
          renderTabBar={(props) => (
            <TabBar
              style={{ backgroundColor: "#F3F3F3" }}
              indicatorStyle={{ backgroundColor: "#4866f0", height: 3 }}
              activeColor="#4866f0"
              inactiveColor="#4866f0"
              scrollEnabled
              {...props}
            />
          )}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={onIndexChange}
          initialLayout={{ width: layout.width }}
          style={{ paddingTop: 120 }}
        />
      </View>

      <Modal visible={cameraVisible} animationType="slide">
        <CameraCapture setPhoto={setPhoto} onClose={closeCamera} />
      </Modal>
    </PrivateLayout>
  );
};

export default DocumentsScreen;

const styles = StyleSheet.create({
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#F3F3F3",
    zIndex: 10,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  scrollContainer: { paddingBottom: 64, minHeight: "100%" },
  title: {
    paddingVertical: 16,
    fontSize: 24,
    fontWeight: "600",
  },
  container: {
    paddingHorizontal: 8,
    paddingBottom: 64,
    minHeight: "100%",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
});
