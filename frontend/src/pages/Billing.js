import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Billing = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/billing')
      .then(response => setInvoices(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Billing</h1>
      <ul>
        {invoices.map(invoice => (
          <li key={invoice._id}>
            Invoice #{invoice.invoiceNumber} - ${invoice.amount} ({invoice.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Billing;