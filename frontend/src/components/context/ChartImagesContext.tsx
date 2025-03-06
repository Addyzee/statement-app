import { createContext, useContext } from "react"

type chartImagesContextType = {
    chartImage : string | null,
    setChartImage: React.Dispatch<React.SetStateAction<null | string>>

}

export const ChartImagesContext = createContext<chartImagesContextType>({
    chartImage: null,
    setChartImage: () => {}
})

export const useChartImages = () => {
    const context = useContext(ChartImagesContext)
    if(!context){
        throw new Error("useChartContext must be used within ChartImagesProvider");
    }
    return context
}

