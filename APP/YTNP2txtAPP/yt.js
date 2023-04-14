//
//
//    YTNP2txt by Daniel M. (c)2022
//
//      https://github.com/T1G3R-DEV/YT2txt
//
//      version 0.4.1
//



const http = require('http');   //lib for webserver
const url = require('url');     //lib for parsing GET requests
const fs = require('fs');       //lib for writing to the files


console.log("\t\tyt2. (c)2022\n\nVisit my Github for more info/setup info: \n\thttps://github.com/T1G3R-DEV/YT2txt");

var port = 8099;
var config; 
var strConfig; 

try {
    if (fs.existsSync("./config.json")) {
      strConfig=fs.readFileSync("./config.json");
        
      //console.log("TEST:" + strConfig);

    }else {
        console.log("\n\n\tconfig.json not found!\nYou may move the config.json in the same folder as this program!\n");
        strConfig = "{\n\"server\":{\n\"port\":8099\n},\n\"outputs\":[\n{\n\"outputPath\":\"./video_title.txt\",\n\"format\":\"${this.video_title}\"\n},\n{\n\"outputPath\":\"./video_creator.txt\",\n\"format\":\"${this.video_creator}\"\n},\n{\n\"outputPath\":\"./video_all.txt\",\n\"format\":\"Title: ${this.video_title}\\nCreator: ${this.video_creator}\"\n}\n]\n}";
        
    }
  } catch(err) {
    console.log(err)
  }


config = JSON.parse(strConfig);

console.log(config);

port=config.server.port;
console.log("\n\n\nServer is running on port:" + port);

let video_title = '';
let video_creator = '';
let time_current = '';
let time_duration = '';

const fillTemplate = function(templateString, templateVars) {
    const keys = Object.keys(templateVars);
    const values = Object.values(templateVars);
    return new Function(...keys, `return \`${templateString}\`;`)(...values);
  }
  




const requestListener = function (req, res) {
    const queryObject = url.parse(req.url, true).query;
    console.log(queryObject);


    if (queryObject['time_current'] !=null) {
        console.log(queryObject);
      
        video_title=queryObject["video_title"] ? String(queryObject['video_title']) : "" ;
        video_creator=queryObject["video_creator"] ? String(queryObject['video_creator']) : "";
        time_current=queryObject['time_current'] ? String(queryObject['time_current']) : "";
        time_duration=queryObject['time_duration'] ? String(queryObject['time_duration']) : "";
      
        config.outputs.forEach(function(element) {  
          fs.writeFile(element.outputPath, fillTemplate(element.format, {video_title, video_creator, time_current, time_duration} ), err => {
            if (err) {
              console.error(err);
            }
            // file written successfully
          })
        });
      }
    res.writeHead(200);
  
    res.end('For help visit the github: https://github.com/T1G3R-DEV/YT2txt/ !');
}

const server = http.createServer(requestListener);
server.listen(port);