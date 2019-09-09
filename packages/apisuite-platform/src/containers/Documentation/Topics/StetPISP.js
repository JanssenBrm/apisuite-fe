import React from 'react'

import authenticatescreen from 'assets/docs/stet_authenticate.png'
import confirmpaymentscreen from 'assets/docs/stet_confirm_payment.png'
import accountselectionscreen from 'assets/docs/stet_account_selection.png'

const StetPISP = () => (
  <div className='topic-container'>
    <h2 className='headline'>PISP - Authorizing an App</h2>
    <p>If your app needs to access the payment endpoints (<pre>PISP</pre> scope) then you will need to obtain an access token with the <pre>client credentials</pre> grant type.</p>

    <h4>Using Client Credentials Grant Type</h4>

    <p>To obtain a <pre>client_credentials</pre> token, all you need is a <pre>POST</pre> request to the <pre>https://sandbox.auth.bnpparibasfortis.com/token</pre> url with the following parameters:</p>

    <strong>Request parameters</strong><br /><br />
    <table>
      <thead>
        <tr>
          <th>Input</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>X-Openbank-Organization</code></td>
          <td><code>header</code></td>
          <td>The <code>Organization ID</code> you have obtained when creating an App (accessible in the App details)</td>
        </tr>
        <tr>
          <td><code>X-Openbank-Stet-Version</code></td>
          <td><code>header</code></td>
          <td>The API version (currently <code>1.4.0.47.develop</code>)</td>
        </tr>
        <tr>
          <td><code>grant_type</code></td>
          <td><code>payload</code></td>
          <td>The grant type. It has to be <code>client_credentials</code></td>
        </tr>
        <tr>
          <td><code>redirect_uri</code></td>
          <td><code>payload</code></td>
          <td>One of the redirect uri's you registered with your App</td>
        </tr>
        <tr>
          <td><code>client_id</code></td>
          <td><code>payload</code></td>
          <td>Your App's <code>client id</code></td>
        </tr>
        <tr>
          <td><code>client_secret</code></td>
          <td><code>payload</code></td>
          <td>Your App's <code>client secret</code></td>
        </tr>
        <tr>
          <td><code>scope</code></td>
          <td><code>payload</code></td>
          <td>A semicolon separated string with the scopes.</td>
        </tr>
      </tbody>
    </table>

    <p>You will obtain an <pre>Access token</pre> that will allow you to issue payment requests, for example.</p>

    <h4>Exchange Code cURL example</h4>

    <pre className='big'>
      curl -X POST \
  --data "grant_type=client_credentials" \
  --data "redirect_uri=http://www.demo-app.com/callback" \
  --data "client_id=aB541dfA" \
  --data "client_secret=sup3rs3cr3t" \
  --data "scope=pisp" \
  https://sandbox.auth.bnpparibasfortis.com/token
    </pre>

    <strong>Output</strong><br /><br />

    <pre className='big'>
      {`{
  "data": {
  "token_type": "bearer",
  "token": "74f6e061-4c66-40f5-9eb8-fd2a71373b82",
  "expires_in": 3600,
  "expires": "2019-03-01T14:41:34.501Z",
  "refresh": "1dbfb99e-223b-4288-b2f0-bd967ee5a8ec"
}`}
    </pre>

    <p>This is now the <pre>Bearer token</pre> or <pre>Access token</pre> that your App will use to issue request against the <pre>STET PISP Sandbox API</pre> endpoints that are to be used on behalf of a <pre>PSU</pre>.</p>
  </div>
)

export default StetPISP
