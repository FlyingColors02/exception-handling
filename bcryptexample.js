let bcrypt = require("bcryptjs");
async function Salt(){
    let salt = await bcrypt.genSalt(10);
    console.log(salt);
    let data = await bcrypt.hash("shraddha",salt);
    console.log(data);
}
Salt();