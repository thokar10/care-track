import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AIInsights = () => {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/ai/64f1a2b3c4d5e6f7a8b9c0d1/health-trend')
      .then(response => setTrends(response.data.trend))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>AI Insights</h1>
      <ul>
        {trends.map((trend, index) => (
          <li key={index}>Trend: {trend}</li>
        ))}
      </ul>
    </div>
  );
};

export default AIInsights;