const fs = require('fs');
const child_process = require('child_process');
const child = child_process.fork('./child.js');

child.on('message', (data) => {
    console.log('function result', data.result);
});

const fn = fs.readFileSync('./func.js', { encoding: 'utf8'});
child.send({ action: 'run', fn});