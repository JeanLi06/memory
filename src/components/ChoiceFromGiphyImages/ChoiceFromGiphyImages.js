import React, { Fragment } from 'react'
import { Form, Button, Input, Radio } from 'antd'
import styles from './ChoiceFromGiphyImages.module.css'
import 'antd/dist/antd.css'
import FormItem from 'antd/lib/form/FormItem'

const ChoiceFromGiphyImages = ({ imagesFromGiphy, onChangeCheckbox, choosenImages, handleSubmit, difficulties, choosenDifficulty, onChangeRadio }) => {

  //Calcule la quantité d'images à récupérer depuis Giphy, pour le choix utilisateur
  //De manière empirique, on prend le double du nombre de couples
  const ImagesQtyToCatchFromGiphy = (difficulty) => {
    console.log("ImagesQtyToCatchFromGiphy difficulty", difficulty)

    switch (difficulty.toString()) {
      case "1" :
        console.log("12")
        return 12
      case "2" :
        console.log("16")
        return 16
      case "3":
        return 20
      case "4" :
        return 30
      case "5" :
        return 36
    }
  }

  return (<Fragment>
    <p>Quantité restantes {ImagesQtyToCatchFromGiphy(choosenDifficulty)}</p>
    <Radio.Group
      value={choosenDifficulty.toString()}
      onChange={onChangeRadio}>
      <p>Difficulté :
        {Object.keys(difficulties).map(level => (
          <Radio
            key={level}
            value={level}
            className={styles.radioGroup}>
            {level}
          </Radio>
        ))}
      </p>
    </Radio.Group>
    <Form
      layout="inline"
      onSubmit={handleSubmit}
      className={styles.ChoiceFromGiphyImages}
    >
      <ul>
        {imagesFromGiphy.map((imageFromGiphy, index) => (
          <li key={imageFromGiphy.id}>
            <img alt={imageFromGiphy.slug} src={imageFromGiphy.images.preview_gif.url} id={imageFromGiphy.id}/>
            <label>
              <Input
                type="checkbox"
                name="select"
                id={index}
                data-img-src={imageFromGiphy.images.preview_gif.url}
                onChange={onChangeCheckbox}
              />
            </label>
          </li>
        ))}
      </ul>
      <FormItem>
        <Button type="primary" htmlType="submit">
          Valider
        </Button>
      </FormItem>
    </Form>
  </Fragment>)
}

export default ChoiceFromGiphyImages
