var docusign = require('./index');

var info = {
    signerEmails: ['s.blancoc@uniandes.edu.co','santiagowhite99@hotmail.com'],
    signerNames: ['Santiago Blanco', 'Santiago Cediel'],
    ccEmails:['s.blancoc@uniandes.edu.co','santiagowhite99@hotmail.com'],
    ccNames: ['Santiago Blanco', 'Santiago Cediel']
}

docusign(info);