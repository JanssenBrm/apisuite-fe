import React from 'react'

const StetAccessEndpoint = () => (
  <div className='topic-container'>
    <h2 className='headline'>Accessing Sandbox Endpoints</h2>
    <p>The currently tested and available endpoints are accessible from the url</p>
    <p>
      <pre>https://sandbox.api.bnpparibasfortis.com</pre>
    </p>

    <strong>Available endpoints</strong><br /><br />
    <table>
      <thead>
        <tr>
          <th>Method</th>
          <th>Endpoint</th>
          <th>Access token grant type</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>GET</code></td>
          <td>/v1/accounts</td>
          <td>authorization_code</td>
        </tr>
        <tr>
          <td><code>GET</code></td>
          <td>{`/v1/accounts/{accountResourceId}/balances`}</td>
          <td>authorization_code</td>
        </tr>
        <tr>
          <td><code>GET</code></td>
          <td>{`/v1/accounts/{accountResourceId}/transactions`}</td>
          <td>authorization_code</td>
        </tr>
        <tr>
          <td><code>POST</code></td>
          <td>/v1/payment-requests</td>
          <td>client_credentials</td>
        </tr>
        <tr>
          <td><code>GET</code></td>
          <td>{`/v1/payment-requests/{paymentRequestResourceId}`}</td>
          <td>client_credentials</td>
        </tr>
      </tbody>
    </table>
    <br />
    <p>Just like on the previous requests, the <code>X-Openbank-Organization</code>, <code>X-Openbank-Stet-Version</code> are required headers, as well as an <code>X-Request-Id</code> and a <code>Signature</code>.</p>
    <p>You also need an <pre>Access token</pre> to access the STET endpoints. This token needs to be provided in a <pre>Authorization</pre> header of the request as a <pre>Bearer</pre> token. How you can get a valid access token for your client (i.e. your app) is detailed in section « Authorization Flows ».</p>
  </div>
)

export default StetAccessEndpoint
