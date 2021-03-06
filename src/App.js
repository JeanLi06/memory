import React, { Component, Fragment } from 'react'
import { Spin } from 'antd'
import 'antd/dist/antd.css'
import './App.css'
import Notice from './components/Notice/Notice'
import ChoiceFromGiphyImages from './components/ChoiceFromGiphyImages/ChoiceFromGiphyImages'
import MemoryGrid from './components/MemoryGrid/MemoryGrid'

class App extends Component {
  state = {
    modalNoticeVisible: true,
    giphyQuerySubject: 'scrat',
    imagesFromGiphylVisible: true,
    imagesFromGiphy: [],
    ids: [],
    difficulties: {
      '1': { row: 3, col: 4 },
      '2': { row: 4, col: 4 },
      '3': { row: 4, col: 5 },
    },
    choosenDifficulty: 1,
    grid: {
      urls: [],
      statesOfCards: []
    },
    gridIsGenerated: false,
    numberOfCouplesToGuess: 6,
    isImagesFromGiphyLoaded: false,
    choosenImages: [],
    clickedPair: [],
    foundPairsQty: 0,
    tryNumber: 0,
    won: false
  }

  componentDidMount = async () => {
    await this.getImagesFromGiphy()
  }

  getImagesFromGiphy = () => {
    console.log('getImagesFromGiphy')
    //De manière empirique, on prend le nombre de couples + 4
    let imagesQty = this.state.numberOfCouplesToGuess + 4
    const subject = this.state.giphyQuerySubject
    console.log('subject', subject)
    this.setState({ numberOfCouplesToGuess: this.ImagesQtyToCatchFromGiphy(this.state.choosenDifficulty) - 4 })
    let query = `https://api.giphy.com/v1/gifs/search?q=${subject}&api_key=9Q4AqATZ2rDJfYZ3Wl6aRMS3TxTaCF5m&limit=${imagesQty}&lang=fr`
    console.log('query', query)

    fetch(query,
      {
        method: 'GET',
      })
      .then(response => {
        response.json()
          .then(json => {
            this.setState({
              imagesFromGiphy: json.data,
              isImagesFromGiphyLoaded: true
            })
          })
      })
      .catch(console.warn)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    //On teste si on a choisi suffisamment d'images, avant de générer la grille
    if (this.state.difficulties[this.state.choosenDifficulty].row *
      this.state.difficulties[this.state.choosenDifficulty].col / 2 - this.state.choosenImages.length === 0) {
      this.setState({
        imagesFromGiphylVisible: false,
      })
      this.generateGrid()
    }
  }

  //Calcule la quantité d'images à récupérer depuis Giphy, pour le choix utilisateur
  ImagesQtyToCatchFromGiphy = (difficulty) => {
    switch (difficulty.toString()) {
      case '1' :
        return 10
      case '2' :
        return 12
      case '3' :
        return 14
      default :
        return 10
    }
  }

  onClickGiphyImage = event => {
    let choosenImages = [...this.state.choosenImages]
    const choosenImage = event.target.getAttribute('src')
    //On teste si l'image n'est pas déjà sélectionnée et que l'on n'a pas atteint le nombre max à sélectionner
    if (choosenImage !== null && !choosenImages.includes(choosenImage) && this.state.choosenImages.length < this.state.numberOfCouplesToGuess) {
      choosenImages.push(choosenImage)
    } else
    // Désélection
      choosenImages.splice(choosenImages.indexOf(choosenImage), 1)
    this.setState({ choosenImages })
  }

  onChangeRadio = async event => {
    console.log('onChangeRadio', event.target.value)
    await this.setState({ choosenDifficulty: parseInt(event.target.value) })
    let numberOfCouplesToGuess = this.ImagesQtyToCatchFromGiphy(this.state.choosenDifficulty) - 4
    console.log('numberOfCouplesToGuess', numberOfCouplesToGuess)
    await this.setState({ numberOfCouplesToGuess })
    this.getImagesFromGiphy()
  }

// Retourne un tableau dont les valeurs ont été mélangées aléatoirement
  getShuffledArray = (arr) => {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]]
    }
    return newArr
  }

//Génère une grille avec des couples d'images, d'après les images choisies
  generateGrid = () => {
    console.log('generateGrid')
    if (!this.state.gridIsGenerated) {
      let image_couples = []
      //On initialise l'état des images de la future grille (qui pourra être : front, back, found)
      let states = []
      for (let i = 0; i < this.state.choosenImages.length; i++) {
        //On génère les couples
        image_couples.push(this.state.choosenImages[i])
        image_couples.push(this.state.choosenImages[i])
        //On retourne les paires de cartes
        states.push('front')
        states.push('front')
      }
      //  On mélange (déactiver pour test)
      image_couples = this.getShuffledArray(image_couples)
      this.setState(prevState => ({
        grid: {
          ...prevState.grid,
          urls: image_couples
        }
      }))
      // this.setState(this.state.grid.statesOfCards = [...states])
      this.setState(prevState => ({
        grid: {
          ...prevState.grid,
          statesOfCards: states
        }
      }))
      this.setState({ gridIsGenerated: true })
      //  Après 2 secondes, on masque les cartes
      if (this.state.tryNumber === 0) {
        setTimeout(() => {
          let states = []
          for (let i = 0; i < this.state.choosenImages.length; i++) {
            states.push('back')
            states.push('back')
            this.setState(prevState => ({
              grid: {
                ...prevState.grid,
                statesOfCards: states
              }
            }))
          }
        }, 2000)
      }
    }
  }

  testPair = () => {
    //Si on a 2 cartes
    if (this.state.clickedPair.length > 1) {
      //c'est une paire ?
      const index_image1 = this.state.clickedPair[0]
      const index_image2 = this.state.clickedPair[1]
      if (this.state.grid.urls[index_image1] === this.state.grid.urls[index_image2]) {
        this.setState(prevState => {return { foundPairsQty: prevState.foundPairsQty + 1 }})
        const states = [...this.state.grid.statesOfCards]
        //Si on a trouvé une paire, on l'indique afin qu'elle ne soient pas retournées
        states[index_image1] = 'found'
        states[index_image2] = 'found'
        this.setState(prevState => ({
          grid: {
            ...prevState.grid,
            statesOfCards: states
          }
        }))
        this.setState({ clickedPair: [] })
      }
      const states = [...this.state.grid.statesOfCards]
      //On retourne les cartes au bout de 2 secondes, si elle ne forment pas une paire
      if (states[index_image1] !== 'found' && states[index_image1] !== 'found') {
        states[index_image1] = 'back'
        states[index_image2] = 'back'
        setTimeout(() => {
            this.setState(prevState => ({
              grid: {
                ...prevState.grid,
                statesOfCards: states
              }
            }))
            this.setState({ clickedPair: [] })
          }
          , 2000)
      }
      this.setState(prevState => {return { tryNumber: prevState.tryNumber + 1 }})
    }
    //Test si on a gagné
    if (this.state.numberOfCouplesToGuess === this.state.foundPairsQty) {
      this.setState({ won: true })
    }
  }

//  On a cliqué sur 2 cartes ?
  updateStateClickedPair = (clickedPair) => {
    this.setState({ clickedPair: clickedPair })
  }

//Gère le click sur les images à deviner (tester, retourner)
  onClickImageGrid = async (event) => {
    //On récupère l'index de la carte à retourner, avec le alt
    const indexClicked = parseInt(event.currentTarget.alt.slice(-2))
    const states = [...this.state.grid.statesOfCards]
    if (states[indexClicked] === 'back' && this.state.clickedPair.length < 2) {
      states[indexClicked] = 'front'
      const clickedPair = [...this.state.clickedPair]
      clickedPair.push(indexClicked)
      await this.updateStateClickedPair(clickedPair)
    }
    this.setState(this.state.grid.statesOfCards = states)
    this.testPair()
  }

  //Click sur le bouton Rechercher du composant ChoiceFromGiphyImages
  handleSearch = async (value) => {
    await this.setState({ giphyQuerySubject: value.trim() })
    this.getImagesFromGiphy()
  }

  hideModalNotice = () => {
    this.setState({ modalNoticeVisible: false })
  }

  render () {
    if (!this.state.isImagesFromGiphyLoaded) {
      return (
        <Fragment>
          <h1> Memory </h1>
          <header className="App-header">
            <p>Chargement...</p>
            <Spin size="large"/>
          </header>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          {this.state.modalNoticeVisible && <Notice
            className="App-modal-notice"
            hideModalNotice={this.hideModalNotice}
          />}
          <h1> Memory </h1>
          {this.state.imagesFromGiphylVisible &&
          <div
            className="App-center-in-page"
            title="Valider le choix d'images"
          >
            <ChoiceFromGiphyImages
              handleSearch={this.handleSearch}
              imagesFromGiphy={this.state.imagesFromGiphy}
              choosenImages={this.state.choosenImages}
              handleSubmit={this.handleSubmit}
              difficulties={this.state.difficulties}
              choosenDifficulty={this.state.choosenDifficulty}
              onChangeRadio={this.onChangeRadio}
              onClickGiphyImage={this.onClickGiphyImage}
              giphyQuery={this.state.giphyQuerySubject}
            />
          </div>
          }
          {(this.state.choosenImages.length !== 0 && !this.state.imagesFromGiphylVisible)
          && (
            <MemoryGrid
              className="memory_grid"
              grid={this.state.grid}
              choosenDifficulty={this.state.choosenDifficulty}
              onClickChosenImage={this.onClickImageGrid}
              foundPairsQty={this.state.foundPairsQty}
              tryNumber={this.state.tryNumber}
              won={this.state.won}
            />)
          }
        </Fragment>
      )
    }
  }
}

export default App
