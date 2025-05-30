import React from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#f4f4f4", // Adding background color
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "#2E86C1", // Header color
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
    fontStyle: "italic",
  },
  date: {
    fontSize: 10,
    textAlign: "right",
    marginBottom: 20,
    color: "#888",
  },
  section: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: "1px solid #ddd", // Lighter border
  },
  orderTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#34495E",
    fontWeight: "bold", // Order ID section with bold
  },
  text: {
    marginBottom: 6,
    fontSize: 12,
  },
  bold: {
    fontWeight: "bold",
  },
  productList: {
    marginLeft: 15,
    marginBottom: 10,
  },
  productItem: {
    marginBottom: 5,
    fontSize: 12,
    color: "#555",
  },
  total: {
    textAlign: "right",
    marginTop: 10,
    fontSize: 14,
    color: "#27AE60",
    fontWeight: "bold", // Total price in bold
  },
  invoiceNumber: {
    fontSize: 12,
    color: "#555",
    marginTop: 10,
    marginBottom: 10,
    fontStyle: "italic", // Invoice number styled differently
  },
  line: {
    borderBottom: "2px solid #2E86C1",
    margin: "20px 0",
  },
  footer: {
    textAlign: "center",
    fontSize: 10,
    color: "#888",
    marginTop: 30,
  },
  footerLink: {
    color: "#2E86C1",
    textDecoration: "none",
  },
});

const OrdersPDF = ({ orders }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <Text style={styles.header}>Customer Orders Report</Text>
      <Text style={styles.subHeader}>Invoice</Text>
      <Text style={styles.date}>Generated on: {new Date().toLocaleDateString()}</Text>

      {/* Orders List */}
      {orders.map((order, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.orderTitle}>Order ID: {order.id}</Text>
          <Text style={styles.invoiceNumber}>Invoice No: {order.id}</Text>
          <Text style={styles.text}><span style={styles.bold}>Date:</span> {order.date}</Text>
          <Text style={styles.text}><span style={styles.bold}>Customer Name:</span> {order.customer.name}</Text>
          <Text style={styles.text}><span style={styles.bold}>Email:</span> {order.customer.email}</Text>
          <Text style={styles.text}><span style={styles.bold}>Phone:</span> {order.customer.phone}</Text>
          <Text style={styles.text}><span style={styles.bold}>Address:</span> {order.customer.address}</Text>

          <Text style={[styles.text, styles.bold, { marginTop: 10 }]}>Products:</Text>
          <View style={styles.productList}>
            {order.products.map((product, idx) => (
              <Text key={idx} style={styles.productItem}>
                • {product.name} - ₹{product.price.toLocaleString()}
              </Text>
            ))}
          </View>

          <Text style={styles.line}></Text> {/* Line for separation */}

          <Text style={styles.total}>Total: ₹{order.total.toLocaleString()}</Text>
        </View>
      ))}

      {/* Footer */}
      <View style={styles.footer}>
        <Text>
          <a href="/privacy" style={styles.footerLink}>Privacy Policy</a> |{" "}
          <a href="/terms" style={styles.footerLink}>Terms of Service</a>
        </Text>
        <Text>&copy; 2025 Home Appliance Service. All rights reserved.</Text>
      </View>
    </Page>
  </Document>
);

const DownloadReport = ({ filteredOrders }) => (
  <PDFDownloadLink
    document={<OrdersPDF orders={filteredOrders} />}
    fileName="CustomerOrdersReport.pdf"
    className="btn btn-success fw-bold"
  >
    📄 Download PDF Report
  </PDFDownloadLink>
);

export default DownloadReport;
