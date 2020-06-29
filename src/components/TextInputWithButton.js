import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

const TextInputWithButton = (props) => {
  const { buttonText, onInputChange, placeholder } = props;
  return (
    <InputGroup size="lg" className="align-items-center">
      <FormControl onChange={onInputChange} className="nes-textarea" placeholder={placeholder}/>
      <InputGroup.Append>
        <Button className="nes-btn" id="basic-addon2">
          {buttonText}
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

TextInputWithButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default TextInputWithButton;
