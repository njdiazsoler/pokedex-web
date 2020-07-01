import React from 'react';
import { Card, Image, Spinner } from 'react-bootstrap';
import UIUtils from '../utils/ui';

const CustomCard = (props) => {
  const { cardData, onClick} = props;
  const { id, name, sprites, types } = cardData;
  return (
    <Card onClick={onClick} className="nes-btn d-flex px-1 py-2 align-item-center">
      <p className='mb-0 text-nowrap'>{`#${id} ${UIUtils.capitalizeString(name)}`}</p>
      <div className='d-flex flex-row justify-content-around align-items-center'>
        {sprites && <Image alt={name} onLoad={() => <Spinner animation="border" />} rounded src={sprites && sprites.front_default} />}
        <div>{types && types.map(type => <p key={type.type.name}>{UIUtils.capitalizeString(type.type.name)}</p>)}</div>
      </div>
    </Card>
  );
};

export default CustomCard;