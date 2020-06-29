import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const PageFooter = (props) => {
  return (
    <Container className='footer-container'>
      <Row className="separator" />
      <Row>
        <Col md={3}>Made by Nico Díaz Soler</Col>
        <Col md={{offset: 6, span: 3}} className='d-flex align-items-center'>
          <i className="nes-ash is-small" />
          <div className='mx-1'>
          <a href="https://github.com/njdiazsoler" rel='noopener noreferrer' target="_blank">
            Github
          </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PageFooter;
