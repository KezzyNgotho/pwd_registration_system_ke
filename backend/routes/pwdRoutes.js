const express = require('express');
const router = express.Router();
const pwdController = require('../controllers/pwdController');

router.post('/register', pwdController.registerPWD);
router.get('/records', pwdController.getAllRecords);
router.get('/records/:id', pwdController.getRecordById);
router.put('/records/:id', pwdController.updateRecord);
router.delete('/records/:id', pwdController.deleteRecord);

module.exports = router;
