import { useState, useEffect, useContext } from 'react';
import { Table, Popconfirm, Space, Tabs, Button } from 'antd';
import { updateStorages, removeStorage } from '../store/actions';
import { Context } from "../store";
import { useHistory } from "react-router-dom";
import AdminReservations from "../components/AdminReservations"

const { TabPane } = Tabs;



function callback(key) {
    console.log(key);
  }



const AdminHome = () => {
    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect (() => {
      async function fetchData(){
        fetch('http://localhost:8081/api/storage').then(res => {
            return res.json();
        }).then(async (data) =>{
            console.log(data);
            await dispatch(updateStorages(data));
            setIsLoading(false);
        }); 
      }
      fetchData();
    });  



    const columns = [
        {
        title: 'Name',
        dataIndex: 'name',
        editable: true,
        },
        {
        title: 'Number',
        dataIndex: 'number',
        editable: true,
        },
        {
        title: 'Volume',
        dataIndex: 'volume',
        editable: false,
        },
        {
        title: 'Floorspace',
        dataIndex: 'floorspace',
        editable: false,
        },
        {
        title: 'Priceperday',
        dataIndex: 'priceperday',
        editable: false,
        },
        {
            title: 'Action',
            key: 'key',
            render: (_,record) => (
                <div className= "action">
                <Space>   
                <Popconfirm title="Sure to delete?" onConfirm= { () => handleDelete(record._id)}>
                <Button type="primary" block >Delete</Button>
                </Popconfirm>
                <Popconfirm title="Sure to edit?" onConfirm= { () => handleEdit(record._id, record.name, record.number, record.volume, record.floorspace, record.priceperday)}>
                <Button type="primary" block >Edit</Button>
                </Popconfirm>
                </Space>
                </div>
            ),
        }

    
    ];

    async function handleDelete (id)  {
        console.log(id)
        dispatch(removeStorage(id));
        await fetch('http://localhost:8081/api/storage/delete/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json'
            }
        });    
        
        fetch('http://localhost:8081/api/storage').then(res => {
            return res.json();
        }).then((data) =>{
            dispatch(updateStorages(data));
        })
    }

    function handleEdit(ID, NAME, NUMBER, VOLUME, FLOORSPACE, PRICEPERDAY ){
        history.push("/EditStorage", {id: ID, name: NAME, number: NUMBER, volume: VOLUME, floorspace: FLOORSPACE, priceperday: PRICEPERDAY})
    }


    if (isLoading) {
        return (<div>Loading...</div>)
    } 



    return(
        <div>
            <h1>Admin edit</h1>

            <Tabs onChange={callback} type="card">
                <TabPane tab="Storages" key="1">
                    <Button onClick={() => { history.push('/newstorageadd')}} type="primary" style={{ marginBottom: 16 }}>
                        Add new storage
                    </Button>
                    <Table 
                        dataSource={state.storages.data} 
                        columns={columns} 
                        rowKey="_id" 
                        bordered
                    />
                </TabPane>
                <TabPane tab="Reservations" key="2">
                    <AdminReservations />
                    




                </TabPane>
            </Tabs>    
        </div>
    )
}    
export default AdminHome;
