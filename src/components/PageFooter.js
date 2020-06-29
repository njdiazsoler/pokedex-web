import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const PageFooter = (props) => {
  return (
    <Container className="footer-container">
      <Row className="separator" />
      <Row className="pt-2">
        <Col className="d-flex flex-column justify-content-center" >
          <p className="m-0">Made by Nico Díaz Soler</p>
        </Col>
        <Col 
          className="d-flex flex-row-reverse align-items-center">
          <div className="mx-1">
            <a href="https://github.com/njdiazsoler" rel="noopener noreferrer" target="_blank">
              Github
            </a>
          </div>
          <i className="nes-ash is-small" />
        </Col>
      </Row>
    </Container>
  );
};

export default PageFooter;
