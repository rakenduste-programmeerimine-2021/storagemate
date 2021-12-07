import { useState, useEffect, useContext } from 'react';
import { Table, Popconfirm, Button } from 'antd';
import { updateReservations, removeStorage } from '../store/actions';
import { Context } from "../store";
import { useHistory } from "react-router-dom";
import moment from 'moment';








const AdminReservations = () => {
    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    /*f(state.auth.token === null) {
        history.push('/login')
    }*/

    useEffect (() => {
        fetch('http://localhost:8081/api/reservation').then(res => {
            return res.json();
        }).then(async (data) =>{
            console.log(data);
            await dispatch(updateReservations(data))
            console.log(state.reservations.data)
            setIsLoading(false);
        }); 
    },[]);  



    const columns = [
        {
        title: 'Storage name',
        dataIndex: 'storageName',
        editable: true,
        },
        {
        title: 'Storage Number',
        dataIndex: 'storageNumber',
        editable: true,
        },
        {
        title: 'Start date',
        dataIndex: 'rentalstart',
        editable: false,
        render: (_,item) => (getFullDate(item.rentalstart))
        },
        {
        title: 'End date',
        dataIndex: 'rentalend',
        editable: false,
        render: (_,item) => (getFullDate(item.rentalend))

        },
        {
        title: 'Renting user',
        dataIndex: 'rentinguseremail',
        editable: false,
        },
        {
          title: 'Total price($)',
          dataIndex: 'totalprice',
          editable: false,
        },
        {
            title: 'Action',
            key: 'key',
            render: (_,item) => (
                <div className= "action">
                 {Date.parse(moment(item.rentalend).utc().format('MM/DD/YYYY')) > Date.now() ?
                <>
                <Popconfirm title="Sure to end reservation?" onConfirm= { () => handleEnd(item)}>
                <Button type="primary" block >End rental</Button>
                        
                </Popconfirm>
                </>
                :
                <></>
                }
                </div>
            ),
        }

    
    ];



    const getFullDate = (e) => {
        console.log(e)
        console.log(moment(e).utc().format('MM/DD/YYYY'))
        return (moment(e).utc().format('MM/DD/YYYY'))
        
        
      
      };


    async function handleEnd (item){
        console.log(item._id)

        const date= (moment(Date.now()).utc().format('MM/DD/YYYY'))
        const updatedReservation={
            storageid: item.storageid,
            rentalstart: item.rentalstart,
            rentalend: date,
            rentinguseremail: item.rentinguseremail,
            totalprice: item.totalprice,
            storageName: item.storageName,
            storageNumber: item.storageNumber,
            volume: item.volume,
            floorspace: item.floorspace,
            priceperday: item.priceperday
        }
        console.log(updatedReservation)

        const response = await fetch('http://localhost:8081/api/reservation/update/' + item._id, {
            method: 'PUT',
            body: JSON.stringify(updatedReservation),
            headers: {
                'Content-Type':'application/json',
                'Accept': 'application/json'
            }
        });
        //const data = await response.json();
        
        //console.log(data);
        
        if(response.ok){
            fetch('http://localhost:8081/api/reservation').then(res => {
                return res.json();
            }).then(async (data) =>{
                console.log(data);
                await dispatch(updateReservations(data))
                console.log(state.reservations.data)
                setIsLoading(false);
            }); 
        }else{
          alert("Saving changes failed!")
        };
          
  
  
  
      }


    if (isLoading) {
        return (<div>Loading...</div>)
    } 



    return(
        <div>
            <h1>Reservations</h1>
            <Table 
                dataSource={state.reservations.data} 
                columns={columns} 
                rowKey="_id" 
                bordered
            /> 
        </div>
    )
}    
export default AdminReservations;
