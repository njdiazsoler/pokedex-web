import React, { Component } from 'react';
import { CustomAlert, CustomCard, PageFooter, TextInputWithButton } from './components';
import { CardGroup, Col, Container, Fade, Row } from 'react-bootstrap';
import ApiService from './services/api';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVariant: '',
      alertMessage: '!',
      isAlertShown: false,
      isLoadingData: true,
      pokemon: [],
      pokemonData: [],
      searchValue: '',
      windowHeight: 0,
      limit: props.limit || 25,
      offset: props.offset || 0,
    };
  }

  getFirstPokemonData = async () => {
    const { limit, offset } = this.state;
    const queryOptions = { limit, offset };
    try {
      const pokeList = await ApiService.getAllPokemon(queryOptions);
      const result = [];
      for (let i = 0; i < pokeList.results.length; i++) {
        const poke = pokeList.results[i];
        const pokeData = await ApiService.getOnePokemonByName(poke.name);
        result.push(pokeData);
      }
      this.setState({ pokemonData: pokeList.results, pokemon: result });
    } catch (err) {
      this.setState({ showAlert: true, alertMessage: err.message, alertVariant: 'danger' });
    } finally {
      this.setState({ isLoadingData: false });
    }
  };

  componentDidMount() {
    this.getFirstPokemonData();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  handleInputChange = async (e) => {
    const { value } = e.target;
    const { pokemonData } = this.state;
    const filteredPoke = pokemonData.filter((poke) => poke.name.match(value));
    const resultPoke = [];
    for (let i = 0; i < filteredPoke.length; i++) {
      const poke = filteredPoke[i];
      const pokeData = await ApiService.getOnePokemonByName(poke.name);
      resultPoke.push(pokeData);
    }
    if (value.length > 3) {
      this.setState({ searchValue: value, pokemon: resultPoke });
    } else {
      this.setState({ pokemon: pokemonData });
    }
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
          <Row className="my-2">
            <TextInputWithButton buttonText="Find" onInputChange={this.handleInputChange} placeholder="Find Pokémon" />
          </Row>
          <CardGroup style={{ height: parseInt(`${windowHeight * 0.69}`, 10), overflowY: 'overlay' }} className="my-2 nes-container is-rounded mx-0">
            {pokemon.length > 0 &&
              pokemon.map((poke) => (
                <Col key={poke.name} className="p-1" lg={3} md={4}>
                  <CustomCard cardData={poke} />
                </Col>
              ))}
          </CardGroup>
          {/* TO DO - Pagination 
          <Row className="nes-container is-rounded mx-0 my-2">
            <PageFooter />
          </Row> */}
          <Row className="nes-container is-rounded mx-0 my-3">
            <PageFooter />
          </Row>
        </Container>
      </Fade>
    );
  }
}

export default App;
