module.exports = {
  //----------------------------MAPEAMENTO---------------------------
  //Registrar usuário
  register_link             : ["class"    , "register"],
  user_login_input          : ["id"       , "user_login"],
  user_password_input       : ["id"       , "user_password"],
  user_confirmation_input   : ["id"       , "user_password_confirmation"],
  user_fistName_input       : ["id"       , "user_firstname"],
  user_lastName_input       : ["id"       , "user_lastname"],
  user_mail_input           : ["id"       , "user_mail"],
  register_submit           : ["name"     , "commit"],
  language_dropMenu         : ["id"       , "user_language", "value"],
  login_username_link       : ["xPath"    , "//*[@id=\"sidebar\"]/p[1]/strong/a"],
  login_hideMail_checkB     : ["id"       , "pref_hide_mail"],
  //Logout
  logout_link               : ["class"    , "logout"],

  //Login
  login_link                : ["class"    , "login"],
  login_username_input      : ["id"       , "username"],
  login_password_input      : ["id"       , "password"],
  login_enter_btn           : ["name"     , "login"],
  login_username_link1      : ["xPath"    , "//*[@id=\"loggedas\"]/a"],


  //Projetos
  projects_link             : ["class"    , "projects"],
  projects_newProject_link  : ["xPath"    , "//*[@id='content']/div[1]/a[1]"],
  projects_name_input       : ["id"       , "project_name"],
  projects_id_input         : ["id"       , "project_identifier"],
  projects_bugs_checkB      : ["xPath"    , "//*[@id=\"project_trackers\"]/label[1]/input"],
  projects_feature_checkB   : ["xPath"    , "//*[@id=\"project_trackers\"]/label[2]/input"],
  projects_support_checkB   : ["xPath"    , "//*[@id=\"project_trackers\"]/label[3]/input"],
  project_submit_btn        : ["name"     , "commit"],
  project_name_link         : ["linkText" , "-"],
  project_newTask_link      : ["xPath"    , "//*[@id=\"main-menu\"]/ul/li[4]/a"],

  //Tarefas
  task_link                 : ["xPath"    ,"//*[@id=\"main-menu\"]/ul/li[3]/a"],
  task_title                : ["id"       ,"issue_subject"],
  task_status_dropMenu      : ["id"       ,"issue_status_id", "value"],
  task_priority_dropMenu    : ["id"       ,"issue_priority_id", "value"],
  task_submit               : ["name"     ,"continue"],
  task_statusGrid_dropMenu  : ["id"       ,"operators_status_id","value"],
  task_statusApply_link     : ["xPath"    ,"//*[@id=\"query_form_with_buttons\"]/p/a[1]"],
  task_nextPage_link        : ["class"    ,"next"],
  task_table                : ["xPath"    ,"//*[@id=\"content\"]/form[2]/div/table/tbody/tr"],
  task_newtask_link         : ["xPath"    ,"/html/body/div[1]/div/div[1]/div[2]/div[2]/ul/li[4]/a"],
  task_redming_link         : ["xPath"    ,"//*[@id=\"footer\"]/div/div/a"],
  task_tipo_coluna          : ["class"    ,"tracker"],
  task_situacao_coluna      : ["class"    ,"status"],
  task_prioridade_coluna    : ["class"    ,"priority"],
  task_titulo_coluna        : ["class"    ,"subject"],
  task_nextPage_link        : ["class"    ,"next"],
  task_page_link            : ["class"    ,"page"],

  //--------------------------VARIAVEIS DE TESTE---------------------------
  v_url                     : "http://demo.redmine.org/",
  v_name                    : "camposiki",
  v_password                : "1234321",
  v_firstName               : "carlos",
  v_lastName                : "campos",
  v_mail                    : "carloscamposiki@gmail.com",
  v_linguagem               : "pt-BR",
  v_projectName             : "Projeto Auto Teste 36",
  v_projectId               : "camposiki_36",
  v_jsonFileName            : "massa_dados_1.json",
  v_idItemCheck             : "29",
  v_listtask                : "*" //Todos
};
