import React, { ant } from 'react'
import { Form, Button, Input, Radio } from 'antd'
import styles from './ChoiceFromGiphyImages.module.css'
import 'antd/dist/antd.css'
import FormItem from 'antd/lib/form/FormItem'

const ChoiceFromGiphyImages = ({ imagesFromGiphy, onChangeCheckbox, choosenImages, handleSubmit, difficulty }) => {
  return (<>
    <Radio.Group>
      <p>Difficulté :
        {Object.keys(difficulty).map(level => (
          <Radio value={level} className={styles.radioGroup}>{level}</Radio>
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
  </>)
}

export default ChoiceFromGiphyImages
