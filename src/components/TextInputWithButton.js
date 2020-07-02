import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

const TextInputWithButton = (props) => {
  const { buttonText, onButtonClick, onInputChange, placeholder } = props;
  return (
    <InputGroup size="sm" className="align-items-center mx-3">
      <FormControl onChange={onInputChange} className="nes-container is-rounded mx-0" placeholder={placeholder}/>
      <InputGroup.Append>
        <Button onClick={onButtonClick} className="nes-btn" id="basic-addon2">
          {buttonText}
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

TextInputWithButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func,
  onInputChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
}

TextInputWithButton.defaultProps = {
  onButtonClick: () => {},
}

export default TextInputWithButton;
