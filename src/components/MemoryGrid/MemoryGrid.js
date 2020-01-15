import React from 'react'
import styles from './MemoryGrid.module.css'

const MemoryGrid = ({ grid }) => {
  return (
    <div className={styles.modal}>
      {grid.map((image, index) =>
        <img src={image} alt={'Giphy Image ' + index}/>
      )}
    </div>
  )
}

export default MemoryGrid
