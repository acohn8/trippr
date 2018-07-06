import React from "react";

const url = "http://localhost:3000/api/v1/";

export default {
  getTrips: () => {
    fetch(`${url}/trips`)
      .then(res => res.json())
      .then(trips => console.log(trips));
  },
  getTrip: () => {
    fetch(`${url}/trips/1`)
      .then(res => res.json())
      .then(trips => console.log(trips));
  }
};
