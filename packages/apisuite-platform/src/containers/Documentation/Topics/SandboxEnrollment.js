import React from 'react'
import createAppImg from 'assets/docs/docs_create_app.png'

const Topic = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      Getting started
    </h2>
    <p>
      Have a look at the Sandbox APIs to get insights on our product.
    </p>
    <p>
      Before you begin to test the APIs, you will need to connect to the sandbox following these steps.
    </p>
    <ol>
      <li><a href='/signup'>Sign up</a> to get access to the Alpha AppCenter</li>
      <p>
        Signing up sends you to your apps dashboard. Otherwise, from the top navigation, select Dashboard.<br/>
        If you already have an account, sign in.
      </p>

      <li><a href='/apps'>Register</a> an app</li>
      <p>
        Click on the Create App icon to register a new app.
      </p>
      <img src={createAppImg} />
    </ol>
  </div>
)

export default Topic
