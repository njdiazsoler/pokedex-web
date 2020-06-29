import React, { Component } from 'react';
import { Pokedex } from 'pokeapi-js-wrapper';
import { CustomAlert, CustomCard, PageFooter, TextInputWithButton } from './components';
import { Col, Container, Fade, Row } from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVariant: 'success',
      alertMessage: '',
      isAlertShown: false,
      isLoadingData: true,
      pokemon: [],
      searchValue: '',
      windowHeight: 0,
    };
  }

  getAllPokemon = async (name) => {
    const P = new Pokedex();
    try {
      const poke = await P.getPokemonsList({ limit: 50 });
      this.setState({ pokemonData: poke.results, pokemon: poke.results, searchValue: 'bul' });
    } catch (err) {
      this.setState({ showAlert: true, alertMessage: err.message, alertVariant: 'danger' });
    } finally {
      this.setState({ isLoadingData: false });
    }
  };

  componentDidMount() {
    this.getAllPokemon();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  handleInputChange = (e) => {
    const { value } = e.target;

    this.setState((prevState, state) => {
      const { pokemonData } = prevState;
      const filteredPoke = pokemonData.filter((poke) => poke.name.match(value));
      return { searchValue: value, pokemon: filteredPoke };
    });
  };

  updateWindowDimensions = () => {
    this.setState({ windowHeight: window.innerHeight });
  };

  render() {
    const { pokemon, windowHeight } = this.state;
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
          <h3 className="py-3">Pokémon Finder</h3>
          <Row className="m-2">
            <TextInputWithButton buttonText="Find" onInputChange={this.handleInputChange} placeholder="Find Pokémon" />
          </Row>
          <Row 
            style={{ height: parseInt(`${windowHeight * 0.65}`, 10), overflowY: 'overlay' }} 
            className="m-2 nes-container">
            {pokemon.length > 0 &&
              pokemon.map((poke) => (
                <Col className="p-1" lg={3} md={4}>
                  <CustomCard cardData={poke} />
                </Col>
              ))}
          </Row>
          <PageFooter />
        </Container>
      </Fade>
    );
  }
}

export default App;
