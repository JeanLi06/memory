import React, { Fragment } from 'react'

import styles from './MemoryGrid.module.css'
import CardBack from './cardback_cropede.jpg'

const MemoryGrid = ({ grid, choosenDifficulty, onClickChosenImage, foundPairsQty, tryNumber, won }) => {
  return (
    <Fragment>
      <p>Essai N°{tryNumber}</p>
      {won
        ? <p>Gagné</p>
        : <Fragment>
          <p>Paires trouvées : {foundPairsQty}</p>,
          <div className={styles.modal + ' ' + styles[`difficulty_` + choosenDifficulty]}>
            {grid.urls.map((image, index) => (
                //Si l'état est à 'front', on affiche l'url stockée
                grid['statesOfCards'][index] === 'front' || grid['statesOfCards'][index] === 'found'
                  ? <img
                    src={image}
                    alt={'Giphy Image ' + index}
                    onClick={() => onClickChosenImage}
                    key={index}
                  />
                  : grid['statesOfCards'][index] === 'back'
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
        </Fragment>
      }

    </Fragment>
  )
}

export default MemoryGrid
