const testFolder = './';
const fs = require('fs');

fs.readdirSync(testFolder).forEach(file => {
//  console.log(file);
  if(file.indexOf('srt')!=-1){
  let ep = file.split("-")[1].split(" ")[1].split("x")[1];
  const season = 4;
  let newName = `Teen_Wolf_S0${season}E${ep}_480p_HDTV_SITEMOVIE.srt`;
  console.log("ren", file, newName);
  fs.rename(file, process.cwd()+"/"+newName, (err)=>{console.log(err)});  
}
});