import React, { Component, Fragment } from 'react'
import { Button, Spin, InputNumber } from 'antd'
import 'antd/dist/antd.css'
import './App.css'
import ChoiceFromGiphyImages from './components/ChoiceFromGiphyImages/ChoiceFromGiphyImages'
import MemoryGrid from './components/MemoryGrid/MemoryGrid'

class App extends Component {

  state = {
    classModal: 'App-modal',
    imagesFromGiphylVisible: true,
    imagesFromGiphy: [],
    ids: [],
    difficulty: {
      '1': { row: 4, col: 3 },
      '2': { row: 4, col: 4 },
      '3': { row: 5, col: 4 },
      '4': { row: 6, col: 5 },
      '5': { row: 6, col: 6 }
    },
    choosenDifficulty: 1,
    grid: {
      urls: [],
      states: []
    },
    gridIsGenerated: false,
    numberOfCouples: 5,
    isLoaded: false,
    choosenImages: [],
  }

  async componentDidMount () {
    await this.getImagesFromGiphy()
    // *************** Pour Test  *********************
    // setInterval(() => this.setState({
    //   isLoaded: true
    // }), 3000)
    // if (this.state.choosenImages.length !== 0 && !this.state.imagesFromGiphylVisible && !this.state.gridIsGenerated) this.generateGrid()
  }

  getImagesFromGiphy = () => {
    let imagesQty = this.state.numberOfCouples
    let query = `https://api.giphy.com/v1/gifs/search?q=scrat&api_key=9Q4AqATZ2rDJfYZ3Wl6aRMS3TxTaCF5m&limit=${imagesQty}&lang=fr`
    fetch(query,
      {
        method: 'GET',
      })
      .then(response => {
        response.json()
          .then(json => {
            this.setState({
              imagesFromGiphy: json.data,
              isLoaded: true
            })
          })
      })
      .catch(console.warn)
  }

  onChangeCheckbox = (event) => {
    const choosenImage = event.target.getAttribute('data-img-src')
    let choosenImages = [...this.state.choosenImages]
    if (event.target.checked) {
      // Sélection
      choosenImages.push(choosenImage)
    } else {
      // Désélection
      choosenImages.splice(choosenImages.indexOf(choosenImage), 1)
    }
    this.setState({ choosenImages })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      imagesFromGiphylVisible: false,
    })
    this.generateGrid()
    // console.log('handlesubmit', event.currentTarget)
  }

  handleInputNumber = async (value) => {
    await this.setState({ numberOfCouples: value })
    this.getImagesFromGiphy()
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
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

        //Pour test
        if (Math.random() < 0.5) states.push('back')
        else states.push('front')
        if (Math.random() < 0.5) states.push('back')
        else states.push('front')
      }
      //  On mélange
      image_couples = [...this.getShuffledArray(image_couples)]

      this.setState(this.state.grid.urls = [...image_couples])
      this.setState(this.state.grid.states = [...states])
      this.setState({ gridIsGenerated: true })
    }
  }

  render () {
    if (!this.state.isLoaded) {
      return (
        <header className="App-header">
          <p>Chargement...</p>
          <Spin size="large"/>
        </header>
      )
    } else {

      return (
        <Fragment>
          <header className="App-header">
            Memory
          </header>
          {this.state.imagesFromGiphylVisible
          && <div
            className="App-center-in-page"
            title="Valider le choix d'images"
          >
            <label>
              {` Nombre d'images `}
              <InputNumber
                defaultValue={5}
                min={5}
                max={20}
                value={this.state.numberOfCouples}
                onChange={this.handleInputNumber}/>
            </label>
            <ChoiceFromGiphyImages
              imagesFromGiphy={this.state.imagesFromGiphy}
              choosenImages={this.state.choosenImages}
              onChangeCheckbox={this.onChangeCheckbox}
              handleSubmit={this.handleSubmit}
              difficulty={this.state.difficulty}
            />
          </div>
          }
          {(this.state.choosenImages.length !== 0 && !this.state.imagesFromGiphylVisible)
          && (
            <MemoryGrid
              className="modal"
              grid={this.state.grid}
              choosenDifficulty={this.state.choosenDifficulty}
              // generateGrid={this.generateGrid}
            />)
          }
        </Fragment>
      )
    }
  }
}

export default App
