import React, { useEffect, useState } from "react";

const AreaProgressChart = () => {
  const [mostSoldProducts, setMostSoldProducts] = useState([]);

  useEffect(() => {
    const fetchMostSoldProducts = async () => {
      try {
        // Make an API request to fetch orders data
        const response = await fetch("http://localhost:5000/api/orders");
        const ordersData = await response.json();
        console.log("Orders data:", ordersData);

        // Count occurrences of each product
        const productCounts = {};
        ordersData.orders.forEach(order => {
          const { id, product_name } = order;
          if (!productCounts[product_name]) {
            productCounts[product_name] = { id, name: product_name, count: 0 };
          }
          productCounts[product_name].count++;
        });
        console.log("Product counts:", productCounts);

        // Convert product counts to an array and sort by count in descending order
        const sortedProducts = Object.values(productCounts).sort((a, b) => b.count - a.count);
        console.log("Sorted products:", sortedProducts);

        // Set the most sold products state
        setMostSoldProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching most sold products:", error);
      }
    };

    fetchMostSoldProducts();
  }, []);

  return (
    <div className="progress-bar-cont">
      <div className="progress-bar-info">
        <h4 className="progress-bar-title">Most Sold Products</h4>
      </div>
      <div className="progress-bar-list">
        {mostSoldProducts.map((product) => (
          <div className="progress-bar-item" key={product.id}>
            <div className="bar-item-info">
              <p className="bar-item-info-name">{product.name}</p>
              <p className="bar-item-info-value">{product.count}</p>
            </div>
            <div className="bar-item-full">
              <div
                className="bar-item-filled"
                style={{
                  width: `${(product.count / mostSoldProducts[0].count) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaProgressChart;
