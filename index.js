var assert = require('assert');
var webdriver = require('selenium-webdriver');

//var until = webdriver.until;
var by = webdriver.By;
const {Key, until} = require('selenium-webdriver');


describe('Caso de teste 01:', function() {
  //Variáveis CT01
  var ct01 = require('./ct01_config');
  var jsonF = require('./json_functions');
  var linhasINFO = [];

  /*
  before(function(){

  });

  afterEach(function(done){
    driver.quit();
  });
  */

  it('should work', function(done) {
      driver = new webdriver.Builder().
      withCapabilities(webdriver.Capabilities.firefox()).
      build();

      //1. Acesando ambiente
      driver.then(d => d.get(ct01.v_url))

      //2. Registrando usuário
      .then( () => getElement(ct01.register_link).click())
      .then( () => getElement(ct01.user_login_input).sendKeys(ct01.v_name))
      .then( () => getElement(ct01.user_password_input).sendKeys(ct01.v_password))
      .then( () => getElement(ct01.user_confirmation_input).sendKeys(ct01.v_password))
      .then( () => getElement(ct01.user_fistName_input).sendKeys(ct01.v_firstName))
      .then( () => getElement(ct01.user_lastName_input).sendKeys(ct01.v_lastName))
      .then( () => getElement(ct01.user_mail_input).sendKeys(ct01.v_mail))
      .then( () => dropDown(ct01.language_dropMenu,ct01.v_linguagem))
      .then( () => getElement(ct01.register_submit).click())

      //3. Validar usuário criado
      .then( () => waitElement(ct01.login_hideMail_checkB, 5000))
      .then( () => getElement(ct01.user_fistName_input).getAttribute("value"))
      .then( function(value){ assert.equal(value, ct01.v_firstName)})                   //Valida primeiro nome
      .then( () => getElement(ct01.user_lastName_input).getAttribute("value"))
      .then( function(value){ assert.equal(value, ct01.v_lastName)})                    //Valida ultimo nome
      .then( () => getElement(ct01.user_mail_input).getAttribute("value"))
      .then( function(value){ assert.equal(value, ct01.v_mail)})                        //Valida email
      .then( () => getElement(ct01.login_username_link).getText())
      .then( function(value){ assert.equal(value, ct01.v_name)})                        //Valida username
      .then( () => getElement(ct01.language_dropMenu).getAttribute("value"))
      .then( function(value){ assert.equal(value, ct01.v_linguagem)})                   //Valida email

      //4. Logout
      .then( () => getElement(ct01.logout_link).click())

      //5. Login
      .then( () => getElement(ct01.login_link).click())
      .then( () => getElement(ct01.login_username_input).sendKeys(ct01.v_name))
      .then( () => getElement(ct01.login_password_input).sendKeys(ct01.v_password))
      .then( () => getElement(ct01.login_enter_btn).click())

      //6. Valide login usuario
      .then( () => getElement(ct01.login_username_link1).getText())
      .then( function(value){ assert.equal(value, ct01.v_name)})                        //Valida login

      //7. Criar novo projeto
      .then( () => getElement(ct01.projects_link).click())
      .then( () => getElement(ct01.projects_newProject_link).click())
      .then( () => getElement(ct01.projects_name_input).sendKeys(ct01.v_projectName))
      .then( () => getElement(ct01.projects_id_input).clear())
      .then( () => getElement(ct01.projects_id_input).sendKeys(ct01.v_projectId))
      .then( () => getElement(ct01.projects_feature_checkB).click())
      .then( () => getElement(ct01.projects_support_checkB).click())
      .then( () => getElement(ct01.project_submit_btn).click())

      //8. Valide criação de projeto
      .then( () => getElement(ct01.projects_name_input).getAttribute("value"))
      .then( function(value){ assert.equal(value, ct01.v_projectName)})               //Valida nome projeto
      .then( () => getElement(ct01.projects_id_input).getAttribute("value"))
      .then( function(value){ assert.equal(value, ct01.v_projectId)})                 //Valida id projeto
      .then( () => getElement(ct01.projects_bugs_checkB).getAttribute("checked"))
      .then( function(value){ assert.equal(value, "true")})                           //Valida se 'bug' está 'checked'
      .then( () => getElement(ct01.projects_feature_checkB).getAttribute("checked"))
      .then( function(value){ assert.equal(value, null)})                             //Valida se 'feature' está 'unchecked'
      .then( () => getElement(ct01.projects_support_checkB).getAttribute("checked"))
      .then( function(value){ assert.equal(value, null)})                             //Valida se 'support' está 'unchecked'

      //9. Acessar projetos
      .then( () => getElement(ct01.projects_link).click())

      //10. Acessar projeto criado
      .then( () => ct01.project_name_link[1]=ct01.v_projectName)
      .then( () => getElement(ct01.project_name_link).click())


      //11. Aba nova tarefa
      .then( () => getElement(ct01.project_newTask_link).click())

      //12. Criar tarefas massa de daddos
      .then( () => jsonF.ct01_readJson(ct01.v_jsonFileName))                         //Lê json de dados
      .then( () => jsonF.ct01_getAll())                                              //Pega todas as tarefas
      .then( (itens) => iterateTasks(itens))                                         //Adiciona todas as tarefas no projeto
      .then( () => new Promise(resolve => setTimeout(resolve, 5000)))                //Delay para a última recursão

      //13. Aba tarefas
      .then( () => getElement(ct01.task_link).click())

      //14. Validação item
      .then( () => dropDown(ct01.task_statusGrid_dropMenu,ct01.v_listtask))         //Listar todas as tarefas
      .then( () => getElement(ct01.task_statusApply_link).click())                  //Confirmar
      .then( () => getElements(ct01.task_page_link))                                //Número de páginas de tarefas
      .then( (elements) => iteratePages(elements.length-1))                         //Iterar todas as páginas
      .then( () => new Promise(resolve => setTimeout(resolve, 5000)))               //Delay para a última recursão
      .then( () => console.log("size" + linhasINFO[0][0]))


      //
      //Verifição final
      //
      .then( () => driver.quit());
      done();
  });

  //Funcões CT01

  //Adicionar tarefa
  function iterateTask(tasks){
    return new Promise(function(resolve,reject){
      function timeOut() {
        driver.wait(until.elementsLocated(getLocator(ct01.task_redming_link)), 3000)
        .then( () => getElement(ct01.task_title).sendKeys(tasks[0]['titulo']))
        .then( () => dropDown(ct01.task_status_dropMenu,tasks[0]['situacao']))
        .then( () => dropDown(ct01.task_priority_dropMenu,tasks[0]['prioridade']))
        .then( () => getElement(ct01.task_submit).click())
        .then( () => resolve(tasks));
        }
        setTimeout( timeOut, 5000);
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
      function timeOut() {
        getLinhas()
        .then(function (linhas){
            var itemT = [];
            linhas[nlinha].findElement(getLocator(ct01.task_tipo_coluna)).getText()
            .then( (val) =>  itemT.push(val))
            .then( () => linhas[nlinha].findElement(getLocator(ct01.task_situacao_coluna)).getText())
            .then( (val) =>  itemT.push(val))
            .then( () => linhas[nlinha].findElement(getLocator(ct01.task_prioridade_coluna)).getText())
            .then( (val) =>  itemT.push(val))
            .then( () => linhas[nlinha].findElement(getLocator(ct01.task_titulo_coluna)).getText())
            .then( (val) =>  itemT.push(val))
            .then(()=> linhasINFO.push(itemT));
        })
        .then(() => resolve(nlinha))
        }
        setTimeout( timeOut, 100);
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
      setTimeout( timeOut, 5000);
    });
  }

  //Iterar pegar rodas paginas tarefa
  function iteratePages(npaginas){
      console.log(npaginas)
      function decide(returned){
          if(returned == 0) return "done";
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
  driver.findElement(webdriver.By.css(string)).click();
}

//Função espera elemento
function waitElement(elementMapping,time){
  driver.wait(until.elementsLocated(getLocator(elementMapping)), time)
}
