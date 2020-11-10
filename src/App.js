//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'; 
import InputGroup from 'react-bootstrap/InputGroup';
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
  const [sign, setSign] = useState("$");
  const [isVisa, setisVisa] = useState(defCardcolor);
  const [isMc, setisMc] = useState(defCardcolor);
  const [isAmex, setisAmex] = useState(defCardcolor);
  const [cardnumValue, setcardnumValue] = useState("");

  const expRef = useRef(null);
  const amountRef = useRef(null);

  useEffect(() => {
    amountRef.current.focus();
  }, []);

  const updateCardNum = (value) => {
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
  };

  return (
    <Container>
      <Row>
        <Col>
        <br></br>
        <img src="https://cdn-gx.dataweavers.io/-/media/global-payments/images/shared/globalpayments_wordmark_blue.png?modified=20180405212244&h=26&w=175&la=en&hash=935077B14C77B5A176B8A564A8720943" alt="Global Payments"/>
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

            <Form.Group controlId="currency">
              <Form.Label>Currency</Form.Label>
              <Form.Control size="lg" type="text" as="select" id="currencySelect" onChange={e => setSign(e.target.value[0])}>
              {
                currencies.map(
                  currency => (<option value={currency.sign+" "+currency.currency}>{currency.currency}</option>)
                )
              }
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <InputGroup size="lg" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>{sign}</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control aria-label="Amount (to the nearest dollar)" ref={amountRef}/>
              </InputGroup>
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
              <Form.Control size="lg" type="text" inputmode="number" placeholder="0000-0000-0000-0000" 
                value={cardnumValue}
                onChange={e => updateCardNum(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="exp">
              <Form.Control size="lg" type="text" inputmode="number" placeholder="MM/YY" ref={expRef}/>
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
