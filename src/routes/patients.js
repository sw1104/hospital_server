const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/imageFile');
const { authenticateToken } = require('../middlewares/jwtAuth');

const patientController = require('../controllers/patients');

router.post('/', authenticateToken, patientController.createPatient);
router.post(
  '/upload/:patientId',
  authenticateToken,
  upload.single('img'),
  patientController.createPatientImage
);
router.get(
  '/:patientId',
  authenticateToken,
  patientController.getPatientInfoByPatientId
);
router.patch(
  '/:patientId',
  authenticateToken,
  patientController.editPatientInfo
);
router.delete(
  '/:patientId',
  authenticateToken,
  patientController.deletePatient
);

module.exports = { router };
