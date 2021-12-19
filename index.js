const express = require('express');
const path = require('path');
const cors = require('cors');
const SCTdata = require(path.join(__dirname,'data_SCT.json'));
const AlloData = require(path.join(__dirname,'data_Allo.json'));


const app = express();

app.use(express.json());
const PORT = process.env.PORT || 8000;

const corsOptions={
  origin:"*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.get('/SCTList',(req,res) =>{
  let data = SCTdata.Data;
  
  for(let i=0;i<data.length;i++){
    if(req.query.id == data[i]["Employe (Treasury) ID"]){
      res.status(200).json(data[i]);
    }
  }
  res.status(404).json({message:'Employee ID Not Found'});
});

app.get('/allocationList' , (req,res) =>{
  let data = AlloData.Data;
  for(let i=0;i<data.length;i++){
    if(req.query.id == data[i]["Employe (Treasury) ID"]){
      res.status(200).json(data[i]);
    }
  }
  res.status(404).json({message:'Employee ID Not Found'});
})
app.listen(PORT ,() =>{
  console.log(`Listening on PORT ${PORT}`);
})