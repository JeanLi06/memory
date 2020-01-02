import React, { Component } from 'react'
import { Spin } from 'antd'
import 'antd/dist/antd.css'
import './App.css'
import Grid from './components/Grid'

class App extends Component {

  state = {
    imagesFromGiphy: [],
    ids: [],
    grid: [],
    numberOfRows: 3,
    numberOfColumns: 4,
    isLoaded: false,
    choosenImages: []
  }

  componentDidMount () {
    this.getImagesFromGiphy()
    // *************** Pour Test  *********************
    // setInterval(() => this.setState({
    //   isLoaded: true
    // }), 3000)
  }

  getImagesFromGiphy = () => {
    let limit = 3
    // let limit = this.state.numberOfColumns * this.state.numberOfRows / 2
    let query = `https://api.giphy.com/v1/gifs/search?q=scrat&api_key=9Q4AqATZ2rDJfYZ3Wl6aRMS3TxTaCF5m&limit=${limit}`
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

  render () {
    if (!this.state.isLoaded) {
      return (
        <header className="App-header">
          <p>Chargement...</p>
          <Spin size="large"/>
        </header>
      )
    } else {
      console.log(this.state)
      return (
        <div className="App">
          <header className="App-header">
            Memory
          </header>
          <Grid
            imagesFromGiphy={this.state.imagesFromGiphy}
            choosenImages={this.state.choosenImages}
            onChangeCheckbox={this.onChangeCheckbox}
          />
        </div>
      )
    }
  }
}

export default App
