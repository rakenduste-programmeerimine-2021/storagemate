import React, {useContext, useState/*,useEffect*/} from 'react';
import 'antd/dist/antd.css';
import { useHistory } from "react-router-dom";
import { Menu } from 'antd';
import { UserOutlined, DropboxOutlined, HomeOutlined, InfoOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
import "./Navbar.css";
import { Context } from "../store";
import {logoutUser} from "../store/actions";


const Navbar = () =>  {
  
  const[state, dispatch] = useContext(Context)
  const history = useHistory();
  //const [key, setKey] = useState("");
  const [current, setCurrent] = useState(window.location.pathname)       

  /*useEffect(() => {
      if (window.location) {
        console.log(window.location)
        console.log (window.location.pathname)
        if( current !== window.location.pathname ) {
          setCurrent(window.location.pathname);
        }
      }
  }, [window.location, current]);*/

  const handleClick = (key) => {
      setCurrent(key);

  };

  const Logout = () => {
    dispatch(logoutUser())
    history.push("/login")
  }    

    return (
      <>
        <div className="logo">
          <Link to="/">
            <img className="logo" src="Storagemate.png" alt="ReactLogo" />
          </Link>
        </div>

        <Menu 
          className="navbar"
          theme="dark" 
          mode="horisontal"

          onClick={handleClick}
          selectedKeys={[current]}
          selectable={true}
        >
          {!state.auth.token ?
            <>
              <Menu.Item key="/" icon={<HomeOutlined />}><Link to="/"></Link>
                Home
              </Menu.Item>

              <Menu.Item  key="/storages" icon={<DropboxOutlined />}><Link to="/storages"></Link>
                Storages
              </Menu.Item>
              <Menu.Item  key="/aboutus" icon={<InfoOutlined />}><Link to="/aboutus"></Link>
                About Us
              </Menu.Item>
              <Menu.Item  style={{marginLeft: 'auto',position: 'absolute', top: 0, right: 114}} key="/Login" icon={<UserOutlined />}><Link to="/Login"></Link>
                Login
              </Menu.Item>
              <Menu.Item  style={{marginLeft: 'auto', position: 'absolute', top: 0, right: 0}} key="/Register" icon={<UserOutlined />}><Link to="/Register"></Link>
                Register
              </Menu.Item>
            </>
            :
           
            <>
              <Menu.Item key="/" icon={<HomeOutlined />}><Link to="/"></Link>
                Home
              </Menu.Item>

              <Menu.Item  key="/storages" icon={<DropboxOutlined />}><Link to="/storages"></Link>
                Storages
              </Menu.Item>
              <Menu.Item key="/aboutus" icon={<InfoOutlined />}><Link to="/aboutus"></Link>
                About Us
              </Menu.Item>
              <Menu.Item style={{marginLeft: 'auto', position: 'absolute', top: 0, right: 0}} key="x"><Link to="/" onClick={Logout}>Log out</Link></Menu.Item>
            </>
          }
  
        </Menu>
        
      </>
    );
  
}


export default Navbar;