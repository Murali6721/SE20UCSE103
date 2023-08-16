const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;


app.get('', (req, res) => {
    const url = 'http://20.244.56.144/train/trains';
    const accessToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIxOTQyNDQsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiNmU1Y2I0ZDItMDkzYy00YmNjLThlNDQtYzUyNTE0ZmRlMTQ4Iiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IlNFMjBVQ1NFMTAzIn0.-rbF2nT6X4fPrN70xTB3Og3Kurt1d_eZHfzR8mIgV4I'
  axios.get(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => {
    // Send the train details as the response
    res.json(response.data);
    console.log(response.data);
  })
  .catch(error => {
    // Handle errors and send an error response
    res.status(500).json({ error: 'Error fetching train details' });
  });
});


app.listen(port, () => {
  console.log(`Server is running http://localhost:3000`);
});
