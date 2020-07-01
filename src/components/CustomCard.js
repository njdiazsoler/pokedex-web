import React from 'react';
import { Card, Image, Spinner } from 'react-bootstrap';
import UIUtils from '../utils/ui';

const CustomCard = (props) => {
  const { cardData } = props;
  const { name, sprites, types } = cardData;
  return (
    <Card className="pokedex-card px-1 py-2 align-item-center">
      <p>{`${UIUtils.capitalizeString(name)}`}</p>
      <div className='d-flex flex-row'>
        {sprites ? <Image rounded style={{ height: 100, width: 100 }} src={sprites && sprites.front_default} /> : <Spinner animation="border" />}
        <div>{types && types.map(type => <p key={type.type.name}>{UIUtils.capitalizeString(type.type.name)}</p>)}</div>
      </div>
    </Card>
  );
};

export default CustomCard;