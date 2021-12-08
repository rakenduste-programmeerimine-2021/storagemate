import React from "react";
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn } from "react-scroll-motion";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import "./Home.css";
import { Row, Col } from 'antd';
import { DropboxCircleFilled, MailFilled, PhoneFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useHistory } from "react-router-dom";
import ReactPlayer from 'react-player';
import CurvedArrow from "react-curved-arrow";


const content = [
	{
		title: 'Security',
		description:
		'Cheap and reasonable prices for maximum security.',
		image: 'https://image.freepik.com/free-vector/cloud-computing-security-abstract-concept-illustration_335657-2105.jpg',
	},
	{
		title: 'Fast and easy reservation system',
		description:
		'On storagemate you can make reservations any time.',
		image: 'https://image.freepik.com/free-vector/woman-booking-appointment-calendar_23-2148562875.jpg',
	},
	{
		title: 'Manage your storageses',
		description:
		'Manage your storageses with few simple steps.',
		image: 'https://image.freepik.com/free-vector/team-leader-managing-project_1262-21430.jpg',
	}
];




function Home() {
  

  const history = useHistory();

  return (
    <div style={{ backgroundImage:"url(/storageunsplash.jpg)",backgroundRepeat:"no-repeat",backgroundSize:"cover", 
    minHeight:600,display:"block", margin: -24,
    }}>
      <div style={{padding: 24}}>
        <h1  style={{textAlign:"center"}}>
          <ScrollContainer>
            <ScrollPage page={0}>
              <Animator animation={MoveOut(400, 0)}>
                <span style={{ fontSize: "3.5em", color: "#4169e1"}}> Welcome to storagemate </span>
                <div><span style={{ fontSize: "1cm",textAlign:"center", fontWeight: 'bold', color: "#4169e1"}}> Store your excess belongings securely at storagemate warehouses! </span></div>
                <div><span style={{ fontSize: "1cm",textAlign:"center", fontWeight: 'bold', color: "#4169e1"}}> We provide you with space you need and best locations. </span></div>
                <div  className='player-wrapper' style={{marginTop: 50}}>

                <div className="Arrow">
                <div className="from" />
                <div className="to" />
                <CurvedArrow color="#4169e1" fromSelector=".to" toSelector=".from" middleY={120} />
                </div>
                <div  style={{Width:"200px", height:"200px", float:"right", fontSize: "0.8cm", fontWeight: 'bold', color: "#4169e1"}}>
                <h1 style={{ float:"right", fontSize: "1cm", fontWeight: 'bold', color: "#4169e1"}}> See our short promo video </h1>            
              </div>
                <div>
               <ReactPlayer  playing url='videos/promovideo.mp4'
                width='60%'
                height='50%'
                controls='false'
                loop="true">
              </ReactPlayer>
              </div>
              </div>
              </Animator>
            </ScrollPage>
          </ScrollContainer>

          <div style={{display:"block", margin: -24, marginBottom: -36, paddingTop:100, background: "white" }}>   
          <Slider autoplay={1400}>
            {content.map((item, index) => (
              <div>
              <h1 style={{ fontSize: "0.8cm", fontWeight: 'bold', textAlign:"center", backgroundColor: 'white', color: "#4169e1"}}>{item.title}
              <p style={{ fontSize: "0.6cm", fontWeight: 'bold', textAlign:"center", backgroundColor: 'white', color: "black"}}>{item.description}</p>
              <h1
                key={index}
                style={{ background: `url('${item.image}') no-repeat `,minHeight:600,  backgroundSize:"fit" }}
              >
              </h1>
              </h1>
              </div>
              ))}
          </Slider>
          <Row style={{backgroundColor: 'white',minHeight: 400}}>
            <Col span={8}>
              <PhoneFilled  style={{ fontSize: '30px', color: '#4169e1', marginTop:130 }}/>
              <h1 style={{color: "#4169e1", fontSize: "0.5cm", fontWeight: 'bold', letterSpacing:"0.1cm" }}>PHONE CALL US</h1>
              <div style={{ fontSize: "0.4cm", color: "black" }}>Our proffesional staff is always open for your calls and willing to help!</div>
              <Button onClick={() => { history.push('/aboutus')}} style={{ width: 120}} type="primary" block>
                Go now
              </Button>
            </Col>

            <Col span={8} >
              <MailFilled  style={{ fontSize: '30px', color: '#4169e1', marginTop:130 }}/>
              <h1 style={{color: "#4169e1", fontSize: "0.5cm", fontWeight: 'bold', letterSpacing:"0.1cm" }}>WRITE TO US</h1>
              <div style={{ fontSize: "0.4cm", color: "black" }}>Write to us today. Our staff will find you the best solutions just for you!</div>
              <Button onClick={() => { history.push('/aboutus')}} style={{ width: 120}} type="primary" block>
                Go now
              </Button>
            </Col>

            <Col span={8} >
              <DropboxCircleFilled  style={{ fontSize: '30px', color: '#4169e1', marginTop:130 }}/>
              <h1 style={{color: "#4169e1", fontSize: "0.5cm", fontWeight: 'bold', letterSpacing:"0.1cm" }}>MAKE AN STORAGE RESERVATION</h1>
              <div style={{ fontSize: "0.4cm", color: "black" }}>Make an reservation for storage today!</div>
              <Button onClick={() => { history.push('/storages')}} style={{ width: 120}} type="primary" block>
                Go now
              </Button>
            </Col>
          </Row>
          </div>
        </h1>
    </div>
   </div>
   
   
   
    )
}

export default Home;
