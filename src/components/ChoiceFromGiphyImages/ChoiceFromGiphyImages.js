import React, { Fragment } from 'react'
import { Form, Button, Input, Radio } from 'antd'
import styles from './ChoiceFromGiphyImages.module.css'
import 'antd/dist/antd.css'
import FormItem from 'antd/lib/form/FormItem'

const ChoiceFromGiphyImages = ({ imagesFromGiphy, onChangeCheckbox, choosenImages, handleSubmit, difficulties, choosenDifficulty, onChangeRadio }) => {
  let styleColumnsForGrid = choosenDifficulty + 4
  return (<Fragment>
    <p>Quantité restantes
      {difficulties[choosenDifficulty].row * difficulties[choosenDifficulty].col / 2 - choosenImages.length}</p>
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
      <ul style={{ gridTemplateColumns: `repeat(${styleColumnsForGrid}, 1fr)` }}>
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
