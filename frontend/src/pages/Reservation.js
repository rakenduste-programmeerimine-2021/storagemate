import React from "react";
import {useHistory, useLocation} from 'react-router-dom'


function Reservation() {
console.log(useLocation().state.id);
console.log(useLocation().state.name);
console.log(useLocation().state.volume);
console.log(useLocation().state.floorspace);
console.log(useLocation().state.status);
console.log(useLocation().state.startdate);
console.log(useLocation().state.enddate);


  return (
    <>
      <h1>Reservation</h1>
      <p>Siia tuleb broneerimise funktsionaalsus</p>
    </>
  )
}

export default Reservation;