import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';


const Login = ({ onLogin }) => {
    // Style
    const custom_font_size = {
        "fontSize": "1.25rem" ,
        "margin":0
      }
      

  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(name);
  };

  return (
    <Container className='p-3'>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3 align-items-center">
          <Col md={2} className='align-items-center'>
            <Form.Label className="fw-bold " style={custom_font_size}>Name:</Form.Label>
          </Col>
          <Col md={10}>
            <Form.Control 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter your name" 
              className="custom-font-size"
              style={custom_font_size}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" type="submit">Login</Button>
          </Col>
        </Row>
      </Form>
      
    </Container>
    
  );
};

export default Login;
