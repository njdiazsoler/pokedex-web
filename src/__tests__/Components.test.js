import { CustomAlert, CustomCard, PageFooter, TextInputWithButton } from '../components';
import React from 'react';
import { render, screen } from '@testing-library/react';

describe('CustomAlert component test', () => {
  test('test alert component - danger', () => {
    const alertProps = {
      alertMessage: 'This is a test Alert!',
      alertVariant: 'danger',
      dismissible: true,
      handleAlert: () => {},
      showAlert: true,
    };
    render(<CustomAlert {...alertProps} />);
    const alertText = screen.getByText(alertProps.alertMessage);
    expect(alertText).toBeInTheDocument();
  });
  
  test('test alert component - success', () => {
    const alertProps = {
      alertMessage: 'Alert success!',
      alertVariant: 'success',
      dismissible: true,
      handleAlert: () => {},
      showAlert: true,
    };
    render(<CustomAlert {...alertProps} />);
    const alertText = screen.getByText(alertProps.alertMessage);
    expect(alertText).toBeInTheDocument();
  });
});

describe('CustomCard component test', () => {
  test('testing for card name', () => {
    const cardProps = {
      name: 'Test',
      sprites: { front_default: '' },
      types: [{ type: { name: 'type' } }],
    };
    render(<CustomCard cardData={cardProps} />);
    const cardNameText = screen.getByText(cardProps.name);
    expect(cardNameText).toBeInTheDocument();
  });
});

describe('PageFooter component test', () => {
  test('testing for madeByText', () => {
    render(<PageFooter />);
    expect(screen.getByText('Made by Nico Díaz Soler')).toBeInTheDocument();
    expect(screen.getByText('GitHub', { exact: false })).toBeInTheDocument();
  });
});

describe('TextInput component test', () => {
  const textInputProps = {
    buttonText: 'Button',
    onInputChange: () => {},
    placeholder: 'Placeholder',
  };
  render(<TextInputWithButton {...textInputProps} />);
  expect(screen.getByText(textInputProps.buttonText)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(textInputProps.placeholder)).toBeInTheDocument();
});
