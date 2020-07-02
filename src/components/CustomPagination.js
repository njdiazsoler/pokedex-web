import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row } from 'react-bootstrap';

const CustomPagination = (props) => {
  const { handlePageChange, isLastPage, offset } = props;
  return (
    <Row className='custom-pagination-row'>
      <Button onClick={() => handlePageChange()} className={offset === 0 ? "nes-btn is-disabled" : "nes-btn" }>{'<'}</Button>
      <Button onClick={() => handlePageChange('right')} className={isLastPage ? "nes-btn is-disabled" : "nes-btn" }>{'>'}</Button>
    </Row>
  );
};

CustomPagination.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired
};

export default CustomPagination;
