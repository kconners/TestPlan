function generateUUID() {
    var d = new Date().getTime();
    if (Date.now) {
        d = Date.now(); //high-precision timer
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    // document.getElementById('uuid').innerHTML = uuid;
    return uuid;
}
function isOdd(num) {
    var OO = num % 2;
    return OO;
}

function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function loadClients(callback) {

    var THISURL = "http://" + window.location.hostname + ":" + window.location.port;

    var dd_Clients = document.getElementById("dd_clientSelect");
    var dd_Applications = document.getElementById("dd_applicationSelect");

    var length = dd_Clients.options.length;
    for (i = 0; i < length; i++) {
        dd_Clients.options[i] = null;
    }
    var Application_length = dd_Applications.options.length;
    for (i = 0; i < Application_length; i++) {
        dd_Applications.options[i] = null;
    }

    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var data = JSON.parse(this.responseText);
            for (var i = 0; i < data.clients.length; i++) {
                if (i === 0) {
                    loadApplications(data.clients[i].idnumber, callback);
                }
                // alert(data.actions[i].action);

                var option = document.createElement("option");
                option.text = data.clients[i].client;
                option.value = data.clients[i].idnumber;
                dd_Clients.add(option);

            }
        }
    });

    xhr.open("GET", THISURL + "/api/Client");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);
}


function loadClientsNoCallBack() {
    
    var dd_Clients = document.getElementById("dd_clientSelect");
    
    var length = dd_Clients.options.length;
    for (i = 0; i < length; i++) {
        dd_Clients.options[i] = null;
    }
    
    
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var data = JSON.parse(this.responseText);
            for (var i = 0; i < data.length; i++) {
                
                var option = document.createElement("option");
                option.text = data[i].name;
                option.value = data[i].id;
                dd_Clients.add(option);

            }
        }
    });

    xhr.open("GET", "/Client");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
}
function loadNavApplications(){
    
    var THISURL = "http://"+window.location.hostname + ":" +window.location.port;

    var dd_Clients = document.getElementById("dd_clientSelect");
    var dd_Applications = document.getElementById("dd_applicationSelect");
   
    var client_idnumber = dd_Clients.options[dd_Clients.selectedIndex].value;
    var length = dd_Applications.options.length;
    for (i = 0; i < length; i++) {
        dd_Applications.options[i] = null;
    }
    
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var data = JSON.parse(this.responseText);
            for (var i = 0; i < data.applications.length; i++) {
                var option = document.createElement("option");
                option.text = data.applications[i].name;
                option.value = data.applications[i].idnumber;
                dd_Applications.add(option);

            }
        }
    });

    xhr.open("GET", THISURL+"/api/Client/" + client_idnumber + "/Application");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
}
function loadApplications(client_idnumber, callback) {

    var THISURL = "http://"+window.location.hostname + ":" +window.location.port;
  
    var dd_Applications = document.getElementById("dd_applicationSelect");
  
    var length = dd_Applications.options.length;
    for (i = 0; i < length; i++) {
        dd_Applications.options[i] = null;
    }
    var application_idnumber;
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var data = JSON.parse(this.responseText);
            
            for (var i = 0; i < data.applications.length; i++) {
                // alert(data.actions[i].action);
                if (i === 0) { application_idnumber = data.applications[i].idNumber;}
                var option = document.createElement("option");
                option.text = data.applications[i].name;
                option.value = data.applications[i].idNumber;
                dd_Applications.add(option);

            }

            callback(client_idnumber, application_idnumber);
        }
    });

    xhr.open("GET", THISURL+"/api/Client/" + client_idnumber + "/Application");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);

    
    
}