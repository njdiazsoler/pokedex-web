import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

const TextInput = (props) => {
  return (
    <InputGroup size="lg" className="m-3 align-items-center">
      <FormControl className='nes-textarea' placeholder="Find Pokémon" aria-label="Find Pokémon" />
      <InputGroup.Append>
        <Button className='nes-btn' id="basic-addon2">Find</Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default TextInput;
