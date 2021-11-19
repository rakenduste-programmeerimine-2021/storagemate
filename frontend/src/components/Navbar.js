import React, {useContext, useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { useHistory } from "react-router-dom";
import { Menu } from 'antd';
import { UserOutlined, DropboxOutlined, HomeOutlined, InfoOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
import "./Navbar.css";
import { Context } from "../store";
import {logoutUser} from "../store/actions";


const Navbar = () =>  {
  /* state = {
    current: 'user',
  };
 */
  const[state, dispatch] = useContext(Context)
  const history = useHistory();
  const [key, setKey] = useState("");
  const [current, setCurrent] = useState(window.location.pathname)       

  useEffect(() => {
      if (window.location) {
          if( current !== window.location.pathname ) {
              setCurrent(window.location.pathname);
          }
      }
  }, [window.location, current]);

  const handleClick = ({ _item, key, _keyPath, _domEvent }) => {
      setCurrent(key);

  };

  const Logout = () => {
    dispatch(logoutUser())
    history.push("/login")
  }    




  /* handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  }; */

/*   return {
    const { current } = this.state; */
    return (
      <><div className="logo">
        <Link to="/">
          <img className="logo" src="logo192.png" alt="ReactLogo" />
        </Link>

      </div><Menu theme="dark" mode="horisontal" onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <div className="menumain">
            <Menu.Item key="/greeting" icon={<HomeOutlined />}><Link to="/Greeting"></Link>
              Home
            </Menu.Item>

            <Menu.Item key="/greeting" icon={<DropboxOutlined />}><Link to="/Greeting"></Link>
              Storages
            </Menu.Item>
            <Menu.Item key="/greeting" icon={<InfoOutlined />}><Link to="/Greeting"></Link>
              About Us
            </Menu.Item>
          </div>

          {!state.auth.token ?
            <div className="logreg">
              <Menu.Item key="/login" icon={<UserOutlined />}><Link to="/Login"></Link>
                Login
              </Menu.Item>
              <Menu.Item key="/register" icon={<UserOutlined />}><Link to="/Register"></Link>
                Register
              </Menu.Item>
            </div>
            :
            <div className="logreg">
              <Menu.Item key="x"><Link to="/login" onClick={Logout}>Log out</Link></Menu.Item>
            </div>
          }
  
        </Menu>
        </>
    );
  
}


export default Navbar;