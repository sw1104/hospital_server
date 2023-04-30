const patientDao = require('../models/patients');
const crypto = require('crypto');
const key = 'abcdefg';

const date = new Date();
const nowDate = date.toISOString().slice(2, 16).replace('T', ' ');

const createPatient = async (
  name,
  ssn,
  birthDate,
  cellPhone,
  phone,
  email,
  addresses
) => {
  const address1 = addresses[0].zipcode + ', ' + addresses[0].address1;
  const address2 = addresses[0].address2;

  const encrypt = crypto.createCipher('des', key);
  const encryptResult =
    encrypt.update(ssn, 'utf8', 'base64') + encrypt.final('base64');

  const data = await patientDao.createPatient(
    name,
    ssn,
    encryptResult,
    birthDate,
    cellPhone,
    phone,
    email,
    nowDate
  );

  const patientId = data.insertId;

  await patientDao.createPatientAddress(patientId, address1, address2, nowDate);

  return name;
};

const createPatientImage = async (patientId, patientImage) => {
  const imageUrl = patientImage.path;
  const imageSize = patientImage.size;
  const imageTxt = patientImage.originalname;

  return await patientDao.createPatientImage(
    patientId,
    imageUrl,
    imageSize,
    imageTxt,
    nowDate
  );
};

const getPatientInfoByPatientId = async patientId => {
  const data = await patientDao.getPatientInfoByPatientId(patientId);

  const patientInfo = data[0][0];
  const decode = crypto.createDecipher('des', key);
  const decodeResult =
    decode.update(patientInfo.enssn, 'base64', 'utf8') + decode.final('utf8');
  const patientAddress = data[1];
  const address = patientAddress[0].address1;
  let zipcode;
  let address1;
  for (let i = 0; i < address.length; i++) {
    if (address[i] === ',') {
      zipcode = address.slice(0, i);
      address1 = address.slice(i + 2, address.length);
    }
  }

  const patientImage = data[2];

  return {
    patientId: patientInfo.patientId,
    name: patientInfo.name,
    ssn: decodeResult,
    encssn: patientInfo.enssn,
    birthDate: patientInfo.birthDate,
    cellPhone: patientInfo.cellPhone,
    phone: patientInfo.phone,
    addresses: [
      {
        zipcode: zipcode,
        address1: address1,
        address2: patientAddress[0].address2,
        createdAt: patientAddress[0].createdAt,
      },
    ],
    images: patientImage,
    createdAt: patientInfo.createdAt,
  };
};

const editPatientInfo = async (patientId, updateFields) => {
  const setInfoFields = [];
  const setAddressFields = [];

  for (const field in updateFields) {
    if (field === 'ssn') {
      const encrypt = crypto.createCipher('des', key);
      const encryptResult =
        encrypt.update(updateFields[field], 'utf8', 'base64') +
        encrypt.final('base64');
      setInfoFields.push(`${field} = '${updateFields[field]}'`);
      setInfoFields.push(`enssn = '${encryptResult}'`);
    } else if (field === 'addresses') {
      const address1 =
        updateFields.addresses[0].zipcode +
        ', ' +
        updateFields.addresses[0].address1;
      const address2 = updateFields.addresses[0].address2;
      setAddressFields.push(`address1 = '${address1}'`);
      setAddressFields.push(`address2 = '${address2}'`);
      const setAddressQuery = setAddressFields.join(', ');

      await patientDao.editPatientAddress(patientId, setAddressQuery);
    } else {
      setInfoFields.push(`${field} = '${updateFields[field]}'`);
    }
  }
  const setInfoQuery = setInfoFields.join(', ');
  await patientDao.editPatientInfo(patientId, setInfoQuery);
};

const deletePatient = async patientId => {
  return await patientDao.deletePatient(patientId);
};

module.exports = {
  createPatient,
  createPatientImage,
  getPatientInfoByPatientId,
  editPatientInfo,
  deletePatient,
};
