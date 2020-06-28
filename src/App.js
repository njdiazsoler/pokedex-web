import React, { Component } from 'react';
import { Pokedex } from 'pokeapi-js-wrapper';
import { CustomAlert, TextInput } from './components';
import { Container, Fade, Row } from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVariant: 'success',
      alertMessage: '',
      isAlertShown: false,
      isLoadingData: true,
      pokemon: null,
      searchValue: '',
    };
  }

  getAllPokemon = async (name) => {
    const P = new Pokedex();
    try {
      const poke = await P.getPokemonsList();
      console.log('poke is: ', poke);
      this.setState({ pokemon: poke, searchValue: 'bul' });
      return;
    } catch (err) {
      this.setState({ showAlert: true, alertMessage: err.message, alertVariant: 'danger' });
    } finally {
      this.setState({ isLoadingData: false });
    }
  };

  componentDidMount() {
    this.getAllPokemon();
  }

  render() {
    return (
      <Fade in={!this.state.isLoadingData}>
        <Container>
          <CustomAlert
            alertMessage={this.state.alertMessage}
            alertVariant={this.state.alertVariant}
            dismissible={this.state.dismissible}
            handleAlert={(value) => this.setState({ isAlertShown: value })}
            showAlert={this.state.isAlertShown}
          />
          <Row>
            <TextInput />
          </Row>
        </Container>
      </Fade>
    );
  }
}

export default App;
