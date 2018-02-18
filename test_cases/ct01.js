var webdriver = require("selenium-webdriver");
var assert = require("assert");
const {Key, until} = require('selenium-webdriver');

describe("CT01", function() {
  this.timeout(300000);
  var ct01 = require('../test_config/ct01_config');
  var jsonF = require('../test_tools/ct01_json_functions');
  var globalDataF = require('../test_tools/global_data_json_functions');
  var linhasINFO = [];


  before(function() {
    driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.firefox()).build();
    return globalDataF.getAllGlobalData("ct01.json").then(function(gd){
      globalData = gd;
    });
  });

  after(function() {
    return driver.quit();
  });


  //1 Acessar ambiente
  it("1 Deve acessar ambiente", function() {
    return driver.get(globalData["v_url"]);
  });


  //2 Cadastrar usuario
  it("2 Deve cadastrar usuário", function() {
    return waitElement(ct01.register_link, 50000)
    .then( () => getElement(ct01.register_link).click())
    .then( () => getElement(ct01.user_login_input).sendKeys(globalData["v_name"]))
    .then( () => getElement(ct01.user_password_input).sendKeys(globalData["v_password"]))
    .then( () => getElement(ct01.user_confirmation_input).sendKeys(globalData["v_password"]))
    .then( () => getElement(ct01.user_fistName_input).sendKeys(globalData["v_firstName"]))
    .then( () => getElement(ct01.user_lastName_input).sendKeys(globalData["v_lastName"]))
    .then( () => getElement(ct01.user_mail_input).sendKeys(globalData["v_mail"]))
    .then( () => dropDown(ct01.language_dropMenu,globalData["v_linguagem"]))
    .then( () => getElement(ct01.register_submit).click());
  });


  //3 Validar usuario
  it("3.0 Página de usuario criado deve carregar", function(){
    return waitElement(ct01.login_hideMail_checkB, 5000);
  });
  it("3.1 Usuario criado deve ser validado (primeiro nome)", function() {
    return getElement(ct01.user_fistName_input).getAttribute("value")
    .then( function(value){ assert.equal(value, globalData["v_firstName"])});
  });
  it("3.2 Usuario criado deve ser validado (ultimo nome)", function() {
    return getElement(ct01.user_lastName_input).getAttribute("value")
    .then( function(value){ assert.equal(value, globalData["v_lastName"])});
  });
  it("3.3 Usuario criado deve ser validado (email)", function() {
    return getElement(ct01.user_mail_input).getAttribute("value")
    .then( function(value){ assert.equal(value, globalData["v_mail"])});
  });
  it("3.4 Usuario criado deve ser validado (username)", function() {
    return getElement(ct01.login_username_link).getText()
    .then( function(value){ assert.equal(value, globalData["v_name"])});
  });
  it("3.5 Usuario criado deve ser validado (username)", function() {
    return getElement(ct01.language_dropMenu).getAttribute("value")
    .then( function(value){ assert.equal(value, globalData["v_linguagem"])});
  });


  //4 Logout
  it("4 Deve deslogar", function(){
    return getElement(ct01.logout_link).click();
  });


  //5 Login
  it("5 Deve logar", function(){
    return getElement(ct01.login_link).click()
    .then( () => getElement(ct01.login_username_input).sendKeys(globalData["v_name"]))
    .then( () => getElement(ct01.login_password_input).sendKeys(globalData["v_password"]))
    .then( () => getElement(ct01.login_enter_btn).click());
  });


  //6 Validar login
  it("6 Deve validar login", function(){
    return getElement(ct01.login_username_link1).getText()
    .then( function(value){ assert.equal(value, globalData["v_name"])});
  });


  //7 Criar novo projeto
  it("7 Deve criar novo projeto", function(){
    return getElement(ct01.projects_link).click()
    .then( () => getElement(ct01.projects_newProject_link).click())
    .then( () => getElement(ct01.projects_name_input).sendKeys(globalData["v_projectName"]))
    .then( () => getElement(ct01.projects_id_input).clear())
    .then( () => getElement(ct01.projects_id_input).sendKeys(globalData["v_projectId"]))
    .then( () => getElement(ct01.projects_feature_checkB).click())
    .then( () => getElement(ct01.projects_support_checkB).click())
    .then( () => getElement(ct01.project_submit_btn).click());
  });


  //8 Validar projeto
  it("8.1 Deve ter criado novo projeto", function(){
    return getElement(ct01.project_flash_notice);
  });
  it("8.2 Validar projeto criado (nome)", function(){
    return getElement(ct01.projects_name_input).getAttribute("value")
    .then( function(value){ assert.equal(value, globalData["v_projectName"])});
  });
  it("8.3 Validar projeto criado (id)", function(){
    return getElement(ct01.projects_id_input).getAttribute("value")
    .then( function(value){ assert.equal(value, globalData["v_projectId"])});
  });
  it("8.4 Validar projeto criado (bug checkbox)", function(){
    return getElement(ct01.projects_bugs_checkB).getAttribute("checked")
    .then( function(value){ assert.equal(value, "true")});
  });
  it("8.5 Validar projeto criado (feature checkbox)", function(){
    return getElement(ct01.projects_feature_checkB).getAttribute("checked")
    .then( function(value){ assert.equal(value, null)});
  });
  it("8.6 Validar projeto criado (support checkbox)", function(){
    return getElement(ct01.projects_support_checkB).getAttribute("checked")
    .then( function(value){ assert.equal(value, null)});
  });


  //9 Acessar projetos
  it("9 Deve acessar projetos", function(){
    return getElement(ct01.projects_link).click();
  });


  //10 Acessar projeto criado
  it("10 Deve acessar projeto criado", function(){
    ct01.project_name_link[1]=globalData["v_projectName"]
    return getElement(ct01.project_name_link).click();
  });


  //11 Acessar aba nova tarefa
  it("11 Deve acessar aba de nova tarefa", function(){
    return getElement(ct01.project_newTask_link).click();
  });


  //12 Criar tarefas massa de daddos1
  it("12 Deve criar tarefas com massa de dados", function(){
    return jsonF.ct01_readJson(globalData["v_jsonFileName"])
    .then( () => jsonF.ct01_getAll())                                             //Pega todas as tarefas
    .then( (itens) => iterateTasks(itens))                                        //Adiciona todas as tarefas no projeto
    .then( () => new Promise(resolve => setTimeout(resolve, 5000)));              //Delay para a última recursão
  });


  //13 Aba tarefas
  it("13 Deve abrir aba tarefas", function(){
    return getElement(ct01.task_link).click();
  });


  //14. Validação item
  it("14 Item deve ser válido", function(){
    return dropDown(ct01.task_statusGrid_dropMenu,globalData["v_listtask"])                //Listar todas as tarefas
    .then( () => getElement(ct01.task_statusApply_link).click())                  //Confirmar
    .then( () => getElements(ct01.task_page_link))                                //Número de páginas de tarefas
    .then( (elements) => iteratePages(elements.length-1))                         //Iterar todas as páginas e tarefas nas paginas
    .then( () => new Promise(resolve => setTimeout(resolve, 2500)))               //Delay para a última recursão
    .then( (function(value){ assert.equal(checkTask(globalData["v_idItemCheck"]),true)}))
  });


  //Funcões CT01

  //Verifica se tarefa criada é válida
  function checkTask(taskNumber){
    var pos = taskNumber-1;
    var type = linhasINFO[pos][0];
    var status = linhasINFO[pos][1];
    var priority = linhasINFO[pos][2];
    var title = linhasINFO[pos][3];
    jsonF.ct01_readJson(globalData["v_jsonFileName"]);
    var item = jsonF.ct01_getItem(taskNumber-1);
    if(type ==  'Bug' && status == item['situacao'] && priority == item['prioridade'] && title == item['titulo']){
      return true;
    }else{
      return false;
    }
  }

  //Adicionar tarefa
  function iterateTask(tasks){
    return new Promise(function(resolve,reject){
      function timeOut() {
        waitElement(ct01.task_status_dropMenu, 3500)
        .then( () => getElement(ct01.task_title).sendKeys(tasks[0]['titulo']))
        .then( () => getElement(ct01.task_status_dropMenu).sendKeys(tasks[0]['situacao'],Key.RETURN))
        .then( () => getElement(ct01.task_priority_dropMenu).sendKeys(tasks[0]['prioridade'],Key.RETURN))
        .then( () => getElement(ct01.task_submit).click())
        .then( () => resolve(tasks));
        }
        setTimeout( timeOut, 1500);
      });
  }

  //Iterar adicionar tarefas
  function iterateTasks(tasks){
    function decide(returned){
          if(returned.length == 1) return "done";
          tasks.shift();
          return iterateTasks(tasks);
      }
      return iterateTask(tasks).then(decide);
  }

  //Pegar linha tarefa
  function iterateLine(nlinha){
    return new Promise(function(resolve,reject){
        getLinhas()
        .then(function (linhas){
            var itemT = [];
            linhas[linhas.length-1-nlinha].findElement(getLocator(ct01.task_tipo_coluna)).getText()
            .then( (val) =>  itemT.push(val))
            .then( () => linhas[linhas.length-1-nlinha].findElement(getLocator(ct01.task_situacao_coluna)).getText())
            .then( (val) =>  itemT.push(val))
            .then( () => linhas[linhas.length-1-nlinha].findElement(getLocator(ct01.task_prioridade_coluna)).getText())
            .then( (val) =>  itemT.push(val))
            .then( () => linhas[linhas.length-1-nlinha].findElement(getLocator(ct01.task_titulo_coluna)).getText())
            .then( (val) =>  itemT.push(val))
            .then(()=> linhasINFO.unshift(itemT));
        })
        .then(() => resolve(nlinha))
    });
  }

  //Iterar pegar linhas tarefa
  function iterateLines(nlinhas){
      function decide(returned){
          if(returned == 0) return "done";
          return iterateLines(nlinhas-1);
      }
      return iterateLine(nlinhas).then(decide);
  }

  //Pegar pagina tarefa
  function iteratePage(npagina){
    return new Promise(function(resolve,reject){
      function timeOut() {
        getLinhas()
        .then((lines) => iterateLines(lines.length-1))
        .then(function (){
          function timeOut1(){
            if(npagina>0){
              getElement(ct01.task_nextPage_link).click();
            }
            resolve(npagina);
          }
          setTimeout( timeOut1, 1000);
        });
      }
      setTimeout( timeOut, 2500);
    });
  }

  //Iterar pegar rodas paginas tarefa
  function iteratePages(npaginas){
      function decide(returned){
          if(returned <= 0) return "done";
          return iteratePages(npaginas-1);
      }
      return iteratePage(npaginas).then(decide);
  }

  //Pegar linhas de uma tabela
  function getLinhas(){
    return new Promise(function(resolve,reject){
      driver.findElements(getLocator(ct01.task_table)).then( (l) => resolve(l));
    });
  }

});

//Funções gerais

//Pegar elementos
function getElements(elementMapping){
  var type = elementMapping[0];
  var val = elementMapping[1];
  var byf = getBy(type);
  return driver.findElements(byf(val));
}

//Pegar webdriver elemento
function getElement(elementMapping){
  return driver.findElement(getLocator(elementMapping));
}

//Pegar elemento localizador
function getLocator(elementMapping){
  var type = elementMapping[0];
  var val = elementMapping[1];
  var byf = getBy(type);
  return byf(val);
}

//Pegar webdriver by
function getBy(type){
  if(type == "class"){
    return webdriver.By.className;
  }else if(type == "id"){
    return webdriver.By.id;
  }else if(type == "name"){
    return webdriver.By.name;
  }else if(type == "xPath"){
    return webdriver.By.xpath;
  }else if(type == "linkText"){
    return webdriver.By.linkText;
  }else if(type == "tag"){
    return webdriver.By.tagName;
  }
}

//Pegar e definir dropDown
function dropDown(elementMapping,val){
  var by = elementMapping[0];
  var id = elementMapping[1];
  var type = elementMapping[2];
  if(by=="class"){
    var string = ".";
  }else if(by="id"){
    var string = "#";
  }
  var string = string+id+">option["+type+"='"+val+"']";
  return driver.findElement(webdriver.By.css(string)).click();
}
//Função espera elemento
function waitElement(elementMapping,time){
  return driver.wait(until.elementsLocated(getLocator(elementMapping)), time)
}
