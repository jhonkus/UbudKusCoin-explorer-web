import { Chart } from "react-google-charts";

export const data2 = [
  ["Year", "Num. Txn"],
  ["1", 20],
  ["2", 40],
  ["3", 50],
  ["4", 60],
  ["5", 20],
  ["6", 10],
  ["7", 60],
  ["8", 130],
  ["9", 10],
  ["10", 70],
  ["11", 60],
  ["12", 30],
  ["13", 10],
  ["14", 70],
  ["15", 60],
  ["16", 130],
  ["17", 130],
  ["18", 10],
  ["19", 70],
  ["20", 60],
  ["21", 30],
  ["22", 10],
  ["23", 70],
  ["24", 60]
];

export const options = {
  title: "Amount Transaction last 1 hour",
  curveType: "function",
  legend: { position: "bottom" },
};

function convertDate(unix_timestamp: string) {

  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(parseInt(unix_timestamp) * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  var formattedTime = hours + ':' + minutes.substr(-2);
  return formattedTime
}

const TxnsChart = ({ data, isLoading }) => {
  var data3 = data2;

  if (data && data.length > 0) {
    data3 = data;
  }

  let temp = [['Hour', 'Amount']];
  data3.forEach((item) => temp.push([convertDate(item?.timestamp), parseInt(item?.amount)]));


  return (

    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={temp}
      options={options}
    />

  );
}

export default TxnsChart;