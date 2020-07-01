import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const PageFooter = () => {
  return (
    <Container>
      <Row className="pt-2">
        <Col className="d-flex flex-row" >
          <p className="m-0">Made by Nico Díaz Soler</p>
          {/* <i className="nes-ash is-small" /> */}
        </Col>
        <Col 
          className="d-flex flex-row-reverse align-items-center flex-wrap justify-content-center">
          <div className="mx-1">
            <a href="https://github.com/njdiazsoler" rel="noopener noreferrer" target="_blank">
              <p className='m-0'>
              Github
              </p>
            </a>
          </div>
          <i className="nes-icon github is-small" />
        </Col>
      </Row>
    </Container>
  );
};

export default PageFooter;
