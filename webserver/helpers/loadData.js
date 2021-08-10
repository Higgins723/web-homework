const path = require('path')
const fs = require('fs')
const csv = require('fast-csv');

const loadTransactions = () => new Promise(promiseResolve => {
  let transactions = [];

  // transactions
  fs.createReadStream(path.resolve(__dirname, '../Seeds', 'Transactions.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('data', row => {
      // console.log(row, 'transactions');
      transactions.push(row);
    })
    .on('end', () => promiseResolve(transactions))
})

const loadUsers = () => new Promise(promiseResolve => {
  let users = [];

  // users
  fs.createReadStream(path.resolve(__dirname, '../Seeds', 'Users.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('data', row => {
      // console.log(row, 'users');
      users.push(row);
    })
    .on('end', () => promiseResolve(users))
})


module.exports = (async () => {
  let transactions = [];
  await loadTransactions().then((res) => transactions = res);

  let users = [];
  await loadUsers().then((res) => users = res);

  return {
    transactions,
    users,
  }
})();
