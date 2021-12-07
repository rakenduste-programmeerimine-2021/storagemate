import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import "./App.css";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import Home from "./pages/Home";
import Storages from "./pages/Storages";
import AboutUs from "./pages/AboutUs";
import Reservation from "./pages/Reservation";
import AdminHome from "./pages/AdminHome";
import MyProfile from "./pages/MyProfile";
import ProfileEdit from "./pages/ProfileEdit";
import PasswordEdit from "./pages/PasswordEdit";
import EditStorage from "./pages/EditStorage";
import NewStorageAdd from "./pages/NewStorageAdd";
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'



const { Header, Footer, Content } = Layout;

function App() {
  return (

    <BrowserRouter>
      <Layout>
        <Header className= "header">
          <Route path="/" component={Navbar}/>
        </Header>
        <Content style={{ padding: ' 50px'  }}>
          <div className="site-layout-content">

            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/adminlogin" component={AdminLogin} />
              <Route exact path="/" component={Home} />
              <Route exact path="/storages" component={Storages} />
              <Route exact path="/aboutus" component={AboutUs} />
              <PrivateRoute exact path="/reservation" component={Reservation} />
              <AdminRoute exact path="/adminhome" component={AdminHome} />
              <PrivateRoute path="/myprofile" component={MyProfile} />
              <PrivateRoute exact path="/profileedit" component={ProfileEdit} />
              <PrivateRoute exact path="/passwordedit" component={PasswordEdit} />
              <AdminRoute exact path="/editstorage" component={EditStorage} />
				      <AdminRoute exact path="/newstorageadd" component={NewStorageAdd} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'Center' }}> Rakenduste programmeerimine 2021 projekt
        </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;