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

const TestModule = props =>{
    var md5 = require('md5');
    var orderID = md5(Math.random()*999);
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
      const amountRef = useRef(null);
  useEffect(() => {
    amountRef.current.focus();
  }, []);
    return(
        <React.Fragment>
            <h4>Payment Details</h4>
            <Form.Group controlId="orderID">
              <Form.Label>Order ID</Form.Label>
              <Form.Control size="lg" type="text" placeholder="Order ID" defaultValue={orderID}/>
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
                  >
                    {
                      currencies.map(
                        currency => (<option key={currency.currency} value={currency.sign+" "+currency.currency}>{currency.currency}</option>)
                      )
                    }
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Control size="lg" aria-label="Amount (to the nearest dollar)" ref={amountRef}/>
                </Col>
              </Row>
            </Form.Group>
        </React.Fragment>
    )
}

export default TestModule;