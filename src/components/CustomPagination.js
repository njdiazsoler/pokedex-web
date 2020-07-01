import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

const CustomPagination = (props) => {
  const { activePage, limit, total } = props;
  const maxPages = Math.floor(total/limit);
  const items = [];
  if (maxPages === 1) {
    items.push(
      <Pagination.Item key={maxPages} active={true}>
        {maxPages}
      </Pagination.Item>
    );
  } else {
    for (let i = 1; i <= maxPages; i++) {
      if(i>5){
        items.push(<Pagination.Ellipsis />);
        break
      }
      items.push(
        <Pagination.Item key={i} active={i === activePage}>
          {i}
        </Pagination.Item>
      );
    }
  }
  return <Pagination size="sm">{items}</Pagination>;
};

CustomPagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
}

export default CustomPagination;
