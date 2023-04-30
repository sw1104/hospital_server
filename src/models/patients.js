const { appDataSource } = require('../../db');

const createPatient = async (
  name,
  ssn,
  encryptResult,
  birthDate,
  cellPhone,
  phone,
  email,
  nowDate
) => {
  const [result] = await appDataSource.query(
    `   
      INSERT INTO patient (name, ssn, enssn, birthDate, cellPhone, phone, email, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `,
    [name, ssn, encryptResult, birthDate, cellPhone, phone, email, nowDate]
  );
  return result;
};

const createPatientAddress = async (patientId, address1, address2, nowDate) => {
  return await appDataSource.query(
    `
      INSERT INTO patient_address (patientId, address1, address2, createdAt)
      VALUES (?, ?, ?, ?);
    `,
    [patientId, address1, address2, nowDate]
  );
};

const createPatientImage = async (
  patientId,
  imageUrl,
  imageSize,
  imageTxt,
  nowDate
) => {
  return await appDataSource.query(
    `
      INSERT INTO patient_image (patientId, imageUrl, imageSize, ImageTxt, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `,
    [patientId, imageUrl, imageSize, imageTxt, nowDate]
  );
};

const getPatientInfoByPatientId = async patientId => {
  const [patientInfo] = await appDataSource.query(
    `
      SELECT patientId, enssn, birthDate, cellPhone, phone, createdAt FROM patient WHERE patientId = ${patientId}
    `
  );

  const [patientAddress] = await appDataSource.query(
    `
      SELECT address1, address2, createdAt FROM patient_address WHERE patientId = ${patientId} 
    `
  );

  const [patientImage] = await appDataSource.query(
    `
     SELECT imageUrl, imageSize, imageTxt, createdAt FROM patient_image WHERE patientId = ${patientId}
    `
  );
  return [patientInfo, patientAddress, patientImage];
};

const editPatientInfo = async (patientId, setInfoQuery) => {
  return await appDataSource.query(
    `
      UPDATE patient SET
      ${setInfoQuery}
      WHERE patientId = ${patientId}
    `
  );
};

const editPatientAddress = async (patientId, setAddressQuery) => {
  return await appDataSource.query(
    `
    UPDATE patient_address SET
    ${setAddressQuery}
    WHERE patientId = ${patientId}
    `
  );
};

const deletePatient = async patientId => {
  await appDataSource.query(
    `
      DELETE FROM patient WHERE patientId = ${patientId}
    `
  );

  await appDataSource.query(
    `
      DELETE FROM patient_address WHERE patientId = ${patientId}
    `
  );

  await appDataSource.query(
    `
      DELETE FROM patient_image WHERE patientId = ${patientId};
    `
  );
};

module.exports = {
  createPatient,
  createPatientAddress,
  createPatientImage,
  getPatientInfoByPatientId,
  editPatientInfo,
  editPatientAddress,
  deletePatient,
};
