module.exports = {
  getAllGlobalData : function(file_name){
    return new Promise(function(resolve,reject){
      try{
        var fs=require('fs');
        var data=fs.readFileSync("./global_data/"+file_name, 'utf8');
        itens=JSON.parse(data);
        resolve(itens);
      }catch(err){
        reject(err);
      }
    });
  }
}
