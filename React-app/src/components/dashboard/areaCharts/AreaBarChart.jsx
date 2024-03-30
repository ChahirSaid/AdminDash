import React, { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../../context/ThemeContext";
import { FaArrowUpLong } from "react-icons/fa6";
import { LIGHT_THEME } from "../../../constants/themeConstants";
import "./AreaCharts.scss";

const AreaBarChart = ({ ordersData }) => {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [months, setMonths] = useState([]);
  const [percentageDifference, setPercentageDifference] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    if (ordersData && ordersData.orders) {
      const uniqueMonths = new Set();
      const chartData = ordersData.orders.reduce((acc, order) => {
        const date = new Date(order.date);
        const month = date.toLocaleString("default", { month: "short" });
        const monthYear = `${month}`;
        uniqueMonths.add(monthYear);
  
        if (!acc[monthYear]) {
          acc[monthYear] = {
            month: monthYear,
            profit: 0,
            loss: 0,
          };
        }
  
        if (order.status === 'Refunded') {
          acc[monthYear].loss += Math.abs(order.price);
        } else if (order.price > 0) {
          acc[monthYear].profit += order.price;
        } else {
          acc[monthYear].loss += Math.abs(order.price);
        }
  
        return acc;
      }, {});
  
      const sortedMonths = Array.from(uniqueMonths).sort((a, b) => {
        const monthsOrder = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        return monthsOrder.indexOf(a) - monthsOrder.indexOf(b);
      });
  
      setMonths(sortedMonths);
      setData(sortedMonths.map(month => chartData[month]));
  
      // Calculate total revenue for the current month
      setTotalRevenue(ordersData.totals.total_sales_revenue);
  
      // Calculate percentage difference
      const prevMonthRevenue = ordersData.orders.reduce((acc, order, index) => {
        if (index === ordersData.orders.length - 2) {
          return acc + Math.abs(order.price);
        }
        return acc;
      }, 0);
      const percentDiff = ((totalRevenue - prevMonthRevenue) / prevMonthRevenue) * 100;
      setPercentageDifference(percentDiff.toFixed(2));
    }
  }, [ordersData, totalRevenue]);  

  const formatTooltipValue = (value) => {
    return `${value}`;
  };

  const formatYAxisLabel = (value) => {
    return `${value}`;
  };

  const formatLegendValue = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <div className="bar-chart">
      <div className="bar-chart-info">
        <h5 className="bar-chart-title">Total Revenue</h5>
        <div className="chart-info-data">
          <div className="info-data-value">{`$${totalRevenue}`}</div>
          <div className="info-data-text">
            <FaArrowUpLong />
            <p>{`${percentageDifference}% than last month.`}</p>
          </div>
        </div>
      </div>
      <div className="bar-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="month"
              tickSize={0}
              axisLine={false}
              tick={{
                fill: `${theme === LIGHT_THEME ? "#676767" : "#f3f3f3"}`,
                fontSize: 14,
              }}
            />
            <YAxis
              tickFormatter={formatYAxisLabel}
              tickCount={6}
              axisLine={false}
              tickSize={0}
              tick={{
                fill: `${theme === LIGHT_THEME ? "#676767" : "#f3f3f3"}`,
              }}
            />
            <Tooltip
              formatter={formatTooltipValue}
              cursor={{ fill: "transparent" }}
            />
            <Legend
              iconType="circle"
              iconSize={10}
              verticalAlign="top"
              align="right"
              formatter={formatLegendValue}
            />
            <Bar
              dataKey="profit"
              fill="#475be8"
              activeBar={false}
              isAnimationActive={false}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
            <Bar
              dataKey="loss"
              fill="#e3e7fc"
              activeBar={false}
              isAnimationActive={false}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaBarChart;
