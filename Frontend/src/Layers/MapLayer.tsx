import Map, { Marker, Popup } from "react-map-gl/maplibre";
import { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { format } from "timeago.js";
import * as React from "react";
import state from "../Helpers/state";
import { useSnapshot } from "valtio";
const MapLayer = () => {
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const snap = useSnapshot(state);
  const [show, setShow] = useState(false);
  const [pins, setPins] = useState<any[]>([]);
  const [newPin, setNewPin] = useState({
    username: "",
    title: "",
    desc: "",
    rating: 0,
    lat: 0,
    long: 0,
  });

  const [initialViewState, setInitialViewState] = useState({
    longitude: 78.8718,
    latitude: 21.7679,
    zoom: 13,
  });

  const [newPlace, setNewPlace] = useState<{
    lat: number;
    long: number;
  } | null>(null);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("http://localhost:8888/map/pins");
        console.log(res.data);
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPins();
  }, []);

  const user = snap.user.username;

  const handleMarkerHover = (index: number, lat: number, long: number) => {
    setHoveredPin(index);
    setShow(true);
    setInitialViewState({
      longitude: long,
      latitude: lat,
      zoom: 13,
    });
  };

  const handleMarkerLeave = () => {
    setHoveredPin(null);
    setShow(false);
  };

  const handleDblClick = (event: any) => {
    event.preventDefault();
    if (!newPlace) {
      console.log(event.lngLat);
      const lat = event.lngLat.lat;
      const long = event.lngLat.lng;
      setNewPlace({ lat, long });
      initialViewState.longitude = long;
      initialViewState.latitude = lat;
      initialViewState.zoom = 30;
    }
  };

  const handleAdd = async (lat: number, long: number) => {
    try {
      const res = await axios.post("http://localhost:8888/map/pins", {
        username: user,
        title: newPin.title,
        desc: newPin.desc,
        rating: newPin.rating,
        lat,
        long,
      });
      setPins([...pins, res.data]);
      setNewPin({
        username: "",
        title: "",
        desc: "",
        rating: 0,
        lat: 0,
        long: 0,
      });
      setNewPlace(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (newPlace) {
      setInitialViewState({
        longitude: newPlace.long,
        latitude: newPlace.lat,
        zoom: 13,
      });
    }
  }, [newPlace]);

  return (
    <>
      <Map
        initialViewState={initialViewState}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle={import.meta.env.VITE_MAP_KEY!}
        onClick={handleDblClick}
      >
        {pins.map((pin) => (
          <React.Fragment key={pin._id}>
            <Marker longitude={pin.long} latitude={pin.lat} anchor="top">
              <button
                onMouseEnter={() =>
                  handleMarkerHover(pin._id, pin.lat, pin.long)
                }
                onMouseLeave={handleMarkerLeave}
                style={{
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  border: "none",
                }}
              >
                <img
                  width={30}
                  src={`${
                    pin.username === user
                      ? "https://cdn.iconfinder.com/stored_data/1400609/128/png?token=1701436318-MMdNw7PCBkLP1FbuTcTXFm5OEXE3D%2B%2B7DLu8Jrkucxw%3D"
                      : "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-256.png"
                  }`}
                  alt={pin.title}
                />
              </button>
            </Marker>
            {hoveredPin === pin._id && (
              <Popup
                key={`popup-${pin._id}`}
                longitude={pin.long}
                latitude={pin.lat}
                anchor="bottom"
                className={`popup ${
                  show ? "active" : "hidden"
                } w-[50rem] scale-125`}
                onClose={() => {
                  setHoveredPin(null);
                  setShow(false);
                }}
              >
                <div className="Card bg-white p-4 rounded-md shadow-md">
                  <label className="text-gray-600  lasb" htmlFor="">
                    Place :
                  </label>
                  <h4 className="place text-lg font-semibold mb-2">
                    {pin.title}
                  </h4>
                  <label className="text-gray-600 lasb" htmlFor="">
                    Review:
                  </label>
                  <p className="desc mb-4">{pin.desc}</p>
                  <label className="text-gray-600 lasb" htmlFor="">
                    Rating:
                  </label>
                  <div className="flex">
                    {Array.from({ length: pin.rating }).map((_, i) => (
                      <img
                        key={i}
                        width={20}
                        src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/star-256.png"
                        alt={`Star ${i + 1}`}
                        className="mr-1"
                      />
                    ))}
                  </div>

                  <label className="text-gray-600 lasb" htmlFor="">
                    Information:
                  </label>
                  <div className="flex justify-between flex-col">
                    <span className="username">
                      Created by <b>{pin.username}</b>
                    </span>
                    <span className="date">{format(pin.createdAt)}</span>
                  </div>
                </div>
              </Popup>
            )}
          </React.Fragment>
        ))}
        {newPlace && snap.user.username?.length! > 0 && (
          <Popup
            longitude={newPlace.long}
            latitude={newPlace.lat}
            anchor="bottom"
            closeButton={true}
            className="popup"
            onClose={() => {
              setNewPlace(null);
            }}
          >
            <form>
              <label className="lasb" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                className="title"
                placeholder="Title"
                value={newPin.title}
                onChange={(e) =>
                  setNewPin({ ...newPin, title: e.target.value })
                }
              />
              <label className="lasb" htmlFor="desc">
                Description
              </label>
              <textarea
                className="desc "
                placeholder=" Say something about this place"
                value={newPin.desc}
                onChange={(e) => setNewPin({ ...newPin, desc: e.target.value })}
              ></textarea>
              <label className="lasb" htmlFor="rating">
                Rating
              </label>
              <select
                className="rating"
                name="rating"
                value={newPin.rating}
                onChange={(e) =>
                  setNewPin({ ...newPin, rating: Number(e.target.value) })
                }
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button
                className="btn"
                type="submit"
                onClick={() => handleAdd(newPlace.lat, newPlace.long)}
              >
                Add Pin
              </button>
            </form>
          </Popup>
        )}
      </Map>
    </>
  );
};

export default MapLayer;
