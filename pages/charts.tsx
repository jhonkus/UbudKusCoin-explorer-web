import React from 'react';
import useSWR from 'swr';
import Layout from '../components/Layout';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AnalyticsChartsPage() {
  const { data: bcInfo } = useSWR('/api/infos/bcinfo', fetcher, { refreshInterval: 5000 });
  const { data: chartData } = useSWR('/api/chart', fetcher);

  const labels = chartData?.datas?.map((p: any) => p.date || p.day || `Day ${p.id || 1}`) || ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
  const txCounts = chartData?.datas?.map((p: any) => p.count || p.num || 1) || [12, 19, 3, 5, 2, 8, 15];

  const lineChartData = {
    labels,
    datasets: [
      {
        label: 'Daily Transaction Growth',
        data: txCounts,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const barChartData = {
    labels: ['Validators', 'Active Accounts', 'Block Proposals (x100)'],
    datasets: [
      {
        label: 'Network Metrics',
        data: [4, Number(bcInfo?.NumAcc || 7), Math.round(Number(bcInfo?.NumBloks || 2200) / 100)],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
      },
    ],
  };

  return (
    <Layout pageTitle="Analytics & Charts - UbudKusCoin Explorer">
      <div className="container my-5 pt-4">
        <h1 className="h3 font-weight-bold mb-2">Network Analytics & Charts</h1>
        <p className="text-muted mb-4">
          Visual metrics tracking block creation, transaction velocity, and account adoption.
        </p>

        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-header bg-light">
                <h5 className="card-title mb-0 fs-6 fw-bold">Transaction History Trend</h5>
              </div>
              <div className="card-body">
                <Line data={lineChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-header bg-light">
                <h5 className="card-title mb-0 fs-6 fw-bold">Consensus & State Distribution</h5>
              </div>
              <div className="card-body">
                <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
