import React from "react";

const url = "http://localhost:3000/api/v1/";

export default {
  getTrips: () => {
    return fetch(`${url}/trips`).then(res => res.json());
  },
  getTrip: id => {
    return fetch(`${url}/trips/${id}`).then(res => res.json());
  },
  postTrip: tripData => {
    return fetch(`${url}/trips/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(tripData)
    });
  }
};
