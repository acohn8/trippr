const url = "http://localhost:3000/api/v1/";

export default {
  getTrips: () => fetch(`${url}/trips`).then(res => res.json()),
  getTrip: id => fetch(`${url}/trips/${id}`).then(res => res.json()),
  postTrip: tripData => {
    return fetch(`${url}/trips/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(tripData)
    })
      .then(res => res.json())
      .catch(error => console.error(error));
  },
  archiveTrip: id =>
    fetch(`${url}/trips/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ status: false })
    }),
  postYelpRestaurantBookmark: (yelpData, trip_id) => {
    let bookmarkData = {
      title: yelpData.name,
      description: yelpData.categories
        .map(catObj => {
          return catObj.alias;
        })
        .join(", "),
      address: yelpData.location.display_address.join(" "),
      api_service: "Yelp",
      api_id: yelpData.id,
      trip_id: trip_id,
      image: yelpData.image_url,
      category: "restaurant"
    };
    return fetch(`${url}/bookmarks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(bookmarkData)
    });
  }
};
