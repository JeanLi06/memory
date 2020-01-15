import React, { ant } from 'react'
import { Form, Button, Input } from 'antd'
import styles from './ChoiceFromGiphyImages.module.css'
import 'antd/dist/antd.css'



const ChoiceFromGiphyImages = ({ imagesFromGiphy, onChangeCheckbox, choosenImages, handleSubmit }) => {
  return (
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Valider
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ChoiceFromGiphyImages
