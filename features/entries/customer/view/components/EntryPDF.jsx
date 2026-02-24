import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "SolaimanLipi",
  fonts: [
    {
      src: "/fonts/SolaimanLipi_22-02-2012.ttf",
      fontWeight: "normal",
    },
    {
      src: "/fonts/SolaimanLipi_Bold_10-03-12.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "SolaimanLipi",
  },
  header: {
    marginBottom: 20,
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#333",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  brandName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  contactSection: {
    marginTop: 4,
  },
  contactRow: {
    flexDirection: "row",
    marginTop: 2,
  },
  contactLabel: {
    fontSize: 9,
    color: "#666",
  },
  contactValue: {
    fontSize: 9,
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  label: {
    color: "#666",
  },
  value: {
    fontWeight: "normal",
  },
  bold: {
    fontWeight: "bold",
  },
  table: {
    marginTop: 8,
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  col1: { width: "50%" },
  col2: { width: "15%", textAlign: "center" },
  col3: { width: "17.5%", textAlign: "right" },
  col4: { width: "17.5%", textAlign: "right" },
  col5: { width: "17.5%", textAlign: "right" },
  headerText: {
    fontWeight: "bold",
    fontSize: 10,
  },
  totalSection: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "#333",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  twoColumns: {
    flexDirection: "row",
    gap: 20,
  },
  column: {
    flex: 1,
  },
});

const statusConfig = {
  Pending: { bg: "#fef3c7", color: "#92400e" },
  Confirmed: { bg: "#dbeafe", color: "#1e40af" },
  Shipped: { bg: "#e0f2fe", color: "#075985" },
  Delivered: { bg: "#dcfce7", color: "#166534" },
};

const SITE_NAME = "Grahok";
const CONTACT_MOBILE = process.env.NEXT_PUBLIC_CONTACT_MOBILE_NUMBER;
const CONTACT_ADDRESS = process.env.NEXT_PUBLIC_CONTACT_ADDRESS;

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default function EntryPDF({ entry }) {
  if (!entry) {
    return null;
  }

  const status = statusConfig[entry.orderStatus] || {
    bg: "#f3f4f6",
    color: "#374151",
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Image src="/logo.png" style={styles.logo} />
            <View>
              <Text style={styles.brandName}>{SITE_NAME}</Text>
              <View style={styles.contactSection}>
                <View style={styles.contactRow}>
                  <Text style={styles.contactLabel}>Mobile: </Text>
                  <Text style={styles.contactValue}>{CONTACT_MOBILE}</Text>
                </View>
                <View style={styles.contactRow}>
                  <Text style={styles.contactLabel}>Address: </Text>
                  <Text style={styles.contactValue}>{CONTACT_ADDRESS}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginTop: 16,
              marginBottom: 8,
              paddingBottom: 4,
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
            }}
          >
            <Text style={styles.sectionTitle}>
              Customer & Delivery Information
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
              <Text style={[styles.statusText, { color: status.color }]}>
                {entry.orderStatus.charAt(0).toUpperCase() +
                  entry.orderStatus.slice(1)}
              </Text>
            </View>
          </View>
          {entry.customer && (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{entry.customer.name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{entry.customer.mobileNumber}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.value}>{entry.customer.address}</Text>
              </View>
            </>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Shipping Method:</Text>
            <Text style={styles.value}>{entry.shippingMethod || "N/A"}</Text>
          </View>
          {entry.cnNumber && (
            <View style={styles.row}>
              <Text style={styles.label}>CN Number:</Text>
              <Text style={styles.value}>{entry.cnNumber}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.col1}>Product</Text>
              <Text style={[styles.col2, styles.headerText]}>Qty</Text>
              <Text style={[styles.col3, styles.headerText]}>Price</Text>
              <Text style={[styles.col4, styles.headerText]}>Discount</Text>
              <Text style={[styles.col5, styles.headerText]}>Total</Text>
            </View>
            {entry.products.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.col1}>
                  {item.product?.name || `Product ${index + 1}`}
                </Text>
                <Text style={styles.col2}>{item.quantity}</Text>
                <Text style={styles.col3}>
                  {formatCurrency(item.sellPrice)}
                </Text>
                <Text style={styles.col4}>{formatCurrency(item.discount)}</Text>
                <Text style={styles.col5}>{formatCurrency(item.subtotal)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.value}>{formatCurrency(entry.subtotal)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Shipping Charge</Text>
            <Text style={styles.value}>
              {entry.shippingCustomer > 0
                ? formatCurrency(entry.shippingCustomer)
                : "Free"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Discount</Text>
            <Text style={styles.value}>
              {formatCurrency(entry.totalDiscount)}
            </Text>
          </View>
          {entry.courierTax > 0 && (
            <View style={styles.row}>
              <Text style={styles.label}>Courier Tax</Text>
              <Text style={styles.value}>
                {formatCurrency(entry.courierTax)}
              </Text>
            </View>
          )}
          <View style={[styles.row, styles.totalSection]}>
            <Text style={styles.bold}>Total</Text>
            <Text style={styles.bold}>
              {formatCurrency(
                entry.subtotal + entry.shippingCustomer - entry.overallDiscount,
              )}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
