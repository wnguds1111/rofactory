const fs = require('fs');
let c = fs.readFileSync('register.html', 'utf8');
c = c.replace(
  /oninput="this\.value=this\.value\.replace\(\/\[.a-zA-Z\\s\]\/g,''\)"/g,
  `oninput="this.value=this.value.replace(/[^a-zA-Z0-9\\s\\-_'.!]/g,'')"`
);
fs.writeFileSync('register.html', c, 'utf8');
console.log('done');
