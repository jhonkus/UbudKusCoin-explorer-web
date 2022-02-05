import { Chart } from "react-google-charts";
import Skeleton from "react-loading-skeleton";
import { convertDate } from "../../utils/util";


export const options = {
  title: "Number of Transactions in Last 4 hours",
  curveType: "function",
  legend: { position: "bottom" },
  vAxis: {
    title: 'Number of Transactions',
    ticks: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
  }
};

const TxnsAccount = ({ data, isLoading }) => {

  if (!data || data.length < 1) {
    return <Skeleton count={4} />
  }

  const chartData = [['Hour', 'Num. Txns vs Time']];
  data.forEach((item: any) => chartData.push([convertDate(item?.timestamp), item?.txn_count]));

  return (
    <>
      {isLoading && <Skeleton count={4} />}
      {data &&
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={chartData}
          options={options}
        />}
    </>
  );
}

export default TxnsAccount;