/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import fs from "fs";
import inquirer from 'inquirer';
import qr from 'qr-image';
inquirer
  .prompt([
    {
        type: 'input',
        name: 'url',
        message: 'enter the url',    
      }
  ])
  .then((answers) => {
    fs.writeFile("./URL.txt",answers.url,(err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          }); 
          var qr_svg=qr.image(answers.url);
          qr_svg.pipe(fs.createWriteStream('qr.png'));
 
  })
