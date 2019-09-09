import React from 'react'

const SignatureAuthenticationScheme = () => (
  <div className='topic-container'>
    <h2 className='headline'>Message Signature for API</h2>
    <p><strong>
      The goal of this section is to explain how API message signature will be validated in production environment (this
      section is irrelevant for sandbox environment).
      It also aims to provide TPPs with a way of understanding how to generate the signature for their API calls.
    </strong>
    </p>
    <h4>1) Generating the JWS signature (Onboarding endpoint)</h4>
    <div className='margin-container'>
      <h5>1. Create the JOSE protected header</h5>
      <div className='margin-container'>
        <p>The first part of the token will be the header. The header typically includes the type of the token and the
          signing algorithm being used.
          Here, the JOSE header must also contain the claims, which are the statements about the entity (for example,
          the
          user) and additional data.
          The claims supported by BNP Paribas Fortis can be found below:
        </p><br />
        <table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>description</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>alg</code></td>
              <td className='large-td'><code>Forced by protocol
                Algorithm used to encrypt
              </code>
              </td>
              <td><code>PS256 <br />
                Prefered – if not possible RS256 is tolerate
              </code>
              </td>
            </tr>
            <tr>
              <td><code>typ</code></td>
              <td><code>Forced by protocol
                Type of JWS Header – hardcoded based on choice made by BNPPF
              </code>
              </td>
              <td><code>JOSE <br /></code></td>
            </tr>
            <tr>
              <td><code>crit</code></td>
              <td><code>Recommended by protocol
                Critical criteria (claims) that must be consider while computing the signature
                BNPPF impose a set of claims to be present
              </code>
              </td>
              <td><code>"x5u, url, aud, txn, iat, exp, digest "</code></td>
            </tr>
            <tr>
              <td><code>x5u</code></td>
              <td><code>Requested by BNPPF
                Publically accessible uri of the public part (PEM) of the certificate used to sign the message
              </code>
              </td>
              <td><code>Valid URI to PEM file exposed by TP</code></td>
            </tr>
            <tr>
              <td><code>url</code></td>
              <td><code>Requested by BNPPF
                Allow the support of signature for message without body
                Corresponds to requested path and method
              </code>
              </td>
              <td><code>VERB (in lowercase) + SPACE + requested path without domain and protocol eg: /foo
              </code>
              </td>
            </tr>
            <tr>
              <td><code>aud</code></td>
              <td><code>Requested by BNPPF
                Audience. Targeted endpoint.
              </code>
              </td>
              <td><code>Target Host <br />
                When contacting BNPPF :<br />
                <table>
                  <tbody>
                    <tr>
                      <td><code>Fortis – Partners</code></td>
                      <td>api.bnpparibasfortis.be</td>
                    </tr>
                    <tr>
                      <td><code>Hello - Partners</code></td>
                      <td>api.hellobank.be</td>
                    </tr>
                    <tr>
                      <td><code>Fintro - Partners</code></td>
                      <td>api.fintro.be</td>
                    </tr>
                    <tr>
                      <td><code>Fortis – Regulatory</code></td>
                      <td>regulatory.api.bnpparibasfortis.be</td>
                    </tr>
                    <tr>
                      <td><code>Hello - Regulatory</code></td>
                      <td>regulatory.api.hellobank.be</td>
                    </tr>
                    <tr>
                      <td><code>Fintro - Regulatory</code></td>
                      <td>regulatory.api.fintro.be</td>
                    </tr>
                  </tbody>
                </table>
              </code>
              </td>
            </tr>
            <tr>
              <td><code>txn</code></td>
              <td><code>Requested by BNPPF
                Unique Identifier of the transaction
              </code>
              </td>
              <td><code>use the same value as the X-Request-Id http header</code></td>
            </tr>
            <tr>
              <td><code>iat</code></td>
              <td><code>Requested by BNPPF <br />
                timestamp of generation of the signature – <br />
                format <a className='color-word-blue' target='_blank' href=''>NumericDate</a>
              </code>
              </td>
              <td><code>@Now translated in <p className='color-word-red'>NumericDate</p>
              </code>
              </td>
            </tr>
            <tr>
              <td><code>exp</code></td>
              <td><code>Requested by BNPPF <br />
                timestamp of generation of the signature + few seconds :
                up to when the signature is considered by TP as usable – <br />
                format <a className='color-word-blue' target='_blank' href=''>NumericDate</a>
              </code>
              </td>
              <td><code>@Now + set of seconds translated in <br />
                <p className='color-word-red'>NumericDate Max 30 seconds</p>
              </code>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <p>Example value of the JOSE header (the values highlighted in yellow need to be changed by the third
          party):
        </p>
        <div className='bordered'><code>
          {'{ "alg":"PS256", "typ":"JOSE", "crit":"x5u, url, aud, txn, iat, exp, digest ", "x5u":"https://tpp.domain.com/certificates/signature.pem", "url":"get /foo", "aud" : "api.bnpparibasfortis.be", "txn" : "c09059f6-af3b-4ef0-ad32-82c0eacb82d8",  "iat":1449282920, "exp": 1449286520 }'}
        </code>
        </div>
        <p><strong>
          Important remark : Preferred algorithm is PS256 --otherwise RS256-- only those 2 are acceptable by BNP Paribas
          Fortis
        </strong>
        </p>
      </div>
      <h4>2. Build payload</h4>
      <p className='margin-container'> You will also need the payload to construct the signature. For API calls this
        will be the body of the http
        request.
      </p>
      <h4> 3. Compute signature input</h4>
      <div className='margin-container'>
        <p> Before creating the signature you need to encode both the JOSE header and the
          payload into Base 64.
          Concatenate both results in ASCII separated by a dot to compute the signature input.
        </p>
        <div className='bordered'><code>
          signatureInput = ASCII (Base64UrlEncode(header) + '.' + Base64UrlEncode(payload))
        </code>
        </div>
      </div>
      <h4>4. Generate signature based on signature input</h4>
      <div className='margin-container'>
        <p> Create the signature by applying the wanted algorithm based on TP signature key on the signature input
          (result
          of step 3).
        </p>
        <div className='bordered'><code>signature = Sign(algorithm, signatureInput, tpSecret)</code></div>
        <p>The result must also be encoded in Base64. </p>
      </div>
      <h4>5. Create JWS compact detached serialization</h4>
      <div className='margin-container'>
        <p> The output is three Base64-URL strings separated by dots that can
          be easily passed in HTML and HTTP environments (see example below):
        </p>
        <div className='bordered'><code>
          WS = Base64UrlEncode(UTF8(header)||'.'||'.'|| Base64UrlEncode(signature))
        </code>
        </div>
      </div>
      <h4>6. Place JWS signature in http message</h4>
      <div className='margin-container'>
        <p> Finally, the signature has to be added to the http request; it will be placed in a new http header:</p>
        <div className='bordered'><code>
          x-jws-signature: {'<JWS signature value generated in previous step>'}
        </code>
        </div>
        <br />
      </div>
    </div>
    <h3> 2) Generating the message signature (PSD2 APIs)</h3>
    <div className='margin-container'>
      <h4>1. Create Digest header</h4>
      <div className='margin-container'>
        <p>The digest consists in the SHA-256 hash of the request body. It must be placed
          in
          a http header called
          "Digest"
        </p>
        <div className='bordered'><code>
          Digest: "SHA-256="+ SHA256(Body)
        </code>
        </div>
      </div>
      <h4>2. Signature parameters</h4>
      <div className='margin-container'>
        <p>Values for "signature parameters" can be :</p>
        <ul>
          <li> Retrieved from the body</li>
          <li> Retrieved from the http headers</li>
          <li> Computed</li>
        </ul>
        <p>It's important to note that BNP Paribas Fortis implementation deviates from the generic STET documentation
          about
          signature.<br />
          Please refer to the list of parameters below:
        </p>
        <table>
          <thead>
            <tr>
              <th>Auth-param name</th>
              <th>description</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>keyId</code></td>
              <td className='large-td'><code>Forced by protocol<br />
                But BNPPF requires that it contains a publically accessible uri of the public certificate (PEM) of the
                certificate used to sign the message
              </code>
              </td>
              <td><code>Eg: https://tpp.domain.com/certificates/signature.pem </code></td>
            </tr>
            <tr>
              <td><code>algorithm</code></td>
              <td><code>Forced by protocol
                Algorithm used to encrypt
              </code>
              </td>
              <td><code>PS256<br />
                Prefered – if not possible RS256 is tolerate
              </code>
              </td>
            </tr>
            <tr>
              <td><code>headers</code></td>
              <td><code>
                Forced by protocol
                Critical criteria (headers) that must be consider while computing the signature
                BNPPF fixes the list based on the elements wanted to ensure the integrity of the message
                <p className='color-word-red'>Order of value in this field is important as it defines the way the
                  signature
                  input will be build
                </p>
              </code>
              </td>
              <td><code>algorithm, headers, (request-target), aud, txn , (created), (expires), digest</code></td>
            </tr>
            <tr>
              <td><code>request-target</code></td>
              <td><code>Recommended and allow support of message without body as far as “headers” is also enforced<br />
                Corresponds to requested path and method
              </code>
              </td>
              <td><code>owercased :method, an ASCII space, and the :path pseudo-headers eg: get
                /foo/Bar/123?code=QSDQSD12
              </code>
              </td>
            </tr>
            <tr>
              <td><code>aud</code></td>
              <td><code>Audience. Targeted endpoint domain name.</code></td>
              <td><code>Targeted endpoint at BNPPF <br />
                Potential values when contacting BNPPF :
                <br />
                <table>
                  <tbody>
                    <tr>
                      <td><code>Fortis – Regulatory</code></td>
                      <td>regulatory.api.bnpparibasfortis.be</td>
                    </tr>
                    <tr>
                      <td><code>Hello - Regulatory</code></td>
                      <td>aregulatory.api.hellobank.be</td>
                    </tr>
                    <tr>
                      <td><code>Fintro - Regulatory</code></td>
                      <td>aregulatory.api.fintro.be</td>
                    </tr>
                  </tbody>
                </table>
              </code>
              </td>
            </tr>
            <tr>
              <td><code>txn</code></td>
              <td><code>Requested by BNPPF <br />
                Unique identifier of the transaction for TP.
              </code>
              </td>
              <td><code>use the same value as the [“X-Request-ID”] http header</code></td>
            </tr>
            <tr>
              <td><code>created</code></td>
              <td><code>Requested by BNPPF <br />
                timestamp of generation of the signature – <br />
                format <a className='color-word-blue' target='_blank' href=''>NumericDate</a>
              </code>
              </td>
              <td><code>@Now translated in NumericDate
              </code>
              </td>
            </tr>
            <tr>
              <td><code>expires</code></td>
              <td><code>Requested by BNPPF <br />
                timestamp of generation of the signature + few seconds : up to when the signature is considered by TP as
                usable – <br />
                format <a className='color-word-blue' target='_blank' href=''>NumericDate</a>
              </code>
              </td>
              <td><code>@Now + set of seconds translated in <br />
                NumericDate <p className='color-word-red'>Max 30 seconds</p>
              </code>
              </td>
            </tr>
            <tr>
              <td><code>digest</code></td>
              <td><code>Requested by BNPPF
                Make the link between signature and body
              </code>
              </td>
              <td><code>Digest computed at [A]</code></td>
            </tr>
            <tr>
              <td><code>signature</code></td>
              <td><code>Forced by protocol <br />
                Contains [F]
              </code>
              </td>
              <td />
            </tr>
          </tbody>
        </table>
        <p><strong> Note : </strong>strong>if there are PSU-* headers in the request (http headers that represent the
          end
          user connected to third party and forwarded
          by third party to the ASPSP), they need to be added to "headers"' signature parameters
        </p>
      </div>
      <h4>3. Integrity string : </h4>
      <div className='margin-container'>
        <p>
          Next you must create the "headers" parameter. This parameter is used to specify the list HTTP headers included
          when generating
          the signature for the message. Note that the order is important (the parameter specifies in which order the
          headers must be concatenated).<br />
          BNP Paribas Fortis defines this "headers" http header as such:
        </p>
        <div className='bordered'><code>
          headers: algorithm, headers, (request-target), aud, txn, (created), (expires), digest
        </code>
        </div>
        <p>The required values for the signature must be concatenated in an input string. Here is to way to compute
          it:
        </p>
        <div className='bordered'><code>
          BASE64 (
          //Create concatenated string :
          FOR each header IN headers
          (
          resultString += LOWERCASE(header name) + “:” + ASCII SPACE
          + TRIM(header value) + ASCII SPACE ) + ‘\n’ )
          )
          * (if multi value for an http header, separate concatenated value with “,”)
        </code>
        </div>
        <p>Example of integrity string:</p>
        <div className='bordered'><code>
          algorithm: PS256 \n
          headers: algorithm, headers, (request-target), aud, txn , (created), (expires), digest \n
          (request-target): get /foo \n
          aud : api.bnpparibasfortis.be \n
          txn : c09059f6-af3b-4ef0-ad32-82c0eacb82d8 \n
          (created): 1449282920 \n
          (expires): 1449286520 \n
          digest: SHA-256=X48E9qOokqqrvdts8nOJRJN3OWDUoyWxBf7kbu9DBPE=
        </code>
        </div>
      </div>
      <h4>4. Compute Signature: </h4>
      <div className='margin-container'>
        <p>
          Create the signature by applying the desired algorithm based on third party signature key on the signature
          input
          (result of "Compute Signature input" step in JWS signature, see "generating JWS signature"). This value will
          become the value of the "signature" parameter:
        </p>
        <div className='bordered'><code>
          hsignature = Base64UrlEncode(Sign(algorithm, thirdPartySignatureKey, integrityString)
        </code>
        </div>
      </div>
      <h4>5. Create Signature http header </h4>
      <div className='margin-container'>
        <p>
          Finally, the resulting signature must be placed in a new http header :
          "Signature". The value of this header should also include the "auth-param" parameters
          (as defined in
          <a
            className='color-word-blue'
            target='_blank'
            href='https://tools.ietf.org/html/rfc7235#section-4.1'
          >RFC 7235, 4.1
          </a>), where the
          "auth-param" meet the BNPPF's requirements.
          Here is how to compute the value to put in the "Signature" header:
        </p>
        <div className='bordered'><code>
          FOR EACH signature_param IN ( keyId, algorithm, headers, (request-target), aud, txn , (created), (expires),
          digest
          , signature )
          ( resultString += LOVERWASE( signature_param name) || “=” || ‘”’ || signature_param value || “,” )
          list of auth-params with names in lowercase , values, separated by “,”
          Attention that request-target will not be part of resulting string !
        </code>
        </div>
        <p>Here is an example of signature header computed this way:</p>
        <div className='bordered'><code>
          {`Signature:keyId:”https://tpp.domain.com/certificates/signature.pem”,algorithm=”PS256”,headers=”algorithm, headers, (request-target), aud,  txn , (created), (expires), digest”,aud=”api.bnpparibasfortis.be”,txn=”c09059f6-af3b-4ef0-ad32-82c0eacb82d8”, created=1449282920 , expires=1449286520,
          digest=”SHA-256=X48E9qOokqqrvdts8nOJRJN3OWDUoyWxBf7kbu9DBPE=”, signature=”<computed signature>”`}
        </code>
        </div>
        <p>Here are the <strong> http headers </strong>strong> that must be present at minimum in the request/reply:
        </p>
        <ul>
          <li> Signature</li>
          <li> Digest</li>
          <li> X-Request-ID</li>
        </ul>
        <p>If there are PSU-* http header present, third party must:</p>
        <ul>
          <li> include them in the "headers" signature parameter (whatever the order)</li>
          <li> include them in the signature parameters (and so in the signature computation)</li>
        </ul>
      </div>
    </div>
    <h3>3) How to validate a signature</h3>
    <div className='margin-container'>
      <h4>1. Validate JWS signature</h4>
      <div className='margin-container'>
        <p>When validating a JWS, the following steps are performed.<br />
          The order of the steps is not significant in cases where there are no dependencies between the inputs and
          outputs of the steps.<br />
          If any of the listed steps fails, then the signature or MAC cannot be validated.
        </p>
        <div className='margin-container'>
          <p>1. Parse the JWS representation to extract the serialized values for the components of the JWS.<br />
            JWS signature must be first split single period ('.')<br />
            When using the JWS Compact “Detached” Serialization, these parts are :<br />
            [A] : the base64url-encoded representations of the JWS Protected Header (JOSE)<br />
            [B] : the base64url-encoded of the JWS Signature
          </p>
        </div>
        <div className='margin-container'>
          <p>2. Base64url-decode the encoded representation of the JWS Protected Header (JOSE), following the
            restriction that no line breaks, whitespace, or other additional characters have been used.
          </p>
        </div>
        <div className='margin-container'>
          <p>3. Verify that the resulting octet sequence is a UTF-8-encoded representation of a completely valid JSON
            object conforming to RFC 7159 [RFC7159]; let the JWS Protected Header be this JSON object.
          </p>
        </div>
        <div className='margin-container'>
          <p>4. Verify that the resulting JOSE Header does not contain duplicate Header Parameter names. </p>
        </div>
        <div className='margin-container'>
          <p>5. Verify that the implementation understands and can process all fields that it is required to support,
            whether
            required by this specification,
            by the algorithm being used, or by the "crit" Header Parameter value, and that the values of those
            parameters
            are
            also understood and supported.
          </p>
        </div>
        <div className='margin-container'>
          <p>6. Compute and encoded version of the body : BASE64URL( body))</p>
        </div>
        <div className='margin-container'>
          <p>7. Base64url-decode the encoded representation of the JWS Signature, following the restriction that no line
            breaks, whitespace, or other additional characters have been used.
          </p>
        </div>
        <div className='margin-container'>
          <p>8. Validate the JWS Signature against the JWS Signing Input :</p>
          <div className='bordered'><code>
            ASCII(BASE64URL(UTF8(JWS Protected Header)) || '.' || BASE64URL( result from 6 ))
          </code>
          </div>
          <p> in the manner defined for the algorithm being used, which MUST be accurately represented by the value of
            the
            "alg" (algorithm) Header Parameter, <br />
            which MUST be present.<br />
            Record whether the validation succeeded or not.
          </p>
        </div>
        <p>9. In the JWS Compact</p>
        <p>Serialization case, the result can simply indicate whether or not<br />
          the JWS was successfully validated.
        </p>
        <p>
          Finally, note that it is an application decision which algorithms may be used in a given context.<br />
          Even if a JWS can be successfully validated, unless the algorithm(s) used in the JWS are acceptable to the
          application, it SHOULD consider the JWS to be invalid.
        </p>
      </div>
      <h4>2. Validate PSD2 signature</h4>
      <div className='margin-container'>
        <p>
          In order to verify a signature, a server MUST:<br />
          1. Use the received HTTP message, the `headers` value, and the Signature String Construction (Section Generate
          integrity string for
          PSD2 signature) algorithm to recreate the signature.<br />
          2. The `algorithm`, `keyId`, and base 64 decoded `signature` listed in the Signature Parameters are then used
          to
          verify the authenticity of the digital signature.<br />
          Note: The application verifying the signature MUST derive the digital signature algorithm from the metadata
          associated with the `keyId`
          and MUST NOT use the value of `algorithm` from the signed message. If a header specified in the `headers`
          value of the Signature
          Parameters (or the default item `(created)` where the `headers` value is not supplied) is absent from the
          message, the implementation MUST produce an error
        </p>
      </div>
      <h4>3. Extra checks performed by BNPPF</h4>
      <div className='margin-container'>
        <p>
          For integrity and authenticity reasons, extra checks will be performed by BNP Paribas Fortis to guarantee
          origin
          and validity of the signature:
        </p><br />
        <table>
          <thead>
            <tr>
              <th>check</th>
              <th>description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Certificate retrieval</code></td>
              <td><code>EBNPPF must be able to load the public PEM file of the certificate used to sign </code></td>
            </tr>
            <tr>
              <td><code>Validate that certificate is declared as usable for signature</code></td>
              <td>BNPPF wants to avoid that simple “TLS” or “authentication” certificate are used to perform signature
              </td>
            </tr>
            <tr>
              <td><code>Validate coherency of algorithm mentioned in claim or signature parameter and info present in
                certificate
              </code>
              </td>
              <td>Algorithm mentioned in meta data should be the same as the one proposed in certificate</td>
            </tr>
            <tr>
              <td><code>Verify url claim of JOSE header or request-target</code></td>
              <td>Method and “query path” can be compare with received url claim and potentially must be use to compute
                signature
              </td>
            </tr>
            <tr>
              <td><code>Check Audience (aud)</code></td>
              <td><code>Check if it is part of supported list<br />
                <br />
                <table>
                  <tbody>
                    <tr>
                      <td><code>Fortis – Partners</code></td>
                      <td>api.bnpparibasfortis.be</td>
                    </tr>
                    <tr>
                      <td><code>Hello - Partners</code></td>
                      <td>api.hellobank.be</td>
                    </tr>
                    <tr>
                      <td><code>Fintro - Partners</code></td>
                      <td>api.fintro.be</td>
                    </tr>
                    <tr>
                      <td><code>Fortis – Regulatory</code></td>
                      <td>regulatory.api.bnpparibasfortis.be</td>
                    </tr>
                    <tr>
                      <td><code>Hello - Regulatory</code></td>
                      <td>regulatory.api.hellobank.be</td>
                    </tr>
                    <tr>
                      <td><code>Fintro - Regulatory</code></td>
                      <td>regulatory.api.fintro.be</td>
                    </tr>
                  </tbody>
                </table>
              </code>
              </td>
            </tr>
            <tr>
              <td><code>Check unique transaction id (txn)</code></td>
              <td>Check if txn is the same as passed X-Request-ID http header</td>
            </tr>
            <tr>
              <td><code>Check signature creation timestamp (iat or created)</code></td>
              <td>Check that this is not in the future</td>
            </tr>
            <tr>
              <td><code>Check signature expiration (exp or expires)</code></td>
              <td>Check that expiration is not exceeded</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
export default SignatureAuthenticationScheme
