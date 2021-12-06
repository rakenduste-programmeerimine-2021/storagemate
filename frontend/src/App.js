import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import Greeting from "./pages/Greeting";
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
//import { Context } from "./store";


const { Header, Footer, Content } = Layout;

function App() {
  //const [state, dispatch] = useContext(Context);



  /* function requireAuth() {
    if (state.auth.token == null) {
      Redirect to= "/login"
    }
    
  }
   */
{/* <Route exact path="/">
  {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
</Route> */}



  return (

    <BrowserRouter>
      <Layout>
        <Header className= "header">
          <Route path="/" component={Navbar}/>
        </Header>
        <Content style={{ padding: ' 50px'  }}>
          <div className="site-layout-content">

            <Switch>
              <Route exact path="/Greeting" component={Greeting} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/adminlogin" component={AdminLogin} />
              <Route exact path="/" component={Home} />
              <Route exact path="/storages" component={Storages} />
              <Route exact path="/aboutus" component={AboutUs} />
              <Route exact path="/reservation" component={Reservation} />
              <Route exact path="/adminhome" component={AdminHome} />
              <Route path="/myprofile" component={MyProfile} />
              {/* <Route path="/myprofile" /> {state.auth.token? {MyProfile} : <Redirect to="/login"/>} <Route/> */} 
              <Route exact path="/profileedit" component={ProfileEdit} />
              <Route exact path="/passwordedit" component={PasswordEdit} />
              <Route exact path="/editstorage" component={EditStorage} />
              <Route exact path="/newstorageadd" component={NewStorageAdd} />

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