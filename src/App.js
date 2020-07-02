import React, { Component } from 'react';
import { CustomAlert, CustomCard, CustomPagination, PageFooter, TextInputWithButton } from './components';
import { Button, CardGroup, Col, Container, Fade, Image, Modal, Row } from 'react-bootstrap';
import UIUtils from './utils/ui';
import makeApiCall from './services/api';
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
      const apiResponse = await makeApiCall('/pokemon', queryOptions);
      this.setState({ totalCount: apiResponse.count, pokemonData: apiResponse.result, pokemon: apiResponse.result });
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
    const resultPokemon = pokemonData.filter((poke) => poke.name.match(value));
    if (value.length > 3) {
      this.setState({ searchValue: value, pokemon: resultPokemon });
    } else {
      this.setState({ pokemon: pokemonData });
    }
  };

  closeInfoModal = () => {
    this.setState({ showInfoModal: false });
  };

  renderPokemonInfoModal = () => {
    const { selectedPokemon, showInfoModal } = this.state;
    if (selectedPokemon) {
      const { id, name, sprites } = selectedPokemon;
      return (
        <Modal id="poke-info-modal" size="lg" centered show={showInfoModal} onHide={this.closeInfoModal}>
          <Modal.Body>
            <Row className="flex-row-reverse">
              <Button onClick={this.closeInfoModal} className="close">
                x
              </Button>
            </Row>
            <Row className="justify-content-between">
              <Modal.Title>{selectedPokemon && `#${id} ${UIUtils.capitalizeString(name)}`}</Modal.Title>
            </Row>
            <Row>
              <Col className='d-flex justify-content-center' lg={6}>
                <Image src={sprites.front_default} className='w-100' />
              </Col>
              <Col lg={6}>
                <div className="d-flex flex-column align-items-center">
                  <Row>
                    <p>Height {selectedPokemon.height}</p>
                  </Row>
                  <Row>
                    <p>Weight {selectedPokemon.weight}</p>
                  </Row>
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      );
    }
    return <Modal dialogClassName="nes-dialog"></Modal>;
  };

  updateWindowDimensions = () => {
    this.setState({ windowHeight: window.innerHeight });
  };

  render() {
    const { 
      // pagination state variables - activePage, totalCount,
      isLoadingData, limit, pokemon, windowHeight } = this.state;
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
                <CardGroup className="w-100 mb-2">
                  {pokemon.length > 0 &&
                    pokemon.map((poke) => (
                      <Col key={poke.name} className="p-1" xl={3} md={4}>
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
