import React from 'react'
import authorizescreen from 'assets/docs/stet_authorize.png'
import authenticatescreen from 'assets/docs/stet_authenticate.png'

const StetAISP = () => (
  <div className='topic-container'>
    <h2 className='headline'>AISP - Authorizing an App</h2>

    <p>In order to use the sandbox endpoints, an <pre>Access token</pre> is required. This token will allow the app to issue requests against the STET Sandbox API on behalf of a PSU.</p>
    <p>If your app needs the <pre>AISP</pre> scope, i.e. needs to access the account information of your test users, you will need to obtain an access token with the <pre>authorization code</pre> grant type. This flow is detailed below.</p>

    <h4>Authorizing the App and Getting the Authorization Code</h4>

    <p>To receive an authorization code you will have to act as a PSU and authorize the app to act on behalf of this PSU.</p>
    <p>You can input the following url in a browser:</p>

    <pre>{`https://sandbox.auth.bnpparibasfortis.com/authorize?response_type=code&client_id=<YOUR_APP_CLIENT_ID>&redirect_uri=<YOUR_APP_REDIRECT_URI>&scope=aisp&state=fhksdjfhgskj`}</pre>

    <p>Replace the query parameters with your own values, especially the <pre>client_id</pre> and the <pre>redirect_uri</pre> which must match the ones from your app (you can find them in your app overview by clicking on the app details of a specific app).</p>
    <p>If the <pre>PSU</pre> is not authenticated, you will be redirected to the <pre>Login</pre> screen.</p>

    <img src={authenticatescreen} />

    <p>On the login view, you should use one of your <pre>PSU</pre> credentials from your test data.</p>
    <p>Once authenticated, you should now be redirected to the <pre>authorization</pre> screen. On this screen you should see the name of your app and a message indicating the permissions that will be granted to that app.</p>

    <img src={authorizescreen} />

    <p>If you press the <pre>Authorize</pre> button, you will be redirected to the <pre>callback url</pre> of the <pre>App</pre> with a <pre>code</pre> query string that is attached by the authorization server. This <pre>code</pre> should be used on the section <b>Exchanging the Code for an Access Token.</b> Copy it.</p>

    <h4>Exchanging the Authorization Code for an Access Token (Bearer)</h4>

    <p>At this point, all that is left is exchanging the <pre>Authorization code</pre> for an <pre>Access token</pre> that will allow your app to issue requests against the STET Sandbox Api on behalf of a <pre>PSU</pre>.</p>

    <p>To do so, you need to do a <pre>POST</pre> request on <pre>https://sandbox.auth.bnpparibasfortis.com/token</pre> with the following parameters:</p>

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
          <td><code>code</code></td>
          <td><code>payload</code></td>
          <td>The <code>authorization code</code> you have obtained in the previous step</td>
        </tr>
        <tr>
          <td><code>grant_type</code></td>
          <td><code>payload</code></td>
          <td>The grant type. It has to be <code>authorization_code</code></td>
        </tr>
        <tr>
          <td><code>redirect_uri</code></td>
          <td><code>payload</code></td>
          <td>The <code>redirect uri</code> from the previous step</td>
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
          <td>A semicolon separated string with the scopes you have requested on the previous step. They must match exactly between the authorize request and the token request.</td>
        </tr>
      </tbody>
    </table>
    <br />

    <strong>Response</strong><br />
    <p>The response will contain a <pre>data</pre> property which contains the response:</p>

    <table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>token_type</code></td>
          <td><code>String</code></td>
          <td>The type of token. Typically is <code>Bearer</code></td>
        </tr>
        <tr>
          <td><code>token</code></td>
          <td><code>String</code></td>
          <td>The access token</td>
        </tr>
        <tr>
          <td><code>expires_in</code></td>
          <td><code>Integer</code></td>
          <td>The lifetime of the token in seconds</td>
        </tr>
        <tr>
          <td><code>expires</code></td>
          <td><code>DateTime</code></td>
          <td>The token expiration date and time</td>
        </tr>
        <tr>
          <td><code>refresh</code></td>
          <td><code>String</code></td>
          <td>The refresh token which can be used to exchange for a new <code>Access Token</code>. It has a lifetime of 7 days</td>
        </tr>
      </tbody>
    </table>

    <h4>Exchange Code cURL example</h4>

    <pre className='big'>
      curl -X POST \
  --data "code=the_authorization_code_you_obtained_earlier" \
  --data "grant_type=authorization_code" \
  --data "redirect_uri=http://www.demo-app.com/callback" \
  --data "client_id=aB541dfA" \
  --data "client_secret=sup3rs3cr3t" \
  --data "scope=aisp" \
  https://sandbox.auth.bnpparibasfortis.com/token
    </pre>

    <strong>Output</strong><br /><br />

    <pre className='big'>
      {`{
  "data": {
  "token_type": "bearer",
  "token": "d5010e19-6e93-4720-af4c-98b9466c126f",
  "expires_in": 3600,
  "expires": "2018-12-17T16:08:45.591Z",
  "refresh": "3382592c-5c0c-4412-8389-44c9ecfde700"
}`}
    </pre>

    <p>This is now the <pre>Bearer token</pre> or <pre>Access token</pre> that your App will use to issue request against the <pre>STET AISP Sandbox API</pre> endpoints that are to be used on behalf of a <pre>PSU</pre>.</p>
  </div>
)

export default StetAISP
