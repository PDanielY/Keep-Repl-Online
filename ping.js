mysql = require("mysql")
x = 0
request = require("request")
var con = mysql.createPool({
  host: "remotemysql.com",
  user: process.env.Username,
  password: process.env.Password,
  database:process.env.Username
});

con.getConnection(function(err) {
  if (err) throw err;
  console.log("Connected to database on ping file!");
});
setInterval(function(){
  con.query("SELECT * FROM Repls",(err,result)=>{
    if(err){
      console.log("error")
      return
    }
    count = result.length
    for (i = 0; i < count; i++) {
      y = x + 1
      if(result[x] == undefined){
        console.log("Done!")
        break
        return
      }
      console.log(result[x].Url)
      request("https://" + result[x].Url,function(err){
        if(err){
          console.log("error")
          console.log(err)
          return
        }
        x = x + 1
      })
}
x = 0
  })
},1000)
