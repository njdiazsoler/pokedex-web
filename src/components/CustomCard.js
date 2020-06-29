import React from 'react';
import { Card } from 'react-bootstrap';

const CustomCard = props => {
  const { name } = props.cardData;
  return(<Card className='pokedex-card px-1 py-2'>
    <p>{`${name.charAt(0).toUpperCase()}${name.slice(1)}`}</p>
  </Card>)
}

export default CustomCard;