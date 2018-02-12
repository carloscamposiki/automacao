module.exports = {
  readJson : function(file_name){
    var fs=require('fs');
    var data=fs.readFileSync(file_name, 'utf8');
    itens=JSON.parse(data);
  },
  getAll : function(){
    return itens;
  },
  getItem : function(index){
    return itens[index];
  }
}
