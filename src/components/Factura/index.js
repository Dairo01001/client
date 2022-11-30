import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import Logo from "../../img/logo.jpeg";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    margin: 50,
  },
  title: {
    fontSize: 30,
    paddingBottom: 15,
    textAlign: "center",
  },
  text: {
    fontSize: 30,
    paddingBottom: 15,
  },
  containerImage: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: "80%",
  },
  terminosCondiciones: {
    bottom: "1px",
  },
});

const Factura = ({ factura }) => {
  return (
    <PDFDownloadLink
      document={
        <Document>
          <Page style={styles.page} size="A4">
            <View style={styles.containerImage}>
              <Image style={styles.image} src={Logo}></Image>
            </View>
            <View>
              <Text style={styles.title}>{factura.plaque}</Text>
            </View>
            <View>
              <Text style={styles.title}>{factura.date}</Text>
            </View>
            <View>
              <Text style={styles.text}>Nombre: {factura.fullName}</Text>
            </View>
            <View>
              <Text style={styles.text}>Telefono: {factura.phone}</Text>
            </View>
            <View>
              <Text style={styles.text}>
                Descripcion: {factura.description}
              </Text>
            </View>
            <View>
              <Text style={styles.text}>Total: {factura.total}</Text>
            </View>
            <View>
              <Text style={styles.text}>
                Metodo de pago: {factura.paymentMethod}
              </Text>
            </View>
            <View>
              <Text style={styles.title}>
                {factura.isPaid ? "Pagado" : "Debe"}
              </Text>
            </View>
            <View style={styles.terminosCondiciones}>
              <Text style={styles.title}>Terminos y Condiciones</Text>
              <Text style={{ fontSize: "25" }}>
                Una vez retirado el vehiculo no se aceptan quejas ni reclamos,
                por favor revisar el Vehiculo antes de retirarse
              </Text>
            </View>
          </Page>
        </Document>
      }
      fileName={factura.plaque}
    >
      {({ loading }) => (loading ? "Cargando documento!" : "Descargar para Imprimir")}
    </PDFDownloadLink>
  );
};

export default Factura;
