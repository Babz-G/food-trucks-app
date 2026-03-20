import { useState, useEffect } from "react";
import "../App.css";

function Home() {
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {
    async function fetchTrucks() {
      const response = await fetch("/api/get-all-food-trucks");
      const data = await response.json();
      setTrucks(data);
    }
    fetchTrucks();
  }, []);

  return (
    <>
      <h1>All Food Trucks</h1>
      <h2>Total number of food trucks: {trucks.length}</h2>

      <div className="card-container">
        {trucks.map((truck) => (
          <div className="card" key={truck.id}>
            <h2>
              {truck.name}{" "}
              {truck.rating >= 4.5 ? (
                <span className="top-rated-text">Top Rated</span>
              ) : (
                ""
              )}
            </h2>

            <p>Id: {truck.id}</p>
            <p>Location: {truck.current_location}</p>
            <p>Daily Special: {truck.daily_special}</p>
            <p>Slogan: {truck.slogan}</p>
            <p>
              Has Vegan Options: {truck.has_vegan_options ? "Yes ✅" : "No ❌"}
            </p>
            {/* <p>Price Level: {truck.price_level}</p> */}
            <p>Price Level: {"💰".repeat(truck.price_level)}</p>
            {/* Repeats the 💰 emoji based on the price level number. */}
            {/* <p>Rating: {truck.rating}</p> */}
            <p>
              Rating: {"⭐️".repeat(Math.floor(truck.rating))} ({truck.rating})
              {/* Repeats the ⭐️ emoji (Rounds down to whole number - whomp whomp.) */}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
