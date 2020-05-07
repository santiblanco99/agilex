var docusign = require('../docusign/index');
const express = require('express');
const router = express.Router();



  router.post('/',(req,res)=>{
    console.log('docusgin request:');
    console.log(req.body);
    docusign(req.body);
    resp = {
      msg: 'done',
    }
    res.json(resp);

  });

module.exports = router;
