import React from 'react';
import { Jumbotron, Row, Col, Container } from 'react-bootstrap';
import Layout from "../../components/layout";
import './style.css';
import { NavLink } from 'react-router-dom';

/**
* @author
* @function Home
**/

const Home = (props) => {
  return(
    <Layout>
    <Container fluid>
      <Row>
        <Col md={2} className="sidebar">
          <ul>
            <li> <NavLink to={`/`}>Home</NavLink> </li>
            <li> <NavLink to={`/products`}>Products</NavLink> </li>
            <li> <NavLink to={`/orders`}>Orders</NavLink> </li>
            
          </ul>
        </Col>
        <Col md={10} style={{ marginLeft: "auto"}}>continer</Col>
        </Row>
    </Container>
      



      {/* <Jumbotron className="text-center" style={{margin: '5rem', background: "#fff"}}>
        <h1>
          Welcome To Dashboard
        </h1>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        </p>
      </Jumbotron> */}
    </Layout>
   )

 }

export default Home