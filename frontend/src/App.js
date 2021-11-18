import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import Greeting from "./pages/Greeting";
import 'antd/dist/antd.css';
import "./App.css";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";



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
              <Route exact path="/Greeting" component={Greeting} />
              <Route exact path="/Register" component={Register} />
              <Route exact path="/Login" component={Login} />
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