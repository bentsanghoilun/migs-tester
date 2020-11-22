//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button';
import React, { useState, useRef, useEffect } from 'react';
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';
import axios from 'axios';
import TestModule from './TestModule';

function App () {
  
  const defCardcolor = "ccc";
  const actCardcolor = "46f";
  const [isVisa, setisVisa] = useState(defCardcolor);
  const [isMc, setisMc] = useState(defCardcolor);
  const [isAmex, setisAmex] = useState(defCardcolor);
  const [cardnumValue, setcardnumValue] = useState("");
  const [expValue, setexpValue] = useState("");

  const expRef = useRef(null);
  const cvvRef = useRef(null);

  var md5 = require('md5');
  var orderID = md5(Math.random()*999);
  

  const updateCardNum = (value) => {
    if(value !== ""){
      let cleanNum = value.replace(/-/g,"");
      if(cleanNum[0] === "2" || cleanNum[0] === "5"){
        setisMc(actCardcolor);
      }else{
        setisMc(defCardcolor);
      }
      if(cleanNum[0] === "4"){
        setisVisa(actCardcolor);
      }else{
        setisVisa(defCardcolor);
      }
      if(cleanNum[0] === "3"){
        setisAmex(actCardcolor);
      }else{
        setisAmex(defCardcolor);
      }
      if(cleanNum.length > 16){
        cleanNum = cleanNum.slice(0,16);
      }
      let newNum = cleanNum.match(new RegExp('.{1,4}', 'g')).join("-");
      setcardnumValue(newNum);

      if(cleanNum.length === 16){
        console.log("reached 16");
        expRef.current.focus();
      }
    }else{
      setcardnumValue("");
    }
  };

  const updateExp = (value) => {
    if(value !== ""){
      let cleanExp = value.replace(/\//g, "");
      let newExp = cleanExp.match(new RegExp('.{1,2}', 'g')).join("/");
      setexpValue(newExp);
      if(cleanExp.length === 4){
        cvvRef.current.focus();
      }
    }else{
      setexpValue("");
    }
  };

  //Use effect for post to MIGS
  useEffect(() => {

  }, []);

  //post to MIGS handler
  const makePay = () => {
    const nvp = {
      vpc_Version: "1",
      vpc_Command: "pay",
      vpc_AccessCode: process.env.vpc_AccessCode,
      vpc_MerchTxnRef: orderID,
      vpc_OrderInfo: orderID,
      vpc_Merchant: process.env.vpc_Merchant,
      vpc_Amount: "100",
      vpc_CardNum: "4434260000000008",
      vpc_CardExp: "2105",
      vpc_CardSecurityCode: "100",
    };
    const headers = {
      "Access-Control-Allow-Origin": "*"
    }

    axios.post('https://migs.mastercard.com.au/vpcpay', nvp, {
      headers: headers,
      crossDomain: true,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <Container>
      <Row className="header">
        <Col>
        <img className="logo" src="https://s21.q4cdn.com/254933054/files/images/GlobalPayments_Symbol_Wordmark_REV.png" alt="Global Payments"/>
        </Col>
        <Col style={{
          justifyContent: "flex-end"
        }}>
          <h2>MiGS Payment</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form className="pay-form">
            <Row>
              <Col className="">
                <h4>ABC Shoe Online</h4>
                <p>Nike Airforce I - NAK edtion 2002</p>
                <br/>
                <h3
                  style={{
                    background:"#ddd",
                    padding: "12px",
                    borderRadius: "6px",
                  }}
                >USD $20.00</h3>
                <br></br>
              </Col>
            </Row>

            <br></br>
            <h4>Billing Details</h4>
            <Form.Group controlId="name">
              <Form.Control size="lg" type="text" placeholder="Name on Card" />
            </Form.Group>

            <Form.Group controlId="cardNum">
            <FaCcVisa className="cardtype" style={{color: isVisa}}/>
            <FaCcMastercard className="cardtype" style={{color: isMc}}/>
            <FaCcAmex className="cardtype" style={{color: isAmex}}/>
              <Form.Control size="lg" type="tel" inputMode="number" placeholder="0000-0000-0000-0000" 
                value={cardnumValue}
                onChange={e => updateCardNum(e.target.value)}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="exp">
                  <Form.Control size="lg" type="tel" inputMode="number" 
                    placeholder="MM/YY" 
                    ref={expRef}
                    onChange={e => updateExp(e.target.value)}
                    value={expValue}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="cvv">
                  <Form.Control size="lg" type="tel" inputMode="number" 
                    placeholder="CVV" 
                    ref={cvvRef}
                  />
                </Form.Group>
              </Col>
            </Row>

            <br></br>
            <Button 
              variant="primary" 
              size="lg" 
              block
              onClick = {makePay}
            >PAY NOW</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default App;
