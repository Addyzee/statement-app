import { Font } from "@react-pdf/renderer";
import QuickSand from "assets/fonts/Quicksand/Quicksand-VariableFont_wght.ttf"

Font.register({
    family: "Quicksand",
    src: QuickSand
})


const AnalysisPDF = () => {
  return (
    <div>AnalysisPDF</div>
  )
}

export default AnalysisPDF