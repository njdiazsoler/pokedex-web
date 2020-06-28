import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CustomAlert = (props) => {
  const { alertMessage, alertVariant, dismissible, handleAlert, showAlert } = props;
  console.log(props);
  return (
    <Alert 
      dismissible={dismissible} 
      onClose={() => handleAlert(false)} 
      show={showAlert} 
      variant={alertVariant}>
      {alertMessage}
    </Alert>
  );
};

CustomAlert.propTypes = {
  alertMessage: PropTypes.string.isRequired,
  alertVariant: PropTypes.string.isRequired,
  dismissisble: PropTypes.bool,
  showAlert: PropTypes.bool,
  handleAlert: PropTypes.func.isRequired,
}

CustomAlert.defaultProps = {
  dismissible: true,
  showAlert: false,
}

export default CustomAlert;
