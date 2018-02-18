module.exports = {
  ct01_readJson : function(file_name){
    return new Promise(function(resolve,reject){
      try{
        var fs=require('fs');
        var data=fs.readFileSync("./test_data/"+file_name, 'utf8');
        itens=JSON.parse(data);
        resolve(itens);
      }catch(err){
        reject(err);
      }
    });
  },
  ct01_getAll : function(){
    return itens;
  },
  ct01_getItem : function(index){
    return itens[index];
  }
}
