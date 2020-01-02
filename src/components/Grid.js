import React, { ant } from 'react'
import { Checkbox, Form, Button, Input } from 'antd'
import 'antd/dist/antd.css'

const handleSubmit = (event) => {
  event.preventDefault()
  console.log('handlesubmit', event.currentTarget)
}

const Grid = ({ imagesFromGiphy, onChangeCheckbox, choosenImages }) => {
  console.log('choosenImages',choosenImages)
  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <ul>
        {imagesFromGiphy.map((imageFromGiphy, index) => (
          <li key={imageFromGiphy.id}>
            <img alt={imageFromGiphy.slug} src={imageFromGiphy.images.downsized.url} id={imageFromGiphy.id}/>
            <label>
              Sélectionner
              <input
                type="checkbox"
                name="select"
                id={index}
                data-img-src={imageFromGiphy.images.downsized.url}
                onChange={onChangeCheckbox}
              />
            </label>
          </li>
        ))}
      </ul>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Choisir
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Grid
