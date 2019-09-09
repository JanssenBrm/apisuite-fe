import React from 'react'
import { FormattedMessage } from 'react-intl'
import onboardingtoken from 'assets/docs/ob_flow_onboarding_token.png'

const OnboardingFlowEndpoint = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      <FormattedMessage id='navigation.docs.onboardingflowendpoint.title' />
    </h2>
    <p>
      <b>Disclaimer :</b> in Production you will only be authorized to onboard one client application with one QWAC
      certificate. In the sandbox you won't have this restriction (you can create as many apps as you want and use the
      same certificate). This also means that in Production you have to do the onboarding once for all the brands.
    </p>
    <p>
      Once the certificate has been uploaded to your API client, our API gateway still has to receive it in order to
      establish TLS-Mutual Authentication (otherwise all your API requests will be rejected).
    </p>
    <p>
      This is done via the Onboarding endpoint. This endpoint will create an app for you and upload your certificate on
      our system. This means you have to call this endpoint before you can use any of the other APIs. You also have to
      call this endpoint before you create an app on the portal (it will fail if you already have an app).
    </p>
    <p>
      <br />
    </p>
    <ul>
      <li><span>Access token</span></li>
    </ul>
    <p>
      <br />
    </p>
    <p>
      In the sandbox, an access token is required in order to prove that you are a company registered on the developer
      portal. The access token can be obtained directly from the portal in the "Organisation" tab of your profile :
      click on the profile icon on top right of the screen, then click on "Organisation" and on the bottom of the screen
      you should have an Sandbox onboarding token that looks like this:
    </p>
    <img src={onboardingtoken} alt='onboarding token' />
    <br />
    <p>
      Again, note that this token <b>is not used in production</b> (the QWAC certificate will be enough to identify your
      company)
    </p>
    <ul>
      <li><span>Accessing the endpoint</span></li>
    </ul>
    <p>
      Endpoint will be secured by way of Mutual Authentication over TLS. The JWS representation of the request body
      should be provided as a custom header. The endpoint can be accessed at the following urls for each environment:
    </p>
    <table>
      <thead>
        <tr>
          <th>Production</th>
          <th>Sandbox</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a
            href='https://regulatory.api.bnpparibasfortis.be/third-party-onboarding/v1/third-party'
          >https://regulatory.api.bnpparibasfortis.be/third-party-onboarding/v1/third-party
          </a>
          </td>
          <td><a
            href='https://sandbox.middleware.bnpparibasfortis.com/third-party'
          >https://sandbox.middleware.bnpparibasfortis.com/third-party
          </a>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <p>
      You have to use the access token obtained at the previous step as a bearer token (header Authorization) and you
      need to provide a certificate along the request as mentioned in the previous section. You will also need to
      provide a few parameters in the request body, including contact info from your company and information of your
      app. Note that this call will create a new app for your organisation anyway so you don’t need to create your app
      on the portal beforehand. If you have created an app beforehand the request will fail so delete your app from the
      portal if you already have one but you are not onboarded yet. The created app will be accessible via the portal in
      the app overview just like any other app you would have created yourself.
    </p>
    <br />
    <ul>
      <li>Headers</li>
    </ul>
    <table>
      <colgroup>
        <col />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <td>
            <p><strong>Header Name</strong></p>
          </td>
          <td>
            <p><strong>Description</strong></p>
          </td>
        </tr>
        <tr>
          <td>
            Authorization
          </td>
          <td>This mandatory header is the Access token retrieved at previous step</td>
        </tr>
        <tr>
          <td>
            Request-ID
          </td>
          <td>The request id provided by the TPP</td>
        </tr>
        <tr>
          <td>
            x-jws-signature
          </td>
          <td>
            <p>This header is expected as a JWT which is structured as a JWS. This JWT should contain the JWS
              representation of the information that is provided in the body of the request.
            </p>
            <p><b>Note :</b> in the sandbox this value is not checked, so any string can be provided. In production it
              has to be a valid JWS signature however; please refer to section Production > Message Signature for API
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      <br />
    </p>
    <ul>
      <li>Onboarding info (Request Body)</li>
    </ul>
    <p>
      <br />
    </p>
    <table>
      <thead>
        <tr>
          <th>Parameter Name</th>
          <th />
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>clientName</td>
          <td />
          <td>
            String
            <br />
            Min-length:1
            <br />
            Max-length:50
          </td>
          <td>Name of the application to be created by the TPP</td>
        </tr>
        <tr>
          <td>clientDescription</td>
          <td />
          <td>
            String
            <br />
            Min-length:1
            <br />
            Max-length:250
          </td>
          <td>Description of the client/application of the TPP</td>
        </tr>
        <tr>
          <td>clientVersion</td>
          <td />
          <td>
            String
            <br />
            Min-length:1
            <br />
            Max-length:10
          </td>
          <td>(Optional) Registered version number of the client/application of the TPP</td>
        </tr>
        <tr>
          <td>uri</td>
          <td />
          <td>
            String
            <br />
            Min-length:1
            <br />
            Max-length:256
          </td>
          <td>Domain name of registered client/application</td>
        </tr>
        <tr>
          <td>redirectUris</td>
          <td />
          <td>
            String
            <br />
            Min-length:1
            <br />
            Max-length:256
          </td>
          <td>The redirect_uris for the app to be created, used for the OAuth2 Authorization code grant flow</td>
        </tr>
        <tr>
          <td>tppContacts</td>
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td><em>phone</em></td>
          <td><code>{'pattern: ^[0-9]{1,15}$'}</code></td>
          <td>(Optional) Phone number linked to TPP (for the sandbox this is fixed to the phone number of the user who
            created the company in the developer portal)
          </td>
        </tr>
        <tr>
          <td />
          <td><em>email</em></td>
          <td>
            String
            <br />
            Min-length:1
            <br />
            Max-length:256
          </td>
          <td>
            (Optional) Email linked to TPP (for the sandbox this is fixed to the email of the user who created the
            company in the developer portal)
          </td>
        </tr>
        <tr>
          <td />
          <td><em>website</em></td>
          <td>
            String
            <br />
            Min-length:1
            <br />
            Max-length:256
          </td>
          <td>
            (Optional) Website linked to TPP
          </td>
        </tr>
        <tr>
          <td>clientContacts</td>
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td>contactType</td>
          <td>
            String
            <br />
            Enum:
            <br />
            Admin, Developer, Business, Operational
          </td>
          <td>The type of contact (TP Admin, Developer, Business, Operational, ...) linked to the client/application of
            the TPP.
          </td>
        </tr>
        <tr>
          <td />
          <td>firstName</td>
          <td>
            String
            <br />
            <code>pattern:{' [A-Za-z0-9âäàáãåçñ&éêëèíîïìßÂÄÀÁÃÅÇÑÉÊËÈÍÎÏÌýµÝôöòóõûüùúÿÔÖÒÓÕÛÜÙÚ*\'\\s+-.]{1,40}'}</code>
          </td>
          <td>The first name of the contact person linked to the client/application of the TPP</td>
        </tr>
        <tr>
          <td />
          <td>lastName</td>
          <td>
            String
            <br />
            <code>pattern:{' [A-Za-z0-9âäàáãåçñ&éêëèíîïìßÂÄÀÁÃÅÇÑÉÊËÈÍÎÏÌýµÝôöòóõûüùúÿÔÖÒÓÕÛÜÙÚ*\'\\s+-.]{1,60}'}</code>
          </td>
          <td>The last name of the contact person linked to the client/application of the TPP</td>
        </tr>
        <tr>
          <td />
          <td><em>email</em></td>
          <td>
            String
            <br />
            Min-length:1
            <br />
            Max-length:256
          </td>
          <td>(Optional) The email of the contact person linked to the client/application of the TPP</td>
        </tr>
        <tr>
          <td />
          <td><em>phone</em></td>
          <td>
            <code>{'pattern: ^[0-9]{1,15}$'}</code>
          </td>
          <td>(Optional) The phone number of the contact person linked to the client/application of the TPP</td>
        </tr>
      </tbody>
    </table>
    <br />
    <ul>
      <li>
        Example request & response
      </li>
    </ul>
    <pre className='overit'>{`curl -X POST \\
  https://sandbox.middleware.bnpparibasfortis.com/third-party \\
  -H 'Authorization: Bearer 39090895-16b5-4d10-b689-26d7379c098b' \\
  -H 'Content-Type: application/json' \\
  -H 'Request-ID: 123456' \\
  -H 'x-jws-signature: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnROYW1lIjoiYXBwbGljYXRpb24iLCJjbGllbnREZXNjcmlwdGlvbiI6InRoaXMgYXBwbGljYXRpb24gaXMgdXNlZCB0byBkbyBhIHBheW1lbnQiLCJjbGllbnRWZXJzaW9uIjoidjEuMCIsInVyaSI6Imh0dHBzOi8vd3d3LmdldHBvc3RtYW4uY29tL29hdXRoMiIsInJlZGlyZWN0VXJpIjoiaHR0cHM6Ly93d3cuZ2V0cG9zdG1hbi5jb20vb2F1dGgyL2NhbGxiYWNrIiwiY2xpZW50Q29udGFjdHMiOnsiY29udGFjdFR5cGUiOiJBZG1pbiIsImZpcnN0TmFtZSI6InRlc3QiLCJsYXN0TmFtZSI6InRlc3QgdGVzdCIsIm1haWwiOiIiLCJwaG9uZSI6IiJ9LCJ0cHBDb250YWN0cyI6eyJwaG9uZSI6IiIsImVtYWlsIjoidGVzdEB0ZXN0aW5nQGJucHBwYXJpYmFzZm9ydGlzLmNvbSIsIndlYnNpdGUiOiIifSwianRpIjoiYmY1NWViYzQtYzBlMi00Zjg5LTg1NDEtMDQ5ZTA4OWM3ODY2IiwiaWF0IjoxNTU2MjcyNzU4LCJleHAiOjE1NTYyODM0MTh9.ffGqLIVxeMY0YW0k53rsseR3N-bnaKiKvH2IiRDyvLc' \\
  -d '{
  "clientName": "appName",
  "clientDescription": "Description for the TPP app to be created",
  "clientVersion": "1",
  "redirectUris": ["http://www.zagrebspecialchar.com"],
  "uri": "https://tpp.gsrgfghfhdsgr.be",
  "clientContacts": {
    "contactType": "Admin",
    "firstName": "firstName1",
    "lastName": "lastName1",
    "email": "firstname1.lastname1@mydomain.be",
    "phone": "02323252152"
  },
  "tppContacts": {
    "phone": "112233445",
    "email": "bartzagrebspecialchar@tppdomain.con",
    "website": "www.barthferetrgs.com"
  }
}'`}
    </pre>
    <br />
    <ul>
      <li>
        Response example
      </li>
    </ul>
    <pre>
      {`{
    "grantedRoles": [
        "pisp",
        "aisp"
    ],
    "clientSecretExpiresAt": 0,
    "ClientIdIssuedAt": 1565712924549,
    "clientId": "YOUR CLIENT ID GENERATED",
    "clientSecret": "YOUR SECRET ID GENERATED"
}`}
    </pre>
  </div>
)

export default OnboardingFlowEndpoint
