import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import PrivateLayout from "../components/layout/PrivateLayout";
import usePlazasContext from "../hooks/usePlazasContext";
import { Button, Modal, Portal } from "react-native-paper";
import { useEffect, useState } from "react";
import useUsersContext from "../hooks/useUsersContext";
import { getDocumentsByUserAndSubcollection } from "../services/documentServices";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import DocsGrid from "../components/ui/DocsGrid";
import CustomModal from "../components/layout/CustomModal";

const DocumentsScreen = () => {
  const { store } = usePlazasContext();
  const { userTenant } = useUsersContext();
  const [visible, setVisible] = useState(false);
  const [docs, setDocs] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
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
  const layout = useWindowDimensions();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const getDocs = async () => {
    setIsLoading(true);
    if (userTenant?.id) {
      const data = await getDocumentsByUserAndSubcollection(
        userTenant?.id,
        routes[index].key
      );
      setDocs(data?.docs);
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
          <Button textColor="#4866f0" onPress={showModal}>
            Subir Documento
          </Button>

          <CustomModal visible={visible} hideModal={hideModal}>
            <Text>Subir Documento</Text>
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
    marginBottom: 12,
    fontSize: 20,
    fontWeight: "500",
  },
});
