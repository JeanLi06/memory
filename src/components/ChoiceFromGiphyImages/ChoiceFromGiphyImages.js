import React, { Fragment } from 'react'
import { Form, Button, Input, Radio } from 'antd'
import styles from './ChoiceFromGiphyImages.module.css'
import 'antd/dist/antd.css'
import FormItem from 'antd/lib/form/FormItem'

const ChoiceFromGiphyImages = ({ giphyQuery, imagesFromGiphy, choosenImages, handleSubmit, difficulties, choosenDifficulty, onChangeRadio, onClickGiphyImage, handleSearch }) => {
  //On définit une barre de recherche avec bouton — ant design
  const { Search } = Input

  const leftImages = difficulties[choosenDifficulty].row * difficulties[choosenDifficulty].col / 2 - choosenImages.length
  return (<Fragment>
    <p>Restantes :
      {` `} {leftImages}</p>
    <Search
      placeholder={giphyQuery}
      enterButton
      onSearch={value => handleSearch(value)}
      className={styles.search}
    />
    <Radio.Group
      value={choosenDifficulty.toString()}
      onChange={onChangeRadio}>
      <p className={styles.difficulty}>Difficulté :{` `}
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
      className={styles.choiceFromGiphyImages}
    >
      <ul onClick={onClickGiphyImage}>
        {imagesFromGiphy.map((imageFromGiphy, index) => (
          <li key={imageFromGiphy.id}>
            <img
              alt={imageFromGiphy.slug}
              src={imageFromGiphy.images.preview_gif.url}
              id={imageFromGiphy.id}
              style={choosenImages.includes(imageFromGiphy.images.preview_gif.url)
                ? { border: '#1890ff 7px ridge', boxShadow: 'none' }
                : null
              }
            />
          </li>
        ))}
      </ul>
      <FormItem>
        <Button type={leftImages === 0 ? 'primary' : 'secondary'} htmlType="submit">
          Valider
        </Button>
      </FormItem>
    </Form>
  </Fragment>)
}

export default ChoiceFromGiphyImages
