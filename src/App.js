import React, { Component } from 'react';
import { CustomAlert, CustomCard, CustomPagination, PageFooter, TextInputWithButton } from './components';
import { Button, CardGroup, Col, Container, Fade, Modal, Row } from 'react-bootstrap';
import UIUtils from './utils/ui'
import ApiService from './services/api';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      alertVariant: '',
      alertMessage: '',
      isAlertShown: false,
      isLoadingData: true,
      limit: props.limit || 20,
      offset: props.offset || 0,
      pokemon: [],
      pokemonData: [],
      searchValue: '',
      showInfoModal: false,
      totalCount: 0,
      windowHeight: 0,
    };
  }

  getFirstPokemonData = async () => {
    const { limit, offset } = this.state;
    const queryOptions = { limit, offset };
    try {
      const apiResponse = await ApiService.getAllPokemon(queryOptions);
      const result = [];
      for (let i = 0; i < apiResponse.results.length; i++) {
        const pokemon = apiResponse.results[i];
        const pokemonData = await ApiService.getOnePokemonByName(pokemon.name);
        result.push(pokemonData);
      }
      this.setState({ totalCount: apiResponse.count, pokemonData: result, pokemon: result });
    } catch (err) {
      this.setState({ showAlert: true, alertMessage: err.message, alertVariant: 'danger' });
    } finally {
      // setTimeout(() => {
      this.setState({ isLoadingData: false });
      // }, 500000);
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
    const filteredPokemon = pokemonData.filter((poke) => poke.name.match(value));
    const resultPokemon = [];
    for (let i = 0; i < filteredPokemon.length; i++) {
      const pokemon = filteredPokemon[i];
      const pokemonData = await ApiService.getOnePokemonByName(pokemon.name);
      resultPokemon.push(pokemonData);
    }
    if (value.length > 3) {
      this.setState({ searchValue: value, pokemon: resultPokemon });
    } else {
      this.setState({ pokemon: pokemonData });
    }
  };

  closeInfoModal = () => {
    this.setState({ showInfoModal: false })
  }

  renderPokemonInfoModal = () => {
    const { selectedPokemon, showInfoModal } = this.state;
    if(selectedPokemon){
    const { id, name, sprites, types } = selectedPokemon;
    return(<Modal dialogClassName="nes-dialog" centered show={showInfoModal} onHide={this.closeInfoModal}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedPokemon && `#${id} ${UIUtils.capitalizeString(name)}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    </Modal>)
    }
    return (<Modal dialogClassName='nes-dialog'></Modal>)
  }

  updateWindowDimensions = () => {
    this.setState({ windowHeight: window.innerHeight });
  };

  render() {
    const { activePage, isLoadingData, limit, pokemon, totalCount, windowHeight } = this.state;
    return (
      <Fade in={true}>
        <Container>
        {this.renderPokemonInfoModal()}
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
          <Row
            style={{ height: parseInt(`${windowHeight * 0.69}`, 10), overflowY: 'overlay' }}
            className="my-2 nes-container is-rounded mx-0 justify-content-center"
          >
            {isLoadingData ? (
              <progress className="align-self-center w-75 nes-progress" value={pokemon.length} max={limit} />
            ) : (
              <>
                <CardGroup className="mb-2">
                  {pokemon.length > 0 &&
                    pokemon.map((poke) => (
                      <Col key={poke.name} className="p-1" lg={3} md={4}>
                        <CustomCard onClick={() => this.setState({ selectedPokemon: poke, showInfoModal: true })} cardData={poke} />
                      </Col>
                    ))}
                </CardGroup>
                {/* <CustomPagination total={totalCount} activePage={activePage} limit={25} /> */}
              </>
            )}
          </Row>
          <Row className="nes-container is-rounded mx-0 my-3">
            <PageFooter />
          </Row>
        </Container>
      </Fade>
    );
  }
}

export default App;
