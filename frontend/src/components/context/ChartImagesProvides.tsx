import React, { useState } from "react";
import { ChartImagesContext } from "./ChartImagesContext";
type ChartImageProviderProps = {
  children: React.ReactNode;
};
const ChartImagesProvider = ({ children }: ChartImageProviderProps) => {
  const [chartImage, setChartImage] = useState<string | null>(null);
  const values = { chartImage, setChartImage };

  return <ChartImagesContext.Provider value={values}>{children}</ChartImagesContext.Provider>;
};

export default ChartImagesProvider;
