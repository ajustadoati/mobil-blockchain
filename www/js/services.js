angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])


.factory('usuarioService', ['$http', function ($http) {

  var url = 'https://www.ajustadoati.com:9000/ajustadoati/usuario/';

  var usuarioService ={};

    usuarioService.saveUsuario = function (usuario) {
    		console.log("Service: Guardando Usuario");
        return $http.post(url, usuario);
    };

    usuarioService.getUserByUserAndLogin = function (usuarioLogin) {
        console.log("Service: getting User");
        return $http.post(url+"login/", usuarioLogin);
    };

    usuarioService.getUserByUser = function (user) {
        console.log("Service: getting User:"+user);
        return $http.get(url+user);
    };

    usuarioService.getUsuarios = function () {
        return $http.get(url);
    };

    usuarioService.addContactToUser = function (contact, user) {
        return $http.get(url+user+"/contacto/"+contact);
    };
    
    return usuarioService;
  
  
}])

.factory('dispositivoService', ['$http', function ($http) {

  var url = 'https://www.ajustadoati.com:9000/ajustadoati/dispositivo/';

  var dispositivoService ={};

    dispositivoService.saveDispositivo = function (dispositivo) {
            console.log("Service: Saving device");
        return $http.post(url, dispositivo);
    };

    dispositivoService.getDispositivoByUuid = function (uuid) {
        console.log("Service: Getting device");
        return $http.post(url+"login/", uuid);
    };

    dispositivoService.getListDispositivoByUsuario = function (usuario) {
        console.log("Service: Getting device:"+usuario);
        return $http.get(url+"usuario/"+usuario);
    };
    
    
    return dispositivoService;
  
  
}])

.factory('proveedorService', ['$http', function ($http) {

  var url = 'https://www.ajustadoati.com:9000/ajustadoati/proveedor/';

  var proveedorService ={};

  proveedorService.saveProveedor = function (proveedor) {
  		console.log("Service: Guardando Proveedor");
        return $http.post(url, proveedor);
    };

    proveedorService.getProveedores = function () {
        return $http.get(url);
    };

     proveedorService.getProveedoresByCategoria = function (categoria) {
        return $http.get(url+"categoria/"+categoria);
    };

return proveedorService;
  
  
}])
.factory('consultaService', ['$http', function ($http) {

  var url = 'https://www.ajustadoati.com:9000/ajustadoati/consulta/';

  var consultaService ={};

  consultaService.saveConsulta = function (consulta) {
        console.log("Service: Guardando Proveedor");
        return $http.post(url, consulta);
    };

    consultaService.getConsultaByUser = function (user) {
        console.log("Service: Buscando consultas"+user);
        return $http.get(url+user);
    };

    

return consultaService;
  
  
}])
.factory('categoriaService', ['$http', function ($http) {
console.log("Service: Getting gategorias")
    var url = 'https://www.ajustadoati.com:9000/ajustadoati/categoria/';

    var categoriaService ={};

    categoriaService.getCategorias = function () {
        return $http.get(url);
    };

    return categoriaService;
  
  
}])
.factory('MapService', function ($cordovaGeolocation, $ionicPopup) {

    var markerId = 0;

    function create(latitude, longitude, data) {
        console.log("creando ubicacion"+latitude);
        console.log("creando ubicacion"+longitude);
        console.log("creando ubicacion"+data);
        var marker = {
            options: {
                animation: 1,
                labelAnchor: "28 -5",
                labelClass: 'markerlabel'    
            },
            latitude: latitude,
            longitude: longitude,
            nombre: data.nombre,
            telefono:data.telefono,
            mensaje:data.mensaje,
            usuario:data.usuario,
            id: ++markerId          
        };
        return marker;        
    }

    function getPosition(latitude, longitude) {
        var position = {
            
            latitude: latitude,
            longitude: longitude,
                    
        };
        return position;        
    }

    function getCurrentLocation(successCallback) {
        console.log("current position");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var marker = create(position.coords.latitude, position.coords.longitude);
                invokeSuccessCallback(successCallback, marker);
            });
        } else {
            alert('Unable to locate current position');
        }
    }
    function invokeSuccessCallback(successCallback, marker) {
        console.log("invokeSuccessCallback: "+marker.nombre);
        if (typeof successCallback === 'function') {
            successCallback(marker);
        }
    }

    function createByCoords(latitude, longitude, data, successCallback) {
        console.log("createbycoords: "+latitude);
        console.log("createbycoords: "+longitude);
        console.log("createbycoords: "+data);
        var marker = create(latitude, longitude, data);
        console.log("createbycoords: "+marker);
        invokeSuccessCallback(successCallback, marker);
        console.log("createbycoords after: "+marker.latitude);
    }

    function createByAddress(address, successCallback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address' : address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var firstAddress = results[0];
                var latitude = firstAddress.geometry.location.lat();
                var longitude = firstAddress.geometry.location.lng();
                var marker = create(latitude, longitude);
                invokeSuccessCallback(successCallback, marker);
            } else {
                alert("Unknown address: " + address);
            }
        });
    }

    function createByCurrentLocation(successCallback) {
        console.log("cargando posicion");
         var options = {timeout: 10000, enableHighAccuracy: true};

        $cordovaGeolocation.getCurrentPosition(options).then(function(position){
            var usuario = {
                    mensaje:"mensaje",
                    nombre:"usuario-ajustado",
                    telefono:"555-555",
                    usuario:"usuario-ajustado",
                    id: "dataid"          
                };
            var marker = create(position.coords.latitude, position.coords.longitude, usuario);
                invokeSuccessCallback(successCallback, marker);
        
       
        }, function(err) {
            var alertPopup = $ionicPopup.alert({
                title: 'No se ha podido obtener la ubicaci&oacute;n',
                template: 'Por favor intenta de nuevo!'
              });
        
        });
      
    }


    

    return {
        getCurrentLocation: getCurrentLocation,
        createByCoords: createByCoords,
        createByAddress: createByAddress,
        createByCurrentLocation: createByCurrentLocation
        
    };

})



.service('BlankService', [function(){

}])

.factory('Peticiones', ['$rootScope', '$state', 'consultaService', function($rootScope, $state, consultaService){
    PeticionObj={};
    consultas=[];

    PeticionObj.peticiones=[];

    PeticionObj.getAll = function() {
        console.log("Buscando consultas by user");
        
        return PeticionObj.peticiones;
    }
    PeticionObj.getConsultas = function(user) {
        console.log("Get consultas"+user);
        loadConsultasByUser(user);
    }

     PeticionObj.deleteAll = function() {
        
        PeticionObj.peticiones=[];
    }


    loadConsultasByUser = function(user) {
        consultaService.getConsultaByUser(user).success(function (data) {
            console.log("consultas: "+data.lenth);
            for (var i = 0; i < data.length; i++) {
                console.log("consulta: "+data[i].usuario.user);
                var us = data[i].usuario.user;
                if(us == "anonimo"){
                    console.log("recibiendo usuario: "+us)
                    us = "admin"
                }
                var d = new Date();
                d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
                var peticion={
                    code:data[i].producto.id, 
                    user:us,
                    text:data[i].producto.nombre,
                    latitud:data[i].usuario.latitud,
                    longitud:data[i].usuario.longitud,
                    time: d
                  };
                  PeticionObj.peticiones.push(peticion);
          }
        });
    }

    PeticionObj.addPeticion = function(peticion){
        console.log("addin request:"+peticion.user);
        PeticionObj.peticiones.push(peticion);
    }


    PeticionObj.removePeticion= function(peticion) {
        PeticionObj.peticiones.splice(PeticionObj.peticiones.indexOf(peticion), 1);
    }

    PeticionObj.getPeticion= function(code) {
        console.log("Service: getPeticion: "+code)
        for (var i = 0; i < PeticionObj.peticiones.length; i++) {
            if (PeticionObj.peticiones[i].code == code) {
              return PeticionObj.peticiones[i];
            }
          }
    }   
    
    return PeticionObj;


}])

.factory('Chats', ['sharedConn','$rootScope','$state', function(sharedConn,$rootScope,$state){
    
    ChatsObj={};
    
    connection=sharedConn.getConnectObj();
    ChatsObj.roster =[];
    ChatsObj.messages =[];

    loadRoster = function() {
            var iq = $iq({type: 'get'}).c('query', {xmlns: 'jabber:iq:roster'});
                
                connection.sendIQ(iq, 
                    //On recieve roster iq
                    function(iq) {
                        
                        console.log(iq);
                        ChatsObj.iq=iq;
                        if (!iq || iq.length == 0)
                            return;
                        
                        //jquery load data after loading the page.This function updates data after jQuery loading
                        $rootScope.$apply(function() {
                            
                            $(iq).find("item").each(function(){
                                
                                ChatsObj.roster.push({
                                    id: $(this).attr("jid").split("@")[0],
                                    name:  $(this).attr("name") || $(this).attr("jid").split("@")[0],
                                    lastText: 'Disponible',
                                    face: 'img/ben.png'
                                });
                
                            });                     
                        
                        }); 
                            
                    });
                    // set up presence handler and send initial presence
                    connection.addHandler(
                        //on recieve precence iq
                        function (presence){        
                           /*var presence_type = $(presence).attr('type'); // unavailable, subscribed, etc...
                           var from = $(presence).attr('from'); // the jabber_id of the contact
                           if (presence_type != 'error'){
                             if (presence_type === 'unavailable'){
                                console.log("offline"); //alert('offline');
                             }else{
                               var show = $(presence).find("show").text(); // this is what gives away, dnd, etc.
                               if (show === 'chat' || show === ''){
                                 console.log("online"); //alert('online');
                               }else{
                                 console.log("etc");//alert('etc');
                               }
                             }
                           }
                           */
                           return true;
                        }
                    , null, "presence");
                    
                    connection.send($pres());       
            
                    connection.addHandler(
                        //on recieve update roster iq
                        function(iq) {
                            
                            console.log(iq);
                            
                            if (!iq || iq.length == 0)
                                return;
                            
                            //jquery load data after loading the page.This function updates data after jQuery loading
                            $rootScope.$apply(function() {
                                
                                $(iq).find("item").each(function(){
                                    
                                    //roster update via Client 1(ie this client) accepting request
                                    if($(this).attr("subscription")=="from"){
                                        console.log("obteniendo jid");
                                        ChatsObj.roster.push({
                                            id: $(this).attr("jid").split("@")[0],
                                            name:  $(this).attr("name") || $(this).attr("jid"),
                                            lastText: 'Available to Chat',
                                            face: 'img/ben.png'
                                        });
                                    }
                                    // Waiting for the Client 2 to accept the request
                                    else if ( $(this).attr("subscription")=="none"  && $(this).attr("ask")=="subscribe" ){
                                        
                                        ChatsObj.roster.push({
                                            id: $(this).attr("jid").split("@")[0],
                                            name:  $(this).attr("name") || $(this).attr("jid"),
                                            lastText: 'Esperando aceptaci&oacute;n',
                                            face: 'img/ben.png'
                                        });
                                        
                                        
                                    }

                                    //roster update via Client 2 deleting the roster contact
                                    else if($(this).attr("subscription")=="none"){ 
                                        console.log( $(this).attr("jid")  );
                                        ChatsObj.removeRoster( ChatsObj.getRoster( $(this).attr("jid").split("@")[0] ) );
                                    }
                                    
                                });
                                $state.go('tabsController.favoritos', {}, {location: "replace", reload: true});
                            
                            }); 
                                
                        }

                    ,"jabber:iq:roster", "iq", "set");
                                    
        
                    return ChatsObj.roster;
                    
    }   
                
 

    ChatsObj.allRoster= function() {
        loadRoster();
        return ChatsObj.roster;
    }

     ChatsObj.getAllRoster= function() {
        console.log("roster lenght: "+ChatsObj.roster.length)
        if(ChatsObj.roster.length > 0)
            return ChatsObj.roster;
        else
            return 0;
    }

    ChatsObj.addMessage = function(msg){
        console.log("addin message:"+msg);
        ChatsObj.messages.push(msg);
    }
    ChatsObj.getMessages= function() {
        
        return ChatsObj.messages;
    }
 
     ChatsObj.getId= function() {
        
        return ChatsObj.iq;
    }
 
 

    ChatsObj.removeRoster= function(chat) {
        ChatsObj.roster.splice(ChatsObj.roster.indexOf(chat), 1);
    }

    ChatsObj.getRoster= function(chatId) {
        for (var i = 0; i < ChatsObj.roster.length; i++) {
            if (ChatsObj.roster[i].id == chatId) {
              return ChatsObj.roster[i];
            }
          }
    }
    
    
   ChatsObj.addNewRosterContact=function(to_id){
        console.log("agregando usuario: "+to_id);
        connection.send($pres({ to: to_id+"@ajustadoati.com" , type: "subscribe" }));
        console.log("Respuesta: ");      
    }
        
    
    return ChatsObj;
  

}])

//within sharedConn service we are using 
/*
$state for forwarding to another page
$rootScope for accessing broadcast function
$ionicPopup for making Responsive Popups 
*/
.factory('sharedConn', ['$ionicPopup','$state','$rootScope','$ionicPopup', '$timeout','Peticiones', 'dispositivoService', '$cordovaDevice',function($ionicPopup,$state, $rootScope , $ionicPopup, $timeout, Peticiones, dispositivoService, $cordovaDevice){
    console.log("SharedConn");
    //Declaring the SharedConnObj which will be returned when we call sharedConn
    var SharedConnObj={};
    // Setting up the variables
    SharedConnObj.BOSH_SERVICE = 'https://ajustadoati.com:7443/http-bind/';  
    SharedConnObj.connection   = null;    // The main Strophe connection object.
    SharedConnObj.loggedIn=false;
    //------------------------------------------HELPER FUNCTIONS---------------------------------------------------------------
    SharedConnObj.getConnectObj=function(){
        return SharedConnObj.connection; 
    };
    SharedConnObj.isLoggedIn=function(){
        return SharedConnObj.loggedIn; 
    };
    //The jabber id ie user id will be usually of the form admin@xvamp\convertsdfs 
    // We only need the part admin@xvamp
    //So we take the substring to get only admin@xvamp
    SharedConnObj.getBareJid=function(){     
        var str=SharedConnObj.connection.jid;
        str=str.substring(0, str.indexOf('/'));
        return str;
    };

    
    //--------------------------------------***END HELPER FUNCTIONS***----------------------------------------------------------
    //Login Function
    SharedConnObj.login=function (jid,host,pass) { 
        console.log("jid"+jid);
        console.log("pass"+pass);  
        //Strophe syntax
        // We are creating Strophe connection Object
        SharedConnObj.connection = new Strophe.Connection( SharedConnObj.BOSH_SERVICE , {'keepalive': true});  // We initialize the Strophe connection.
        SharedConnObj.connection.connect(jid+'@'+host, pass , SharedConnObj.onConnect);  
        //Here onConnect is the callback function
        //ie after getting the response for connect() function onConnect() is called with the response
    };
    //On connect XMPP
    SharedConnObj.onConnect=function(status){
        //Self explanatory 
        if (status == Strophe.Status.CONNECTING) {
            console.log('Strophe is connecting.');
        } else if (status == Strophe.Status.CONNFAIL) {
            console.log('Strophe failed to connect.');
        } else if (status == Strophe.Status.DISCONNECTING) {
            console.log('Strophe is disconnecting.');
        } else if (status == Strophe.Status.DISCONNECTED) {
            console.log('Strophe is disconnected.');
        } else if (status == Strophe.Status.CONNECTED) {  
            console.log('Strophe is connected.');      
            //The connection is established. ie user is logged in 
            // We are adding handler function for accetping message response
            //ie handler function  [ onMessage() ]  will be call when the user recieves a new message 
            SharedConnObj.connection.addHandler(SharedConnObj.onMessage, null, 'message', null, null ,null);

            //Setting our presence in the server. so that everyone can know that we are online
            SharedConnObj.connection.send($pres().tree());

            SharedConnObj.loggedIn=true;

            //Handler function for handling new Friend Request
            SharedConnObj.connection.addHandler(SharedConnObj.on_subscription_request, null, "presence", "subscribe");

            //Now finally go the Chats page  
            var userJ = SharedConnObj.getBareJid().split("@");
            var userJID = SharedConnObj.getBareJid().split("@")[0];
            console.log("pass the login"+userJID);
            //validateDevice(userJID);

            Peticiones.getConsultas(userJID);
           
            $state.go('tabsController.favoritos', {}, {location: "replace", reload: true});

        }else{
             var alertPopup = $ionicPopup.alert({
                title: 'Usuario o clave incorrecto',
                template: 'Por favor intenta de nuevo!'
              });
        }
    };
    //When a new message is recieved
    SharedConnObj.onMessage=function(msg){
        console.log('receiving message from: '+msg);
        console.log("current state:"+$state.current.name);
        var elems = msg.getElementsByTagName('body');
        var body = elems[0];
        var textMsg = Strophe.getText(body);
        var d = new Date();
        d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
        var user = msg.getAttribute("from").split("@")[0];
          console.log("admin receive:"+textMsg);
          var all = textMsg.split("---");
          var code = all[0];
          var text = all[1];
          var latitud = all[2];
          var longitud = all[3];
        //Here we will braodcast that we have recieved a message.
        //This broadcast will be handled in the 'Chat Details controller'
        //In broadcast we are also sending the message
        //$state.go('tabsController.mensajeDetalle', {}, {location: "replace", reload: true});
        //callBroadcast(msg);
        //Chats.addMessage(message);
        console.log("user: "+user);

        if(user == "admin"){
            var d = new Date();
            d = d.toLocaleTimeString().replace(/:\d+ /, ' ');


            var peticion={
                code:code, 
                user:user,
                text: text,
                latitud:latitud,
                longitud:longitud,
                time: d
              };
            console.log("el usuario es admin: "+peticion.user);
            PeticionObj.addPeticion({
                code:code, 
                user:user,
                text: text,
                latitud:latitud,
                longitud:longitud,
                time: d
              });
            /* if($state.current.name == "tabsController.peticionDetalle"){
                PeticionObj.addPeticion(peticion);
            }else{
                var confirmPopup = $ionicPopup.confirm({
                            title: 'Mensaje de: Administrador',
                            template: ' ' + text
                        });
                        // Yes or No option
                        confirmPopup.then(function(res) {
                            if(res) {
                                PeticionObj.addPeticion(peticion);
                                $rootScope.$broadcast('msgRecievedBroadcastAdmin', msg);
                              } else {

                                PeticionObj.addPeticion(peticion);
                            }
                        });
            }*/

            
        }else {
            if($state.current.name == "tabsController.detalleChat"){
                console.log("si entra al tabs");
                $rootScope.$broadcast('msgRecievedBroadcast2', msg);
            }else{
                var confirmPopup = $ionicPopup.confirm({
                        title: 'Mensaje de:'+msg.getAttribute("from"),
                        template: ' ' + textMsg
                    });
                    // Yes or No option
                    confirmPopup.then(function(res) {
                        if(res) {
                            callBroadcast(msg);
                          } else {
                       
                        }
                    });
            }
        }
        return true;
    };

    callBroadcast = function(data) { 
        console.log("llamando broadcast");
        $timeout(function(){
            $rootScope.$broadcast('msgRecievedBroadcast', data);
        });
    }

    findDeviceByUuidAndUser=function(uuid, usuario){
        
        console.log("Find by user and uuid: "+uuid);
        dispositivoService.getListDispositivoByUsuario(usuario).success(function (data) {
            
            if(data.length > 0 && data != 'undefined'){
                console.log("si hay data");
                dispositivos = data;
                var encontrado = false;
                for(var i=0; i<dispositivos.length; i++){
                    console.log("reading devices"+dispositivos[i].uuid);
                    console.log("reading devices2"+uuid);
                    if(dispositivos[i].uuid==uuid){
                        encontrado=true;
                        return;
                    }
                }
                if(!encontrado){
                    console.log("device not registered")
                        var dispositivo={
                            "tipo":$cordovaDevice.getPlatform(),
                            "nombre":$cordovaDevice.getModel(),
                            "uuid":uuid
                        };
                        var dispositivoUsuario={"dispositivo":dispositivo,"usuario":usuario}
                        dispositivoService.saveDispositivo(dispositivoUsuario);
                    
                }
            }else{
                console.log("device not registered")
                        var dispositivo={
                            "tipo":$cordovaDevice.getPlatform(),
                            "nombre":$cordovaDevice.getModel(),
                            "uuid":uuid
                        };
                        var dispositivoUsuario={"dispositivo":dispositivo,"usuario":usuario}
                        dispositivoService.saveDispositivo(dispositivoUsuario);
            }
                
            }).
            error(function(error) {
                $scope.status = 'Unable to get device list: ' + error.message;
        });  
        

    }
    /*validateDevice = function(usuario){

        console.log("get device data"+usuario);
        var dispositivos=[];
        var uuid="";
        window.plugins.OneSignal.addSubscriptionObserver(function (state) {
          if (!state.from.subscribed && state.to.subscribed) {
            console.log("Subscribed for OneSignal push notifications!")
            // get player ID
            uuid=state.to.userId;
          }
            if(uuid != ""){
                findDeviceByUuidAndUser(uuid,usuario);
            }   

          console.log("Push Subscription state changed: " + JSON.stringify(state));
        });

        

        console.log($cordovaDevice.getModel());
        console.log($cordovaDevice.getPlatform());
        
    }*/
    



    SharedConnObj.register=function (jid,pass,name) {
        //to add register function
    };
    //Logout funcion
    SharedConnObj.logout=function () {
        console.log("logout called"); 
        if(SharedConnObj.connection != null){
            SharedConnObj.connection.options.sync = true; // Switch to using synchronous requests since this is typically called onUnload.
            SharedConnObj.connection.flush();  //Removes all the connection variables
            SharedConnObj.connection.disconnect(); //Disconnects from the server
        } //In chrome you can use console.log("TEXT") for dubugging
        
    };

    SharedConnObj.on_subscription_request = function(stanza){
        console.log(stanza);  //Debuggin
        //Handling subscribe request ... ie freind request
        if(stanza.getAttribute("type") == "subscribe" && !is_element_map(stanza.getAttribute("from")) )
        {               
            //the friend request is recieved from Client 2
            //Creats a ionic popup
            var confirmPopup = $ionicPopup.confirm({
                title: 'Confirmar solicitud de amistad!',
                template: ' ' + stanza.getAttribute("from")+' quiere ser tu contacto'
            });
            // Yes or No option
            confirmPopup.then(function(res) {
                if(res) {
                //Inorder to say that you have accepted their friend request, you just have to send them a 'presence' with 'type = subscribed'
                SharedConnObj.connection.send($pres({ to: stanza.getAttribute("from") , type: "subscribed" })); 
                //Adds the accepted jabber id to the map
                push_map( stanza.getAttribute("from") ); 
                } else {
                // Rejected the Friend Request
                SharedConnObj.connection.send($pres({ to: stanza.getAttribute("from") , type: "unsubscribed" }));
                }
            });
            return true;
        }
    }
    //---------------------Helper Function------------------------------
    //This is used as a helper function for on_subscription_request
    // These functions ensure that you dont need to accept the friend request of a person again and again.
    //Basically we are adding the accepted friends jabber id to a map, and checking if the new friend request is alredy accpeted or not.
    var accepted_map={};  //store all the accpeted jid
    //Check if the jabber id is in the map
    function is_element_map(jid){
    if (jid in accepted_map) {return true;} 
        else {return false;}    
    }
    //Adds jabber id into the map
    function push_map(jid){
        accepted_map[jid]=true;
    }
    //--------------------------------------------
    //Finally returns  the SharedConnObj
    return SharedConnObj;
}])
.factory('ChatDetails', ['sharedConn','$rootScope', function(sharedConn,$rootScope){
    ChatDetailsObj={};
    
    ChatDetailsObj.setTo = function(to_id){
        ChatDetailsObj.to=to_id;
    }
    ChatDetailsObj.getTo = function(){
        return ChatDetailsObj.to;
    }
    
    return ChatDetailsObj;  
}]);



