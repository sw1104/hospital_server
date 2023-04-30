const patientService = require('../services/patients');

const createPatient = async (req, res) => {
  const { name, ssn, birthDate, cellPhone, phone, email, addresses } = req.body;

  await patientService.createPatient(
    name,
    ssn,
    birthDate,
    cellPhone,
    phone,
    email,
    addresses
  );

  res.status(201).json({ message: 'Success' });
};

const createPatientImage = async (req, res) => {
  const patientId = req.params.patientId;
  const patientImage = req.file;

  await patientService.createPatientImage(patientId, patientImage);

  res.status(201).json({ message: 'Success' });
};

const getPatientInfoByPatientId = async (req, res) => {
  const patientId = req.params.patientId;

  await patientService.getPatientInfoByPatientId(patientId);

  res.status(200).json({ message: 'Success', data: data });
};

const editPatientInfo = async (req, res) => {
  const patientId = req.params.patientId;
  const updateFields = req.body;

  await patientService.editPatientInfo(patientId, updateFields);

  res.status(201).json({ message: 'Success' });
};

const deletePatient = async (req, res) => {
  const patientId = req.params.patientId;

  await patientService.deletePatient(patientId);

  res.status(204).json({ message: 'Success' });
};

module.exports = {
  createPatient,
  createPatientImage,
  getPatientInfoByPatientId,
  editPatientInfo,
  deletePatient,
};
