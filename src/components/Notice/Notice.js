import React, { Fragment } from 'react'
import { Modal } from 'antd'
import 'antd/dist/antd.css'

const Notice = ({hideModalNotice}) => {
  Modal.info({
    title: 'GIF Memory',
    content: (
      <div style={{textAlign: 'left'}}>
        <p style={{color: '#282c34'}}>Commencez par choisir une thème pour vos images, ou laisser le thème par défaut.</p>
        <p style={{color: '#282c34'}}>Ensuite, changez la difficulté si besoin. </p>
        <p style={{color: '#000'}}>Pour finir, vous devez choisir un nombre d'images différentes.</p>
      </div>
    ),
    onOk () {
      hideModalNotice()
    },
  })
  return (
    <Fragment>
    </Fragment>
  )
}

export default Notice
