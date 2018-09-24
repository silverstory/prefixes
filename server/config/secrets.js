const fs = require("fs"),
      util = require("util");
module.exports = {
  // Get a secret from its name
  get(secret){
    try {
      // Kubernetes and Swarm secret are accessible within /run/secrets dir
      return fs.readFileSync(util.format("/run/secrets/%s", secret), "utf8").trim();
      // From tutorials, Kubernetes secret are accessible within /etc/secret-volume dir
      // but this path can be change to any path you want. As for my app, I used
      // /run/secrets folder so that my secrets is accessible in /run/secrets folder
      // and this get(secret) function will work on both kubernetes or swarm
      // return fs.readFileSync(util.format("/etc/secret-volume/%s", secret), "utf8").trim();
     }
     catch(e){
       return false;
     }
  }
};
