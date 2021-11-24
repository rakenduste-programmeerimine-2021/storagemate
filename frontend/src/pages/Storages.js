import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store";
import { useHistory } from "react-router-dom";
import { updateStorages } from '../store/actions';
import { List, Card, Button } from 'antd';
import "./Storages.css";

function Storages() {
  const [state, dispatch] = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

 /*  if(state.auth.token === null) {
    history.push('/login')
  }
 */

  useEffect (() => {
    fetch('http://localhost:8081/api/storage').then(res => {
        return res.json();
    }).then(async (data) =>{
        console.log(data);
        await dispatch(updateStorages(data))
        console.log(state.storages.data)
        setIsLoading(false);
    }); 
  },[]);  


  function handleReservation(ID, NAME, VOLUME, FLOORSPACE, STATUS ){
    console.log(ID);
    console.log(NAME);
    console.log(VOLUME);
    console.log(FLOORSPACE)
    console.log(STATUS)
    history.push("/reservation", {id: ID, name: NAME, volume: VOLUME, floorspace: FLOORSPACE, status: STATUS})
        
}





  if (isLoading) {
    return (<div>Loading...</div>)
  } 

  return (
    <>
      <h1>Storages</h1>
      <p>Siin kuvame vabu ladusid vastavalt ajavahemikule</p>


      <List
        className= "storagelist"
        grid={{
          gutter: 20,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 5,
        }}
        dataSource={state.storages.data}
        renderItem={item => (
          <List.Item>
            <Card
              style={{width: 230}}
              cover={
                <img
                  alt="picture of storageunit"
                  src= "storagedoor.jpg"
                />  
              } 
              
              description={item.volume}
            >
              <h2>{item.name}</h2> 
              <p>Maht: {item.volume}</p>
              <p>pindala: {item.floorspace} </p>

              <p>Hind:</p>

              <Button 
                type="primary" block
                onClick= { () => handleReservation(item._id, item.name, item.volume, item.floorspace, item.status)}
              >
                Rohkem
              </Button>

              
            </Card>
              
          </List.Item>
        )}
  />
    </>
  )
}

export default Storages;