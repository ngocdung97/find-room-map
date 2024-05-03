"use client";

import { Position } from "@types/geolocation";
import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import ReactDOMServer from "react-dom/server";
import RoomDetail from "./room-detail";

const Map = () => {
  const mapRef = React.useRef(null);

  const getPosition = (): Promise<Position> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey:
          process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ??
          "AIzaSyBdNhuKVaMSGBWYjjm78ldvBg-3G4JRU3c",
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");
      const { Marker } = await loader.importLibrary("marker");

      const position = await getPosition();

      // add marker
      // map options
      const mapOptions: google.maps.MapOptions = {
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        zoom: 15,
      };
      const map = new Map(mapRef.current as any, mapOptions);
      const markerOptions: google.maps.MarkerOptions = {
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        map,
      };
      // add multiple markers
      const markers = [
        { lat: position.coords.latitude, lng: position.coords.longitude }, // San Francisco
        {
          lat: position.coords.latitude + 0.0522,
          lng: position.coords.longitude + 0.002,
        }, // Los Angeles
        {
          lat: position.coords.latitude + 0.8781,
          lng: position.coords.longitude - 0.6298,
        }, // Chicago
      ];

      markers.forEach((markerPosition) => {
        const markerOptions: google.maps.MarkerOptions = {
          position: markerPosition,
          map,
        };
        new Marker(markerOptions);
      });

      // add event listener to markers

      markers.forEach((markerPosition, index) => {
        const markerOptions: google.maps.MarkerOptions = {
          position: markerPosition,
          map,
        };
        const marker = new Marker(markerOptions);
        marker.addListener("click", () => {
          // show popup
          const infoWindow = new google.maps.InfoWindow({
            content: ReactDOMServer.renderToString(
              <RoomDetail
                key={index}
                room={{
                  id: index,
                  name: "Room 1",
                  description: "This is room 1",
                }}
              />
            ),
          });
          infoWindow.open(map, marker);
        });
      });

      // const marker = new Marker(markerOptions);
    };

    initMap();
  }, []);
  return <div className="w-full h-full" ref={mapRef}></div>;
};

export default Map;
