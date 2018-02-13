module.exports = {
  ct01_readJson : function(file_name){
    var fs=require('fs');
    var data=fs.readFileSync(file_name, 'utf8');
    itens=JSON.parse(data);
  },
  ct01_getAll : function(){
    return itens;
  },
  ct01_getItem : function(index){
    return itens[index];
  }
}
