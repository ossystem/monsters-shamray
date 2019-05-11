module.exports = async function() {
  console.log('initDB');
  //console.log('process.env=',process.env);
  const { DB_HOST, DB_USER, DB_PASS } = process.env;
};
