import React from 'react'
import { FormattedMessage } from 'react-intl'
import authTabImg from 'assets/docs/docs_auth_tab.png'
import accessTokenImg from 'assets/docs/docs_access_token_form.png'
import authImg from 'assets/docs/docs_auth_form.png'

const Topic = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      <FormattedMessage id='navigation.docs.payments.title' />
    </h2>
    <p>
      A payment must be done in two steps: first a payment initiation, then a payment submission (i.e. payment confirmation)
    </p>

    <h4 className='headline'>
      Payment initiation
    </h4>
    <p>
      <ol>
        <li>Create Payment Initiation</li>
        <p>
          The payment must first be initiated by the third party application (on user request, typically by clicking a payment button). This is done with via a POST request to the /payments service.
        </p>
        <p>
          The payment initiation must include all payment information at this stage already (debtor & creditor account, amount, currency, remittance information, ...).
        </p>
        <p>
          In order to do this, the request must include the access token issued to the application (that is available in app view). If you don't use the API console and your build the request yourself then this token is added to the request as a header named Authorization which value starts with Bearer.
        </p>
        <p>
          Here is an example of access token value using the correct format:
          <pre className='big'>
            Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib2F1dGgyLXJlc291cmNlIl0sInNjb3BlIjpbInNlcnZlciIsInBheW1lbnRzIiwicHJvZmlsZXMiLCJhY2NvdW50cyIsInBheW1lbnQtc3VibWlzc2lvbnMiXSwiZXhwIjozNjc3MDYyNTE5LCJhdXRob3JpdGllcyI6WyJST0xFX1RSVVNURURfQ0xJRU5UIiwiUk9MRV9DTElFTlQiXSwianRpIjoiMDI2NzYyMjEtMTFiZi00Njc2LTg3MzgtODhmNDFmNzM2YThmIiwiY2xpZW50X2lkIjoiWlM4VVJ0YXNOYWVSbEVJSnpERlYifQ.nf-moJjDs6_-RqljkYcPL-7R83V_z_kcClr6g7Gr_zZVUUhK0ilVXkKeY8JgTbrwTbUdGbuRmSYUWk4AFQZQm2g4fFEPW-zKuJ6MR-Qar_gyeHc_5ht1SG-p-EemgvnJgptsR3r9oEgFf9y60NiNohN_u-kLjGYjvLHzAM21H-U
          </pre>
        </p>

        <p>
          And here is an example of payment initiation request:
          <pre className='big'>
            {`
            {
              "Data": {
                "Initiation": {
                  "InstructionIdentification": "ANSM023",
                  "EndToEndIdentification": "FRESCO.21302.GFX.37",
                  "InstructedAmount": {
                    "Amount": "20.00",
                    "Currency": "EUR"
                  },
                  "DebtorAccount": {
                    "SchemeName": "IBAN",
                    "Identification": "BE88298508009442",
                    "Name": "Arnold Dickens"
                  },
                  "CreditorAccount": {
                    "SchemeName": "IBAN",
                    "Identification": "BE15677378583472",
                    "Name": "Freda Crooks"
                  },
                  "RemittanceInformation": {
                    "Reference": "FRESCO-037",
                    "Unstructured": "Internal ops code 5120103"
                  }
                }
              },
              "Risk": {
                "PaymentContextCode": "PersonToPerson"
              }
            }`}
          </pre>
        </p>

        <li>Get Payment</li>
        <p>
          It is possible to retrieve a single payment initiation that was requested by the third party itself, to check the status notably. A GET request to <pre>/payments/{'{id}'}</pre> with a valid <pre>{'{id}'}</pre> will return the whole payment initiation.
        </p>
      </ol>
    </p>

    <h4 className='headline'>
      Payment submission
    </h4>
    <p>
      <ol>
        <li>Obtain user consent & authorization code</li>
        <p>
          In order to confirm the payment the end user must give his explicit consent. For this reason a different access token must be requested with the Authorization code grant type. This grant type should be familiar if you ever logged in a website/application using your Facebook or Google account: the user will be redirected to a window in which he will authorize the third party application to access the required information. In our case, this means logging in with his bank account (i.e. with the sandbox username and password that were provided when the test data was created) and authorizing the portal-created application to submit payments on his behalf.
        </p>
        <p>
        Concretely, a GET request must be sent to the /oauth/authorize endpoint with the correct parameters (in the url):
          <ul className='light'>
            <li><pre>response_type:</pre> Must be set to authorization_code</li>
            <li><pre>client_id:</pre> the unique client id of the app (accessible in App view)</li>
            <li><pre>redirect_uri:</pre> the Redirect URI/URL registered in the app (to which the access token will be sent); if more than one redirectUri has been picked then it must be specified here which one will be used</li>
            <li><pre>response_mode:</pre> Can be query if you want the authorization code to be provided as a query string parameter on your redirectUri, or form_post if </li>
          </ul>
        </p>
        <p>
          This request should look like the following example:
        </p>
        <pre className='big'>
          {`
            GET /oauth/authorize?
                  response_type=code&
                  client_id=<APP_CLIENT_ID>&
                  redirect_uri=<APP_REDIRECT_URL>
                  
            host: http://services.innofactory.io:30005
            content-type: application/x-www-form-urlencoded
            `}
        </pre>
        <p>
          An alternative to the above if you don't want to implement the customer authentication in your app yet is to use Postman as a client: https://www.getpostman.com/
        </p>
        <p>
          You can trigger the same authentication flow from Postman by going in Authentication tab, picking the OAuth 2.0 type on the left and clicking on Get New Access Token on the right.
        </p>
        <img src={authTabImg} />
        <p>
          A new Postman window will then be opened where you can pick the grant type of the access token and provide the necessary OAuth parameters. To have a valid token for payment submissions you will need to use the following parameters (you don't need the redirectUrl in this scenario):
        </p>
        <img src={accessTokenImg} />
        <p>
          No matter which method you chose, this will trigger the authentication flow, and a new window will be opened in which the user credentials must be provided.
        </p>
        <img src={authImg} />
        <p>
          The username must be the customerId, which can be found in the user section of the Test Data tab, and the password is the password registered in that same tab. If the authentication is successful, then an authorization code is returned to the indicated redirectUri (parameter code). If you used Postman then it will immediately exchange the code against a permanent access token, so you can simply copy / paste that one instead and use it for your payment submission request.
        </p>

        <li>Exchange authorization code for an access token</li>
        <p>
          Once the authorization code has been received a POST request must be sent to the /oauth/token endpoint with the following parameters:
          <ul>
            <li><pre>grant_type:</pre> Authorization code grant</li>
            <li><pre>client_id</pre> the unique client id of the app (accessible in App view)</li>
            <li><pre>code:</pre> the authorization code returned at the end of the authentication step</li>
          </ul>
        </p>
        <p>
          The request must also include an authorization header whose value is a Base64 hash of $CLIENT_ID:$CLIENT_SECRET (concatenated string of client_id & client_secret separated by a colon). If you are using Javascript for instance you can use the btoa() function to convert to Base64.
        </p>
        <p>
          Here is an example of such a call:
          <pre className='big'>
            Request:
            <br /><br />

            POST /oauth/token<br />
            content-type: application/x-www-form-urlencoded<br />
            authorization: Basic ZkdxRjBBOWxJb3BrWE5RejFxWnk6RmhzOTlpekpkemFycDRBQUl1Q3BkSXpLNzFHWkhkSHY1TGlsYWhlTg==
            user-agent: PostmanRuntime/7.1.5<br />
            accept: */*<br />
            host: services.innofactory.io:30005<br />
            accept-encoding: gzip, deflate<br />
            content-length: 127<br />
            grant_type=authorization_code<br />
            code=6sYVAN<br />
            redirect_uri=http://localhost:9001/auth.html<br />
            client_id=fGqF0A9lIopkXNQz1qZy<br />
            HTTP/1.1 200<br />
            status: 200<br />
            server: Apache-Coyote/1.1<br />
            x-content-type-options: nosniff<br />
            x-xss-protection: 1; mode=block<br />
            cache-control: no-cache, no-store, max-age=0, must-revalidate,no-store<br />
            pragma: no-cache,no-cache<br />
            expires: 0<br />
            x-frame-options: DENY<br />
            content-type: application/json;charset=UTF-8<br />
            transfer-encoding: chunked<br />
            date: Mon, 25 Jun 2018 08:34:31 GMT<br />
            <br /><br />

            Response:
            <br /><br />

            {'{"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib2F1dGgyLXJlc291cmNlIl0sInVzZXJfbmFtZSI6IjIwNTI1MDIyMDgiLCJzY29wZSI6WyJzZXJ2ZXIiLCJwYXltZW50cyIsInByb2ZpbGVzIiwiYWNjb3VudHMiLCJ0cmFuc2FjdGlvbnMiLCJwYXltZW50LXN1Ym1pc3Npb25zIl0sImV4cCI6MzY3NzM5OTMxOCwiYXV0aG9yaXRpZXMiOlsiVVNFUiIsIlJPTEVfQ0xJRU5UIl0sImp0aSI6ImU0NmVmOWEyLTIwZjAtNDkxNC1iNDhiLTZjZjJjMDAyNmVjMyIsImNsaWVudF9pZCI6ImZHcUYwQTlsSW9wa1hOUXoxcVp5In0.j8BmzwwLgU1DEKchZU-awafXzBdJvow1mbCmDKvDTgq6B9hxGiD7pYGtAZEt46nqYV3CD9QjXbsW63gk4KJ5DkrvQm6Z8nZOSdl-EquPaf8uTFGYRmTn26xPEmFsDaTcee3H9rn0d0_mq6fqTmgz1vR4OVUb9Ut09ayk2fnqyV8","token_type":"bearer","expires_in":2147483646,"scope":"server payments profiles accounts transactions payment-submissions","jti":"e46ef9a2-20f0-4914-b48b-6cf2c0026ec3"}'}
          </pre>

          <p>
            You don't need to follow this step if you retrieve the authorization code by using Postman (Postman handles it for you and gives you an access token immediately).
          </p>
        </p>

        <li>Create Payment Submission</li>
        <p>
          Once the new access token with the correct grant type has been received, the third party application can make a POST request to the /payment-submissions service using this access token (again, in a header named Authorization). The request must include the payment id as well as the complete payment initiation (this acts as a confirmation of the input data).
        </p>
        <p>
          A valid payment submission request should thus have the following format:

          <pre className='big'>
            {`
            {
              "Data": {
                "PaymentId": "2",
                "Initiation": {
                  "InstructionIdentification": "ANSM023",
                  "EndToEndIdentification": "FRESCO.21302.GFX.37",
                  "InstructedAmount": {
                    "Amount": "20.00",
                    "Currency": "EUR"
                  },
                  "DebtorAccount": {
                            "SchemeName": "IBAN",
                            "Identification": "BE88298508009442",
                            "Name": "Arnold Dickens"
                        },
                        "CreditorAccount": {
                            "SchemeName": "IBAN",
                            "Identification": "BE15677378583472",
                            "Name": "Freda Crooks"
                        },
                  "RemittanceInformation": {
                    "Reference": "FRESCO-037",
                    "Unstructured": "Internal ops code 5120103"
                  }
                }
              },
              "Risk": {
                "PaymentContextCode": "PersonToPerson"
              }
            }`}
          </pre>
          The payment will then eventually be processed.
        </p>

        <li>Get Payment Submission</li>
        It is possible to retrieve a single payment submission that was requested by the third party itself, to check the status notably. A GET request to /payment-submissions with a valid id will return the whole payment submission.
      </ol>
    </p>
  </div>
)

export default Topic
