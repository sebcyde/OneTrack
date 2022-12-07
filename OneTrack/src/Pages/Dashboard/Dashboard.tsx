import React from 'react';
import DoughnutChart from '../../Components/Charts/DoughnutChart';
import LineChartComponent from '../../Components/Charts/LineChart';
import StackedBar from '../../Components/Charts/StackedBar';

type Props = {};

function Dashboard({}: Props) {
	return (
		<div>
			{/* <h2 className="DashboardHeader">Welcome Back</h2> */}
			<DoughnutChart />
			<LineChartComponent />
		</div>
	);
}

export default Dashboard;
