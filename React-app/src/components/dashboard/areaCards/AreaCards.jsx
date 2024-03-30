import React, { useState, useEffect } from "react";
import "./AreaCards.scss";
import AreaCard from "./AreaCard";

const AreaCards = ({ ordersData }) => {
  console.log("Received ordersData prop in AreaCards:", ordersData);

  const { totals } = ordersData;
  
  const [updatedTotals, setUpdatedTotals] = useState(totals);

  useEffect(() => {
    console.log("useEffect triggered with new totals:", totals);
    setUpdatedTotals(totals);
  }, [totals]);
  
  console.log("Updated totals:", updatedTotals);
  

  if (updatedTotals.refunded_orders && updatedTotals.refunded_orders.length > 0) {
    updatedTotals.refunded_orders.forEach(refundedOrder => {
      updatedTotals.total_sales_revenue -= refundedOrder.price;
      updatedTotals.total_profit -= refundedOrder.price;
    });
  }

  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={50}
        cardInfo={{
          title: "Total Sales Revenue",
          value: `$${updatedTotals.total_sales_revenue.toFixed(2)}`,
          text: "Today's total sales revenue",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={50}
        cardInfo={{
          title: "Total Profit",
          value: `$${updatedTotals.total_profit.toFixed(2)}`,
          text: "Today's total profit",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={50}
        cardInfo={{
          title: "Average Profit per Order",
          value: `$${totals.profit_per_order.toFixed(2)}`,
          text: "Average profit per order",
        }}
      />
    </section>
  );
};

export default AreaCards;
