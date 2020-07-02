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
      limit: props.limit || 40,
      offset: props.offset || 0,
      pokemon: [],
      pokemonData: [],
      searchValue: '',
      showInfoModal: false,
      totalCount: 0,
      windowHeight: 0,
    };
  }

  getPokemonData = async () => {
    const { limit, offset } = this.state;
    const queryOptions = { limit, offset };
    try {
      const apiResponse = await makeApiCall('/pokemon', queryOptions);
      this.setState({ totalCount: apiResponse.count, pokemonData: apiResponse.result, pokemon: apiResponse.result });
    } catch (err) {
      this.setState({ showAlert: true, alertMessage: err.message, alertVariant: 'danger' });
    } finally {
      this.setState({ isLoadingData: false });
   }
  };

  componentDidMount() {
    this.getPokemonData();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  closeInfoModal = () => {
    this.setState({ showInfoModal: false });
  };

  handleClick = async () => {
    const { pokemonData, searchValue } = this.state;
    if (searchValue.length === 0) {
      this.setState({ pokemon: pokemonData });
    } else if (searchValue.length >= 3){
      try{
        const result = await makeApiCall('/pokemon/search', { keyword: searchValue});
        this.setState({ pokemon: result });
      }catch(err){
        console.error(err);
        this.setState({ showAlert: true, alertMessage: err.message, alertVariant: 'danger' });
      }
    } else {
      this.setState({ showAlert: true, alertMessage: 'No hay texto seleccionado!', alertVariant: 'danger' });
      return false;
    }
  }

  handleInputChange = async (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value })
  };

  handlePageChange = (direction) => {
    this.setState(
      (prevState) => {
        const { limit, offset } = prevState;
        let newOffset = 0;
        if (direction) {
          newOffset = offset + limit;
        } else {
          newOffset = offset - limit;
        }
        return { offset: newOffset, isLoadingData: true };
      },
      () => this.getPokemonData()
    );
  };

  // Move modal to separate component
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
              <Col className="d-flex justify-content-center" lg={6}>
                <Image src={sprites.front_default} className="w-100" />
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
    const { isLoadingData, limit, loadProgress, offset, pokemon, totalCount, windowHeight } = this.state;
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
            <TextInputWithButton buttonText="Find" onButtonClick={this.handleClick} onInputChange={this.handleInputChange} placeholder="Find Pokémon" />
          </Row>
          <Row
            style={{ height: parseInt(`${windowHeight * 0.69}`, 10), overflowY: 'overlay' }}
            className="my-2 nes-container is-rounded mx-0 justify-content-center"
          >
            {isLoadingData ? (
              <progress id="custom-progress-bar" className="align-self-center w-75 nes-progress" value={0} max={100} />
            ) : (
              <>
                <CardGroup className="w-100 mb-2">
                  {pokemon && pokemon.length > 0 ?
                    pokemon.map((poke) => (
                      <Col key={poke.name} className="p-1" xl={3} md={4}>
                        <CustomCard onClick={() => this.setState({ selectedPokemon: poke, showInfoModal: true })} cardData={poke} />
                      </Col>
                    )): <p>No data found.</p>}
                </CardGroup>
                <CustomPagination handlePageChange={this.handlePageChange} offset={offset} isLastPage={totalCount - offset < limit ? true : false} />
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
