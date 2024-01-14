import { ResponsiveContainer, Treemap, Tooltip } from "recharts";
import { FC } from "react";
import CustomizedContent from "./treeMap/CustomizedContent";
import CustomTooltip from "./treeMap/CustomTooltip";

interface Props {
  loadingData: boolean;
  dataForTreeChart: { name: string; value: number }[];
  selectedServiceIndexes: number[] | undefined;
  handleSelectedService: (index: number) => void;
}

const TreeMap: FC<Props> = ({
  loadingData,
  dataForTreeChart,
  selectedServiceIndexes,
  handleSelectedService
}) => {
  const sumOfTreeChartValues = dataForTreeChart.reduce(
    (sum, data) => (sum += data.value),
    0
  );

  return (
    <ResponsiveContainer width="100%">
      <Treemap
        width={200}
        data={dataForTreeChart}
        aspectRatio={4 / 3}
        dataKey="value"
        content={
          <CustomizedContent
            data={dataForTreeChart}
            sumOfData={sumOfTreeChartValues}
            loading={loadingData}
            selectedIndexs={selectedServiceIndexes}
            onClickHandler={handleSelectedService}
          />
        }
      >
        <Tooltip content={<CustomTooltip sumOfData={sumOfTreeChartValues} />} />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default TreeMap;
