import React, { useState, useContext } from "react";
import { Context } from "../store";
import { useHistory } from "react-router-dom";
import { updateStorages } from '../store/actions';
import { List, Card, Button } from 'antd';
import "./Storages.css";
import { DatePicker, Space } from 'antd';
import moment from 'moment';

var startdate;
var enddate;
var daycount;


function Storages() {
  const [state, dispatch] = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { RangePicker } = DatePicker;
  

  function disabledDate(current) {
    return current && current < moment().endOf('day');
  }


   async function onChange (dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    startdate = dateStrings[0];
    enddate = dateStrings[1];
   
    let sdate = Date.parse(startdate);
    let edate = Date.parse(enddate);
    

    var Difference_In_Time = edate - sdate;
    daycount = parseInt(Difference_In_Time / (1000 * 3600 * 24));

    const response = await  fetch('http://localhost:8081/api/reservation/bydate/', {
        method: 'POST',
        body: JSON.stringify({
            startdate,
            enddate
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        
    })
  

    const reservedStorageIds = await response.json()

   

    fetch('http://localhost:8081/api/storage').then(res => {
        return res.json();
    }).then(async (fulldata) =>{
      
        var data = fulldata.filter(object => !reservedStorageIds.includes(object._id))

        dispatch(updateStorages(data))

        setIsLoading(false);
    });

  
  }

  function handleReservation(ID, NAME, NUMBER, VOLUME, FLOORSPACE, STATUS, STARTDATE, ENDDATE, PRICEPERDAY, DAYCOUNT ){
   
    history.push("/reservation", {id: ID, name: NAME, number: NUMBER, volume: VOLUME, floorspace: FLOORSPACE, status: STATUS, startdate: STARTDATE, enddate: ENDDATE, priceperday: PRICEPERDAY, daycount: DAYCOUNT})
        
  }


  return (
    <>
      <div>
        <h1>Storages</h1>
        <p>Here are available storage units by given timeperiod</p>
        <Space className="datepicker" direction="vertical" size={12}>
        <h1>Timeperiod:</h1>
          <RangePicker  
            disabledDate={disabledDate}
            allowClear={false}
            size="large"
            ranges={{
              Today: [moment(), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
            }}
            onChange={onChange}
          />
        </Space>
      </div>


      {!isLoading ? 
        
        <List
          className= "storagelist"
          grid={{
            gutter: 20,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={state.storages.data}
          renderItem={item => (
            <List.Item>
              <Card
                style={{width: 230}}
                cover={
                  <img
                    alt="storageunit"
                    src= "storagedoor.jpg"
                  />  
                } 
                
                description={item.volume}
              >
                <h2>{item.name}</h2> 
                <p>Volume: {item.volume}</p>
                <p>Floorspace: {item.floorspace} </p>
                <p>Price: {item.priceperday * daycount}$</p>

                <Button 
                  type="primary" block
                  onClick= { () => {!state.auth.token ? 

                    history.push('/login')
                    : 
                    handleReservation(item._id, item.name, item.number, item.volume, item.floorspace, item.status, startdate, enddate, item.priceperday, daycount)
                  
                    }
                  }  
                >
                  Select
                </Button>

                
              </Card>
                
            </List.Item>
          )}

        />
        :
        
        <h1 className="message" >To see available storage units, you need to select dates first.</h1>
      
        
        
         
      }
    
  </>
  )
}

export default Storages;