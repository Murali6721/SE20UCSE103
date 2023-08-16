import React, { useEffect, useState } from 'react';
import './App.css'; 

function TrainDetails() {
  const [trainData, setTrainData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredTrains, setFilteredTrains] = useState([]);

  useEffect(() => {
    const url = 'http://20.244.56.144/train/trains';
    const accessToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIyMDAyOTEsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiNmU1Y2I0ZDItMDkzYy00YmNjLThlNDQtYzUyNTE0ZmRlMTQ4Iiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IlNFMjBVQ1NFMTAzIn0.WKVzJih9K8z4aRuWgIdAfN3fPkmimM8-mFP8rZt8Nd8'

    

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (Array.isArray(data)){
      const sortedTrainDetails = data.slice().sort((a, b) => {

        // Sort in decreasing order of seat availability (Sleeper)
        const aSleeperSeats = a.seatsAvailable.sleeper+a.seatsAvailable.AC;
        const bSleeperSeats = b.seatsAvailable.sleeper+b.seatsAvailable.AC;

        if (bSleeperSeats !== aSleeperSeats) {
          return bSleeperSeats - aSleeperSeats;
        }
         

        // Sort in increasing order of price
        const aSleeperPrice = a.price.sleeper;
        const bSleeperPrice = b.price.sleeper;
        
        if (aSleeperPrice !== bSleeperPrice) {
          return aSleeperPrice - bSleeperPrice;
        }
 
        // If prices and sleeper seat availability are the same, sort by departure time
        return new Date(b.departureTime) - new Date(a.departureTime);
      });
        setTrainData(sortedTrainDetails);
      } else {
        console.error('Invalid API response structure:', data);
      }
    })
    .catch(error => console.error('Error fetching train details:', error));
  }, []);

  useEffect(() => {
    const filtered = trainData.filter(train =>
      train.trainNumber.includes(searchInput)
    );
    setFilteredTrains(filtered);
  }, [searchInput, trainData]);

  return (
    <div className="train-details-container">
      <h1 className="heading">Train Schedule</h1>
      <input
        type="text"
        id="trainNumberId"
        placeholder="Search by Train Number"
        value={searchInput}
        onChange={event => setSearchInput(event.target.value)}
        className="search-input"
      />


      <ul className="trains-container">
        {filteredTrains.map((train, index) => (
          <li key={index} className="train-item">
            <p><strong>Train Name:</strong> {train.trainName}</p>
            <p><strong>Train Number:</strong> {train.trainNumber}</p>
            <p><strong>Departure Time:</strong> {train.departureTime.Hours}:{train.departureTime.Minutes}</p>
            <p><strong>Seats Available </strong> sleeper:{train.seatsAvailable.sleeper}, AC: {train.seatsAvailable.AC}</p>
            <p><strong>Price: </strong>Sleeper: {train.price.sleeper}, AC: {train.price.AC}</p>
            <p><strong>Delayed By:</strong> {train.delayedBy} hr</p>
            <hr className="divider" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrainDetails;