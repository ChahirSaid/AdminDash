// AreaCards.jsx

import React, { useState, useEffect } from "react";
import "./AreaCards.scss";
import AreaCard from "./AreaCard";

const AreaCards = ({ ordersData }) => {
  const [updatedTotals, setUpdatedTotals] = useState(null);

  useEffect(() => {
    if (ordersData) {
      const { totals, orders } = ordersData;
      if (orders && orders.length > 0 && totals.refunded_orders && totals.refunded_orders.length > 0) {
        const refundedAmount = totals.refunded_orders.reduce((acc, order) => acc + order.price, 0);
        setUpdatedTotals({
          ...totals,
          total_profit: totals.total_profit - refundedAmount * 0.7,
        });
      } else {
        setUpdatedTotals(totals);
      }
    }
  }, [ordersData]);

  if (!ordersData || !updatedTotals) {
    return <div>Loading...</div>;
  }

  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={(updatedTotals.total_sales_revenue / updatedTotals.total_profit) * 100}
        cardInfo={{
          title: "Total Sales Revenue",
          value: `$${updatedTotals.total_sales_revenue.toFixed(2)}`,
          text: "Today's total sales revenue",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={(updatedTotals.total_profit / updatedTotals.total_sales_revenue) * 100}
        cardInfo={{
          title: "Total Profit",
          value: `$${updatedTotals.total_profit.toFixed(2)}`,
          text: "Today's total profit",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={(updatedTotals.profit_per_order / updatedTotals.total_profit) * 100}
        cardInfo={{
          title: "Average Profit per Order",
          value: `$${updatedTotals.profit_per_order.toFixed(2)}`,
          text: "Average profit per order",
        }}
      />
    </section>
  );
};

export default AreaCards;
