import { Page, Document, Text } from "@react-pdf/renderer";
import Styles from "./styles";
import { SummarySectionPDF } from "./SummarySectionPDF";

const AnalysisPDF = () => {
  return (
    <Document style={Styles.body}>
      <Page style={{ width: "100%" }} wrap={false}>
        <SummarySectionPDF />
      </Page>
      <Page>
        <Text style={{ fontWeight: 600 }}>1. Income Breakdown</Text>
      </Page>
    </Document>
  );
};

export default AnalysisPDF;
