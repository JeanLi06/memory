import React from 'react'

//Permet d'ajouter plusiseus classes à un className
import classNames from 'classnames'

import styles from './MemoryGrid.module.css'

const MemoryGrid = ({ grid, choosenDifficulty}) => {
  choosenDifficulty = 2
  return (
    <div className={classNames([styles['modal'], styles[`difficulty_`+choosenDifficulty]].join(' '))}>
      {grid.urls.map((image, index) => (
          //TODO Si l'état est à 'front' //Si l'état est à 'front', on affiche l'url stockée
          grid['states'][index] === 'front'
            ? <img src={image} alt={'Giphy Image ' + index}/>
            : grid['states'][index] === 'back'
            ? <a href="https://placeholder.com"><img src="https://via.placeholder.com/100" alt="BACK"/></a>
            : null
        )
      )}
    </div>
  )
}

export default MemoryGrid
