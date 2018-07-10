const url = "http://localhost:3000/api/v1";

let token = localStorage.getItem("token");

export default {
  getTrips: () => {
    return fetch(`${url}/trips`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json());
  },

  getTrip: id =>
    fetch(`${url}/trips/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json()),

  postTrip: tripData => {
    return fetch(`${url}/trips/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
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
        Accept: "application/json",
        Authorization: `Bearer ${token}`
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
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(bookmarkData)
    });
  },

  addUser: userInfo => {
    return fetch(`${url}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userInfo)
    });
  },

  login: userInfo => {
    return fetch(`${url}/user_token`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userInfo)
    }).then(res => res.json());
  },

  getUser: () => {
    return fetch(`${url}/user`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json());
  }
};
