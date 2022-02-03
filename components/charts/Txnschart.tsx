import { Chart } from "react-google-charts";
import Skeleton from "react-loading-skeleton";
import { convertDate } from "../../utils/util";

export const options = {
  title: "Amount of Transactions in last 4 hours",
  curveType: "function",
  legend: { position: "bottom" },
};

const TxnsChart = ({ data, isLoading }) => {
  if (!data || data.length < 1) {
    return <Skeleton count={4} />
  }
  const chartData = [['Hour', 'Amount']];
  data.forEach((item: any) => chartData.push([convertDate(item?.timestamp), item?.amount]));

  return (
    <>
      {isLoading && <Skeleton count={4} />}
      {data && <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />}
    </>
  );
}

export default TxnsChart;