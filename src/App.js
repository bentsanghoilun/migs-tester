//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'; 
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function App() {
  var md5 = require('md5');
  return (
    <Container>
      <Row>
        <Col>
        <br></br>
        <img src="https://cdn-gx.dataweavers.io/-/media/global-payments/images/shared/globalpayments_wordmark_blue.png?modified=20180405212244&h=26&w=175&la=en&hash=935077B14C77B5A176B8A564A8720943"/>
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
              <Form.Control size="lg" type="text" placeholder="Order ID" value={md5(Math.random()*999)}/>
            </Form.Group>

            <Form.Group controlId="currency">
              <Form.Label>Currency</Form.Label>
              <Form.Control size="lg" type="text" as="select">
              <option>HKD</option>
              <option>GBP</option>
              <option>USD</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <InputGroup size="lg" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control aria-label="Amount (to the nearest dollar)" />
              </InputGroup>
            </Form.Group>

            <br></br>
            <h4>Billing Details</h4>
            <Form.Group controlId="name">
              <Form.Control size="lg" type="text" placeholder="Name on Card" />
            </Form.Group>

            <Form.Group controlId="cardNum">
              <Form.Control size="lg" type="text" placeholder="0000-0000-0000-0000" />
            </Form.Group>

            <Form.Group controlId="exp">
              <Form.Control size="lg" type="text" placeholder="MM/YY" />
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
