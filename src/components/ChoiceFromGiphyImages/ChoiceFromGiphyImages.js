import React, { Fragment } from 'react'
import { Form, Button, Input, Radio } from 'antd'
import styles from './ChoiceFromGiphyImages.module.css'
import 'antd/dist/antd.css'
import FormItem from 'antd/lib/form/FormItem'

const ChoiceFromGiphyImages = ({ imagesFromGiphy, choosenImages, handleSubmit, difficulties, choosenDifficulty, onChangeRadio, onClickGiphyImage }) => {
  // let styleColumnsForGrid = choosenDifficulty + 4
  return (<Fragment>
    <p>Restantes :
      {` `} {difficulties[choosenDifficulty].row * difficulties[choosenDifficulty].col / 2 - choosenImages.length}</p>
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
      <ul onClick={onClickGiphyImage}>
        {imagesFromGiphy.map((imageFromGiphy, index) => (
          <li key={imageFromGiphy.id}>
            <img
              alt={imageFromGiphy.slug}
              src={imageFromGiphy.images.preview_gif.url}
              id={imageFromGiphy.id}
              style={choosenImages.includes(imageFromGiphy.images.preview_gif.url)
                ? { border: '#1890ff 5px solid', boxShadow: 'none' }
                : null}
            />
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
