/**
 * This is a quick start example of creating and sending an envelope to be signed. 
 * Language: Node.js
 * 
 * See the Readme and Setup files for more information.
 * 
 * Copyright (c) DocuSign, Inc.
 * License: MIT Licence. See the LICENSE file.
 * 
 * This example does not include authentication. Instead, an access token
 * must be supplied from the Token Generator tool on the DevCenter or from
 * elsewhere.
 * 
 * This example also does not look up the DocuSign account id to be used.
 * Instead, the account id must be set. 
 * 
 * For a more production oriented example, see:
 *   JWT authentication: https://github.com/docusign/eg-01-node-jwt 
 *   or Authorization code grant authentication. Includes express web app:
 *      https://github.com/docusign/eg-03-node-auth-code-grant 
 */
const docusign = require('docusign-esign')
    , path = require('path')
    , fs = require('fs')
    , process = require('process')
    , basePath = 'https://demo.docusign.net/restapi'
    , express = require('express')
    , envir = process.env
    ;

/**
 * Añadir el siguiente contenido a package.json para obtener los paquetes.
 * Instalan con "npm i"
 * "dependencies": {
    "docusign-esign": "^5.1.0",
    "express": "^4.17.1",
    "fs": "0.0.1-security",
    "moment": "^2.24.0"
  }
 */

async function sendEnvelopeController(req, res, data) {
  const qp = req.query;
  // Fill in these constants or use query parameters of ACCESS_TOKEN, ACCOUNT_ID, USER_FULLNAME, USER_EMAIL
  // or environment variables.

  // Obtain an OAuth token from https://developers.docusign.com/oauth-token-generator
  const accessToken = envir.ACCESS_TOKEN || qp.ACCESS_TOKEN || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjY4MTg1ZmYxLTRlNTEtNGNlOS1hZjFjLTY4OTgxMjIwMzMxNyJ9.eyJUb2tlblR5cGUiOjUsIklzc3VlSW5zdGFudCI6MTU4ODE3ODI3MCwiZXhwIjoxNTg4MjA3MDcwLCJVc2VySWQiOiJlZjc0MjZhOS03YjcwLTRhNmMtYTM1OS1lNThjYTU3ZWNmY2UiLCJzaXRlaWQiOjEsInNjcCI6WyJzaWduYXR1cmUiLCJjbGljay5tYW5hZ2UiLCJvcmdhbml6YXRpb25fcmVhZCIsInJvb21fZm9ybXMiLCJncm91cF9yZWFkIiwicGVybWlzc2lvbl9yZWFkIiwidXNlcl9yZWFkIiwidXNlcl93cml0ZSIsImFjY291bnRfcmVhZCIsImRvbWFpbl9yZWFkIiwiaWRlbnRpdHlfcHJvdmlkZXJfcmVhZCIsImR0ci5yb29tcy5yZWFkIiwiZHRyLnJvb21zLndyaXRlIiwiZHRyLmRvY3VtZW50cy5yZWFkIiwiZHRyLmRvY3VtZW50cy53cml0ZSIsImR0ci5wcm9maWxlLnJlYWQiLCJkdHIucHJvZmlsZS53cml0ZSIsImR0ci5jb21wYW55LnJlYWQiLCJkdHIuY29tcGFueS53cml0ZSJdLCJhdWQiOiJmMGYyN2YwZS04NTdkLTRhNzEtYTRkYS0zMmNlY2FlM2E5NzgiLCJhenAiOiJmMGYyN2YwZS04NTdkLTRhNzEtYTRkYS0zMmNlY2FlM2E5NzgiLCJpc3MiOiJodHRwczovL2FjY291bnQtZC5kb2N1c2lnbi5jb20vIiwic3ViIjoiZWY3NDI2YTktN2I3MC00YTZjLWEzNTktZTU4Y2E1N2VjZmNlIiwiYW1yIjpbImludGVyYWN0aXZlIl0sImF1dGhfdGltZSI6MTU4ODE3ODI2NywicHdpZCI6IjFmZjkwODEzLTlkNTAtNDQyMy1hMGM4LWE5YjMzYTgzOWU2OSJ9.TtMLRh5GPlrAFWvh_EDSBBV3kCJR-KjLJ9tWgOwfNIToWcDHQ4Yujxd13aLdoXIS3z1j958HV3_6OGz_nHHViRt-SpBUwknCPgnZOwxIg6lcMlUiPsVMWHE0fl5QjUM5GYj48ZoQwyUP3CbylKgnEczzsoKlSGuMEkj2vXd9fB6Y9EEDyHoR81FIBusJoFSm2eOl-jOCgf_Oxro5yupfeHajyCbzvFplT9aR86d5uEC6RdDwnAjzpv8U8FwinPZywznrztzvImJvor0MK3sSoo2vhYjohpoJShtWRJOPE1t8aig1YhZNh_mThtXFMHldT-vGySY3ADviJmzGJasetg';

  // Obtain your accountId from demo.docusign.com -- the account id is shown in the drop down on the
  // upper right corner of the screen by your picture or the default picture. 
  const accountId = envir.ACCOUNT_ID || qp.ACCOUNT_ID || '10280615';

  // Recipient Information:
  const signerName = envir.USER_FULLNAME || qp.USER_FULLNAME || 'Santiago Blanco';
  const signerEmail = envir.USER_EMAIL || qp.USER_EMAIL || 'santiagowhite99@hotmail.com';

  // The document you wish to send. Path is relative to the root directory of this repo.
  const fileName = 'demo_documents/World_Wide_Corp_lorem.pdf';

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /**
   *  The envelope is sent to the provided email address. 
   *  One signHere tab is added.
   *  The document path supplied is relative to the working directory 
   */
  const apiClient = new docusign.ApiClient();
  apiClient.setBasePath(basePath);
  apiClient.addDefaultHeader('Authorization', 'Bearer ' + data.accessToken);
  // Set the DocuSign SDK components to use the apiClient object
  docusign.Configuration.default.setDefaultApiClient(apiClient);

  // Create the envelope request
  // Start with the request object
  const envDef = new docusign.EnvelopeDefinition();
  //Set the Email Subject line and email message
  envDef.emailSubject = 'Please sign this document sent from the Node example';
  envDef.emailBlurb = 'Please sign this document sent from the Node example.'

  // Read the file from the document and convert it to a Base64String
  const pdfBytes = fs.readFileSync(data.fileName)
    , pdfBase64 = pdfBytes.toString('base64');

  // Create the document request object
  const doc = docusign.Document.constructFromObject({
    documentBase64: pdfBase64,
    fileExtension: 'pdf',  // You can send other types of documents too.
    name: 'Sample document', documentId: '1'
  });

  // Create a documents object array for the envelope definition and add the doc object
  envDef.documents = [doc];

  // Create the signer object with the previously provided name / email address
  const signer = docusign.Signer.constructFromObject({
    name: data.signerName,
    email: data.signerEmail, routingOrder: '1', recipientId: '1'
  });

  // Create the signHere tab to be placed on the envelope
  const signHere = docusign.SignHere.constructFromObject({
    documentId: '1',
    pageNumber: '1', recipientId: '1', tabLabel: 'SignHereTab',
    xPosition: '195', yPosition: '147'
  });

  // Create the overall tabs object for the signer and add the signHere tabs array
  // Note that tabs are relative to receipients/signers.
  signer.tabs = docusign.Tabs.constructFromObject({ signHereTabs: [signHere] });

  // Add the recipients object to the envelope definition.
  // It includes an array of the signer objects. 
  envDef.recipients = docusign.Recipients.constructFromObject({ signers: [signer] });
  // Set the Envelope status. For drafts, use 'created' To send the envelope right away, use 'sent'
  envDef.status = 'sent';

  // Send the envelope
  let envelopesApi = new docusign.EnvelopesApi()
    , results
    ;

  try {
    results = await envelopesApi.createEnvelope(data.accountId, { 'envelopeDefinition': envDef })
  } catch (e) {
    let body = e.response && e.response.body;
    if (body) {
      // DocuSign API exception
      res.send(`<html lang="en"><body>
                  <h3>API problem</h3><p>Status code ${e.response.status}</p>
                  <p>Error message:</p><p><pre><code>${JSON.stringify(body, null, 4)}</code></pre></p>`);
    } else {
      // Not a DocuSign exception
      throw e;
    }
  }
  // Envelope has been created:
  if (results) {
    var result = JSON.stringify(results, null, 4);
    res.json(result);
    // res.send(`<html lang="en"><body>
    //             <h3>Envelope Created!</h3>
    //             <p>Signer: ${data.signerName} &lt;${data.signerEmail}&gt;</p>
    //             <p>Results</p><p><pre><code>${JSON.stringify(results, null, 4)}</code></pre></p>`);
  }
}
module.exports = sendEnvelopeController;