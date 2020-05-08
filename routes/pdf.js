const express = require('express');
const router = express.Router();
const pdf = require('html-pdf');

router.post('/print', async (req, res) => {
    const content = req.body.content
    console.log(req.body);

    const fileName = req.body.fileName

    pdf.create(content).toFile('./public/finales/' + fileName + '.pdf', function(err, res) {
    if (err){
        console.log(err);
    } else {
        console.log(res);
        console.log('Crea pdf');
        
    }
    });
})



module.exports = router;