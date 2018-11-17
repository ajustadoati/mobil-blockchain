angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider, $translateProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  localStorageServiceProvider
      .setPrefix('Ajustadoati')
      .setStorageType('localStorage');
  $stateProvider
    
      
        
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

    .state('registro', {
      url: '/homeRegister',
      templateUrl: 'templates/registro.html',
      controller: 'registroCtrl'
    })

    .state('registroVendedor', {
      url: '/serverRegister',
      templateUrl: 'templates/registroVendedor.html',
      controller: 'registroVendedorCtrl'
    })
    .state('registroUsuario', {
      url: '/userRegister',
      templateUrl: 'templates/registroUsuario.html',
      controller: 'registroUsuarioCtrl'
    })

    .state('busqueda', {
      url: '/searchItem',
      templateUrl: 'templates/busqueda.html',
      controller: 'busquedaCtrl'
    })

    

    .state('resultadoBusqueda', {
      url: '/searchResult',
      templateUrl: 'templates/resultadoBusqueda.html',
      controller: 'resultadoBúSquedaCtrl'
    })

    .state('tabsController.solicitudes', {
      url: '/requests',
      cache:true,
      params:{
            mensaje:null
      },
      views: {
        'tab4': {
          templateUrl: 'templates/busqueda.html',
          controller: 'busquedaCtrl'
        }
      }
    })

    .state('tabsController.peticion', {
      url: '/peticion',
      views: {
        'tab6': {
          templateUrl: 'templates/peticion.html',
          controller: 'peticionCtrl'
        }
      }
    })

    .state('tabsController.peticionDetalle', {
      url: '/peticionDetalle',
      cache:true,
      params:{
            peticion:null
      },
      views: {
        'tab6': {
          templateUrl: 'templates/peticionDetalle.html',
          controller: 'peticionDetalleCtrl'
        }
      }
    })

    .state('tabsController.comerciante', {
      url: '/requests/:user',
      views: {
        'tab4': {
          templateUrl: 'templates/comerciante.html',
          controller: 'comercianteCtrl'
        }
      }
    })

    .state('tabsController.detalleChat', {
      url: '/detalleChat',
      views: {
        'tab4': {
          templateUrl: 'templates/detalleChat.html',
          controller: 'detalleChatCtrl'
        }
      }
    })

     .state('tabsController.mensajes', {
      url: '/mensajes',
      views: {
        'mensajesTab': {
          templateUrl: 'templates/mensajes.html',
          controller: 'mensajesCtrl'
        }
      }
    })

     .state('tabsController.mensajeNuevo', {
      url: '/mensajeNuevo',
      views: {
        'mensajesTab': {
          templateUrl: 'templates/mensajeNuevo.html',
          controller: 'mensajeNuevoCtrl'
        }
      }
    })

    .state('tabsController.favoritos', {
      url: '/favoritos',
      views: {
        'tab5': {
          templateUrl: 'templates/favoritos.html',
          controller: 'favoritosCtrl'
        }
      }
    })

    .state('tabsController.favoritosChat', {
      url: '/favoritosChat',
      views: {
        'tab5': {
          templateUrl: 'templates/detalleChat.html',
          controller: 'detalleChatCtrl'
        }
      }
    })

    .state('tabsController.detalleFavoritos', {
      url: '/detalleFavoritos',
      params:{
            user:null
      },
      views: {
        'tab5': {
          templateUrl: 'templates/detalleFavoritos.html',
          controller: 'detalleFavoritosCtrl',

        }
      }
    })
     .state('tabsController.infoFavorito', {
      url: '/infoFavorito',
      params:{
            user:null
      },
      views: {
        'tab5': {
          templateUrl: 'templates/infoFavorito.html',
          controller: 'infoFavoritoCtrl',

        }
      }
    })

    .state('tabsController.productos', {
      url: '/items',
      views: {
        'tab6': {
          templateUrl: 'templates/productos.html',
          controller: 'productosCtrl'
        }
      }
    })

    .state('tabsController', {
      url: '/homeVendedor',
      abstract:true,
      templateUrl: 'templates/tabsController.html',
      controller: 'tabsCtrl'
    })
 
    .state('tabsController.ajustes', {
      url: '/settings',
      views: {
        'tab7': {
          templateUrl: 'templates/ajustes.html',
          controller: 'settingsCtrl'
        }
      }
    })

    .state('tabsController2.solicitud', {
      url: '/solicitudUser',
      views: {
        'tab8': {
          templateUrl: 'templates/solicitud.html',
          controller: 'solicitudCtrl'
        }
      }
    })

    .state('tabsController2.solicitudes2', {
      url: '/solicitudesUser',
      views: {
        'tab9': {
          templateUrl: 'templates/solicitudes2.html',
          controller: 'solicitudes2Ctrl'
        }
      }
    })

    .state('tabsController2.ubicacionUsuario', {
      url: '/locationUser',
      views: {
        'tab10': {
          templateUrl: 'templates/ubicacionUsuario.html',
          controller: 'ubicacióNUsuarioCtrl'
        }
      }
    })

    .state('tabsController2', {
      url: '/homeUser',
      abstract:true,
      templateUrl: 'templates/tabsController2.html'
    })
   
    .state('tabsController2.ajustes', {
      url: '/settings',
      views: {
        'tab11': {
          templateUrl: 'templates/ajustes.html',
          controller: 'settingsCtrl'
        }
      }
    })
        
      
    
      
        
    .state('detalleResultado', {
      url: '/detailResult',
      templateUrl: 'templates/detalleResultado.html',
      controller: 'detalleResultadoCtrl'
    })

    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tab.wallets', {
        url: '/wallets',
        views: {
          'tab-wallets': {
            templateUrl: 'templates/tab-wallets.html',
            controller: 'WalletsController'
          }
        }
      }).state('tab.wallet-detail', {
        url: '/wallets/:address',
        views: {
          'tab-wallets': {
            templateUrl: 'templates/wallet-detail.html',
            controller: 'WalletDetailController'
          }
        }
      }).state('tab.transactions-history', {
        url: '/transactions/:address',
        views: {
          'tab-wallets': {
            templateUrl: 'templates/transactions-history.html',
            controller: 'TransactionsHistoryController'
          }
        }
      }).state('tab.transaction-view', {
        url: '/transaction/:transactionId',
        views: {
          'tab-wallets': {
            templateUrl: 'templates/transaction-view.html',
            controller: 'TransactionViewController'
          }
        }
      }).state('tab.new-wallet', {
        url: '/newWallet',
        views: {
          'tab-wallets': {
            templateUrl: 'templates/new-wallet.html',
            controller: 'NewWalletController'
          }
        }
      }).state('tab.price-history', {
        url: '/priceHistory',
        views: {
          'tab-price-history': {
            templateUrl: 'templates/tab-price-history.html',
            controller: 'PriceHistoryController'
          }
        }
      }).state('tab.tools', {
        url: '/tools',
        views: {
          'tab-tools': {
            templateUrl: 'templates/tab-tools.html',
            controller: 'ToolsController'
          }
        }
      }).state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: 'templates/tab-settings.html',
            controller: 'SettingsController'
          }
        }
      });
    
        
      
    

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/login');
  $urlRouterProvider.otherwise('/tab/wallets');
  $translateProvider.useStaticFilesLoader({
      prefix: 'traslations/',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');

});