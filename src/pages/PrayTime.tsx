import React, { useEffect } from "react";
import { Last } from "react-bootstrap/esm/PageItem";

export const PrayTime = () => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(
        "http://api.aladhan.com/v1/calendar?latitude=" +
          position.coords.latitude +
          "&longitude=" +
          position.coords.longitude +
          "&method=2&month=" +
          (new Date().getUTCMonth() + 1) +
          "&" +
          new Date().getUTCFullYear()
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
        });
    });
  }, []);
  return <div>
      
  </div>;
};
