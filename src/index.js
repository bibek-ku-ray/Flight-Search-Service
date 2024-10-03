const express = require("express");
const apiRouter  = require("./routes")
const {serverConfig} = require("./config")

const app = express();
console.log("Bibek ray");

app.use(express.json())
app.use(express.urlencoded({extends:true}))

app.use('/api', apiRouter)

app.listen(serverConfig.PORT, () => {
    console.log(`server started running on ${serverConfig.PORT}`);  
});
