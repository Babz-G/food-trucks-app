import { useState, useEffect } from "react";
import "../App.css";

function Home() {
  const [trucks, setTrucks] = useState([]);
  const [searchBar, setSearchBar] = useState("");

  useEffect(() => {
    async function fetchTrucks() {
      const response = await fetch("/api/get-all-food-trucks");
      const data = await response.json();
      setTrucks(data);
    }
    fetchTrucks();
  }, []);

  const findTruck = trucks.filter((truck) =>
    truck.name.toLowerCase().includes(searchBar.toLowerCase())
  ); //search bar

  return (
    <>
      <h1>All Food Trucks</h1>
      <h2 className="truck-counter">
        Total number of food trucks: {trucks.length}
      </h2>

      <input
        className="search-bar"
        type="text"
        placeholder="🔍 Search for a food truck here"
        value={searchBar}
        onChange={(e) => setSearchBar(e.target.value)}
      />

      <div className="card-container">
        {findTruck.map((truck) => (
          <div className="card" key={truck.id}>
            <h2>
              {truck.name}{" "}
              {truck.rating >= 4.5 ? (
                <span className="top-rated-text">Top Rated</span>
              ) : (
                ""
              )}
            </h2>

            <p>
              <strong>Id: </strong>
              {truck.id}
            </p>
            <p>
              <strong>Location: </strong>
              {truck.current_location}
            </p>
            <p>
              <strong>Daily Special:</strong> {truck.daily_special}
            </p>
            <p>
              <strong>Slogan: </strong>
              {truck.slogan}
            </p>
            <p>
              <strong>Has Vegan Options:</strong>{" "}
              {truck.has_vegan_options ? "Yes ✅" : "No ❌"}
            </p>
            {/* <p>Price Level: {truck.price_level}</p> */}
            <p>
              <strong>Price Level: </strong>
              {"💰".repeat(truck.price_level)}
            </p>
            {/* Repeats the 💰 emoji based on the price level number. */}
            {/* <p>Rating: {truck.rating}</p> */}
            <p>
              <strong>Rating: </strong>
              {"⭐️".repeat(Math.floor(truck.rating))} ({truck.rating})
              {/* Repeats the ⭐️ emoji (Rounds down to whole number - whomp whomp.) */}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
