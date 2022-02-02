import { Chart } from "react-google-charts";


export const data2 = [
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
];

export const options = {
  title: "Number of Transaction in Last 4 hour",
  curveType: "function",
  legend: { position: "bottom" },
};


function convertDate(unixTimestamp: string) {

  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  const date = new Date(parseInt(unixTimestamp) * 1000);
  // Hours part from the timestamp
  const hours = date.getHours();
  // Minutes part from the timestamp
  const minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  // var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  const formattedTime = hours + ':' + minutes.substr(-2);
  return formattedTime
}

const TxnsAccount = ({ data, isLoading }) => {

  let data3 = data2;

  if (data && data.length > 0) {
    data3 = data;
  }

  console.log('=== data: ', data);

  const temp = [['Hour', 'Num-Txns']];
  data3.forEach((item:any) => temp.push([convertDate(item?.timestamp), item?.txn_count]));
  // data3.forEach((item:any) => temp.push([convertDate(item?.timestamp), item?.amount]));


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

export default TxnsAccount;