import * as React from 'react'

import logoUrl from 'assets/logo-blue.png'

import './styles.scss'

const Footer = () => (
  <footer className='footer'>
    <div className='container'>
      <img src={logoUrl} alt='logo' className='logo' />
      <p>© Cloudoki 2019. All rights reserved.</p>
    </div>
  </footer>
)

export default Footer
