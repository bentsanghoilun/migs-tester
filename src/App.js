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

var md5 = require('md5');
var orderID = md5(Math.random()*999);

function App () {
  const currencies = [
    {
      currency: 'HKD',
      sign: '$',
    },
    {
      currency: 'GBP',
      sign: '£',
    },
    {
      currency: 'USD',
      sign: '$',
    },
  ];
  const defCardcolor = "ccc";
  const actCardcolor = "46f";
  const [isVisa, setisVisa] = useState(defCardcolor);
  const [isMc, setisMc] = useState(defCardcolor);
  const [isAmex, setisAmex] = useState(defCardcolor);
  const [cardnumValue, setcardnumValue] = useState("");
  const [expValue, setexpValue] = useState("");

  const expRef = useRef(null);
  const amountRef = useRef(null);

  useEffect(() => {
    amountRef.current.focus();
  }, []);

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
    }else{
      setexpValue("");
    }
  };

  return (
    <Container>
      <Row>
        <Col>
        <br></br>
        <img className="logo" src="https://s21.q4cdn.com/254933054/files/images/GlobalPayments_Symbol_Wordmark_REV.png" alt="Global Payments"/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form className="pay-form">
            <h2>Migs Testing Tool</h2>
            <br></br>
            <h4>Payment Details</h4>
            <Form.Group controlId="orderID">
              <Form.Label>Order ID</Form.Label>
              <Form.Control size="lg" type="text" placeholder="Order ID" value={orderID}/>
            </Form.Group>

            <Form.Group controlId="amount">
              <Row>
                <Col>
                  <Form.Label>Amount</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col className="col-5 col-sm-3">
                  <Form.Control 
                    size="lg" 
                    type="text" 
                    as="select" 
                    id="currencySelect" 
                  >
                    {
                      currencies.map(
                        currency => (<option value={currency.sign+" "+currency.currency}>{currency.currency}</option>)
                      )
                    }
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Control size="lg" aria-label="Amount (to the nearest dollar)" ref={amountRef}/>
                </Col>
              </Row>
            </Form.Group>

            <br></br>
            <h4>Billing Details</h4>
            <Form.Group controlId="name">
              <Form.Control size="lg" type="text" placeholder="Name on Card" />
            </Form.Group>

            <Form.Group controlId="cardNum">
            <FaCcVisa className="cardtype" style={{color: isVisa}}/>
            <FaCcMastercard className="cardtype" style={{color: isMc}}/>
            <FaCcAmex className="cardtype" style={{color: isAmex}}/>
              <Form.Control size="lg" type="tel" inputmode="number" placeholder="0000-0000-0000-0000" 
                value={cardnumValue}
                onChange={e => updateCardNum(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="exp">
              <Form.Control size="lg" type="tel" inputmode="number" 
                placeholder="MM/YY" 
                ref={expRef}
                onChange={e => updateExp(e.target.value)}
                value={expValue}
              />
            </Form.Group>

            <br></br>
            <Button variant="primary" type="submit" size="lg" block>PAY NOW</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default App;
