const { Doc } = require('./db');

//* MongoDB
const getData = async (data) => {
  try {
    let result = await Doc.find({});
    return result;
  } catch (err) {
    console.error(err);
    return err;
  };
};
const postData = async (data) => {
  try {
    let result = await Doc.create();
    return result;
  } catch (err) {
    console.error(err);
    return err;
  };
};
const updateData = async (data) => {
  try {
    let result = await Doc.updateMany();
    return result;
  } catch (err) {
    console.error(err);
    return err;
  };
};
const deleteData = async (data) => {
  try {
    let result = await Doc.deleteMany();
    return result;
  } catch (err) {
    console.error(err);
    return err;
  };
};
// */

/* SQL
const db = require('./db');

const getData = (data, cb) => {
  let q = '';
  db.query(q, cb);
};
const postData = (data, cb) => {
  let q = '';
  db.query(q, cb);
};
const updateData = (data, cb) => {
  let q = '';
  db.query(q, cb);
};
const deleteData = (data, cb) => {
  let q = '';
  db.query(q, cb);
};
// */


module.exports = { getData, postData, updateData, deleteData };