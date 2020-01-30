import React from 'react'

import styles from './MemoryGrid.module.css'
import CardBack from './cardback_cropede.jpg'

const MemoryGrid = ({ grid, choosenDifficulty, onClickChosenImage }) => {
  return (
    <div className={styles.modal + ' ' + styles[`difficulty_` + choosenDifficulty]}>
      {grid.urls.map((image, index) => (
          //Si l'état est à 'front', on affiche l'url stockée
          grid['states'][index] === 'front'
            ? <img
              src={image}
              alt={'Giphy Image ' + index}
              onClick={() => onClickChosenImage}
              key={index}
            />
            : grid['states'][index] === 'back'
            ? <img
              src={CardBack}
              alt={'Giphy Image ' + index}
              onClick={onClickChosenImage}
              key={index}
            />
            : null
        )
      )}
    </div>
  )
}

export default MemoryGrid
