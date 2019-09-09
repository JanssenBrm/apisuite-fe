import React from 'react'

const ProductionEndpoints = () => (
  <div className='topic-container'>
    <h2 className='headline'>Accessing Production Endpoints</h2>
    <h4>PSD2 APIs</h4>
    <p><strong>This section provides details on how to access PSD2 APIs from BNP Paribas Fortis in production
      environment.
    </strong>
    </p>
    <p><strong>The currently tested and available APIs are accessible from the following urls: </strong></p>
    <table>
      <thead>
        <tr>
          <th>Brand</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>BNP Paribas Fortis</code></td>
          <td>
            <a
              target='_blank'
              href='https://regulatory.api.bnpparibasfortis.be/token'
            >https://regulatory.api.bnpparibasfortis.be
            </a>
          </td>
        </tr>
        <tr>
          <td><code>Hello Bank</code></td>
          <td>
            <a
              target='_blank'
              href='https://regulatory.api.hellobank.be/token'
            >https://regulatory.api.hellobank.be
            </a>
          </td>
        </tr>
        <tr>
          <td><code>Fintro</code></td>
          <td><a target='_blank' href='https://regulatory.api.fintro.be/token'>https://regulatory.api.fintro.be</a>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <p>As with the sandbox, you first need to be onboarded as a third party, This is done via the onboarding endpoint,
      using your <pre>QWAC</pre> certificate (see documentation in «Onboarding Flow» for details):
    </p>
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
          <td><code>POST</code></td>
          <td>/v1/third-party</td>
          <td>N/A</td>
        </tr>
      </tbody>
    </table>
    <br />
    <p>You then need to retrieve a valid <pre>access token</pre>. This is again similar to the sandbox implementation
      and can be
      done via the following endpoint:
    </p>
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
          <td><code>POST</code></td>
          <td>/token</td>
          <td>N/A</td>
        </tr>
      </tbody>
    </table>
    <br />
    <p>As with the sandbox, to get an AIS token you need an <pr>authorization code</pr> first. This code is received at
      the end
      of the consent flow (see «AISP - Authorizing an app» in STET Endpoints documentation). This flow is triggered by
      redirecting the PSU to the following urls, depending on the brand of which he is customer :
    </p>
    <table>
      <thead>
        <tr>
          <th>Brand</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>BNP Paribas Fortis</code></td>
          <td>
            <a
              target='_blank'
              href={'https://services.bnpparibasfortis.be/SEPLJ04/sps/oauth/oauth20/authorize?client_id={TPP_CLIENT_ID}&scope=aisp&response_type=code&state={TPP_STATE}&redirect_uri={TPP_REDIRECT_URL}'}
            >https://services.bnpparibasfortis.be/SEPLJ04/sps/oauth/oauth20/authorize?client_id={'{TPP_CLIENT_ID}'}&scope=aisp&response_type=code&state={'{TPP_STATE}'}&redirect_uri={'{TPP_REDIRECT_URL}'}
            </a>
          </td>
        </tr>
        <tr>
          <td><code>Hello Bank</code></td>
          <td>
            <a
              target='_blank'
              href={'https://services.hellobank.be/SEPLJ04/sps/oauth/oauth20/authorize?client_id={TPP_CLIENT_ID}&scope=aisp&response_type=code&state={TPP_STATE}&redirect_uri={TPP_REDIRECT_URL}'}
            >https://services.hellobank.be/SEPLJ04/sps/oauth/oauth20/authorize?client_id={'{TPP_CLIENT_ID}'}&scope=aisp&response_type=code&state={'{TPP_STATE}'}&redirect_uri={'{TPP_REDIRECT_URL}'}
            </a>
          </td>
        </tr>
        <tr>
          <td><code>Fintro</code></td>
          <td>
            <a
              target='_blank'
              href={'https://services.fintro.be/SEPLJ04/sps/oauth/oauth20/authorize?client_id={TPP_CLIENT_ID}&scope=aisp&response_type=code&state={TPP_STATE}&redirect_uri={TPP_REDIRECT_URL}'}
            >https://services.fintro.be/SEPLJ04/sps/oauth/oauth20/authorize?client_id={'{TPP_CLIENT_ID}'}&scope=aisp&response_type=code&state={'{TPP_STATE}'}&redirect_uri={'{TPP_REDIRECT_URL}'}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <p>The Third party has to provide his own values for the following parameters:</p>
    <ul>
      <li>
        <pre>ClientId</pre>
        => the one received during the onboarding (in the response of the onboarding endpoint)
      </li>
      <li>
        <pre>State</pre>
        => unique identifier for the request created by the third party
      </li>
      <li>
        <pre>Redirection URI</pre>
        => the redirection url / uri which will be used by the third party to receive the
        authorization code
      </li>
    </ul>
    <br />
    <p>
      Finally, with a valid token you are able to access the STET endpoints in production. The list of
      endpoints and their availability status can be found below.
    </p>
    <table>
      <thead>
        <tr>
          <th>Method</th>
          <th>Endpoint</th>
          <th>Access token grant type</th>
          <th>Availability status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>GET</code></td>
          <td>/v1/accounts</td>
          <td>authorization_code</td>
          <td><strong>LIVE</strong></td>
        </tr>
        <tr>
          <td><code>GET</code></td>
          <td>/v1/accounts/{'{accountResourceId}'}/balances</td>
          <td>authorization_code</td>
          <td><strong>LIVE</strong></td>
        </tr>
        <tr>
          <td><code>GET</code></td>
          <td>/v1/accounts/{'{accountResourceId}/transactions'}/transactions</td>
          <td>authorization_code</td>
          <td><strong>LIVE</strong></td>
        </tr>
        <tr>
          <td><code>POST</code></td>
          <td>/v1/funds-confirmations</td>
          <td>authorization_code</td>
          <td><strong>Upcoming</strong></td>
        </tr>
        <tr>
          <td><code>POST</code></td>
          <td>/v1/payment-requests</td>
          <td>client_credentials</td>
          <td><strong>LIVE</strong></td>
        </tr>
        <tr>
          <td><code>GET</code></td>
          <td>/v1/payment-requests/{'{paymentRequestResourceId}'}</td>
          <td>client_credentials</td>
          <td><strong>LIVE</strong></td>
        </tr>
      </tbody>
    </table>
    <br />
    <h4>Client facing interfaces</h4>
    <p>In case the dedicated PSD2 APIs you wish to consume are not yet available, we offer connectivity to a contingency mechanism. This is only made available to third party service providers which are authorized or registered with a national competent authority, or are in the process of being authorized or registered.</p>
    <p>For the “Contingency Mechanism” we offer the reuse of our client facing interfaces. Depending on the brand / user segment you wish to access, the following URL’s should be used. </p>
    <table>
      <thead>
        <tr>
          <th>Retail segment</th>
          <th>Corporate segment</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href='https://tpp.bnpparibasfortis.be/'>https://tpp.bnpparibasfortis.be</a> </td>
          <td><a href='https://tpp.business.bnpparibasfortis.be/'>https://tpp.business.bnpparibasfortis.be</a> </td>
        </tr>
        <tr>
          <td><a href='https://tpp.hellobank.be/'>https://tpp.hellobank.be</a> </td>
        </tr>
        <tr>
          <td><a href='https://tpp.fintro.be/'>https://tpp.fintro.be</a> </td>
        </tr>
      </tbody>
    </table>
    <p>To allow a two factors authentication, we propose mutual TLS authentications (MTLS). Similar to the “dedicated interface” you will be authenticated by your QWAC client certificate. Upon successful presentation of a valid QWAC certificate, you will be redirected to the correct client facing interface.</p>
  </div>
)

export default ProductionEndpoints
