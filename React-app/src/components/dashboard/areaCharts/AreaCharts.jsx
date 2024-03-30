import React from "react";
import AreaBarChart from "./AreaBarChart"
import AreaProgressChart from "./AreaProgressChart"

const AreaCharts = ({ ordersData }) => {
  return (
    <section className="content-area-charts">
      <AreaBarChart ordersData={ordersData} />
      <AreaProgressChart ordersData={ordersData} />
    </section>
  )
}

export default AreaCharts
