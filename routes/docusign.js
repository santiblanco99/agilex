var docusign = require('../docusignAPI');
const express = require('express');
const router = express.Router();

var data = {
    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjY4MTg1ZmYxLTRlNTEtNGNlOS1hZjFjLTY4OTgxMjIwMzMxNyJ9.eyJUb2tlblR5cGUiOjUsIklzc3VlSW5zdGFudCI6MTU4ODE3ODEzMCwiZXhwIjoxNTg4MjA2OTMwLCJVc2VySWQiOiJlZjc0MjZhOS03YjcwLTRhNmMtYTM1OS1lNThjYTU3ZWNmY2UiLCJzaXRlaWQiOjEsInNjcCI6WyJzaWduYXR1cmUiLCJjbGljay5tYW5hZ2UiLCJvcmdhbml6YXRpb25fcmVhZCIsInJvb21fZm9ybXMiLCJncm91cF9yZWFkIiwicGVybWlzc2lvbl9yZWFkIiwidXNlcl9yZWFkIiwidXNlcl93cml0ZSIsImFjY291bnRfcmVhZCIsImRvbWFpbl9yZWFkIiwiaWRlbnRpdHlfcHJvdmlkZXJfcmVhZCIsImR0ci5yb29tcy5yZWFkIiwiZHRyLnJvb21zLndyaXRlIiwiZHRyLmRvY3VtZW50cy5yZWFkIiwiZHRyLmRvY3VtZW50cy53cml0ZSIsImR0ci5wcm9maWxlLnJlYWQiLCJkdHIucHJvZmlsZS53cml0ZSIsImR0ci5jb21wYW55LnJlYWQiLCJkdHIuY29tcGFueS53cml0ZSJdLCJhdWQiOiJmMGYyN2YwZS04NTdkLTRhNzEtYTRkYS0zMmNlY2FlM2E5NzgiLCJhenAiOiJmMGYyN2YwZS04NTdkLTRhNzEtYTRkYS0zMmNlY2FlM2E5NzgiLCJpc3MiOiJodHRwczovL2FjY291bnQtZC5kb2N1c2lnbi5jb20vIiwic3ViIjoiZWY3NDI2YTktN2I3MC00YTZjLWEzNTktZTU4Y2E1N2VjZmNlIiwiYW1yIjpbImludGVyYWN0aXZlIl0sImF1dGhfdGltZSI6MTU4ODE3ODEyOCwicHdpZCI6IjFmZjkwODEzLTlkNTAtNDQyMy1hMGM4LWE5YjMzYTgzOWU2OSJ9.qD4PeReT-pxXSjSXafF50pRQ5dN2I-e2kkB4E5Sz60Zoh2sFnYRfnOKSFq46GBqphqr7OBtmTsTpooZg5eOBJknlwydiN3XhHkRY8Ow3FfYqoCtCVnQlEEEAp3wzzLNmGqtPeoznAj08Du91RguLft__Rjw3BPbCJvXUv45eFFP0aq2JBMFo53JZ4bvNO6bxUo1TgJkgnrUqlmaASkyE-8Th_h91XeNBenpXJs54JQRECNyIdAVGEIlgtJmiHGAefPnqpD1DssY_oEd5JR7Rn_vxR74Brxn51Zp5CmoVrfVBJN1d7_1IohBM7neswJYyt9Da1GqvW5fx037msID47A', //Token para consumir el API
    accountId: '10280615', //Cuenta del usuario que posee el servicio
    signerName: 'Santiago Blanco', //Nombre de la persona que firma 
    signerEmail: 'agilexgroupcol@gmail.com', //Email de la persona
    fileName: './public/demo.pdf', //Ruta al archivo
    documentSubject: 'Please sign this document sent from the Node example', //Descripción para firmar en el API
    documentName: 'PDF Test', //Nombre del documento
    xSignPosition: 1, //Posición en X para el archivo de firma
    ySignPosition: 1, //Posicion en Y para el archivo
  };

  router.post('/',(req,res)=>{
    console.log('docusgin request:');
    console.log(req.body);
    data.signerEmail = req.body.signerEmail;
    data.signerName = req.body.signerName;
    docusign(req,res,data);
  });

module.exports = router;
