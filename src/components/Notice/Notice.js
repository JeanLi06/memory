import React, { Fragment } from 'react'
import styles from './Notice.module.css'

import { Modal } from 'antd'
import 'antd/dist/antd.css'

const Notice = ({hideModalNotice}) => {
  Modal.info({
    title: 'GIF Memory',
    content: (
      <div className={styles.textAlignLeft}>
        <p className={styles.textColorDark}>Commencez par choisir un thème pour vos images, ou laissez le thème par défaut.</p>
        <p className={styles.textColorDark}>Ensuite, changez la difficulté si besoin. </p>
        <p className={styles.textColorDarker}>Enfin, choisissez la quantité requise d'images (différentes) et validez.</p>
      </div>
    ),
    onOk () {
      hideModalNotice()
    },
  })
  return (
    <>
    </>
  )
}

export default Notice
