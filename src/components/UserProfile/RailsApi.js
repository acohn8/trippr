import React from "react";

const url = "http://localhost:3000/api/v1/";

export default {
  getTrips: () => {
    fetch(`${url}/trips`).then(res => res.json());
  },
  getTrip: id => {
    fetch(`${url}/trips/${id}`).then(res => res.json());
  },
  postTrip: tripData => {
    fetch(`${url}/trips/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(tripData)
    });
  }
};
