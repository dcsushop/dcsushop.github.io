angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('ordersPage', {
    url: '/orderspage',
    templateUrl: 'templates/ordersPage.html',
    controller: 'ordersPageCtrl'
  })

  .state('orderPage', {
    url: '/orderpage',
	params: {
		id: ""		
},
    templateUrl: 'templates/orderPage.html',
    controller: 'orderPageCtrl'
  })

  .state('logIn', {
    url: '/loginpage',
    templateUrl: 'templates/logIn.html',
    controller: 'logInCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('shop', {
    url: '/shop',
    templateUrl: 'templates/shop.html',
    controller: 'shopCtrl'
  })

  .state('productSections', {
    url: '/sections',
	params: {
		category: ""		
},
    templateUrl: 'templates/productSections.html',
    controller: 'productSectionsCtrl'
  })

  .state('products', {
    url: '/products',
	params: {
		section: ""		
},
    templateUrl: 'templates/products.html',
    controller: 'productsCtrl'
  })

$urlRouterProvider.otherwise('/loginpage')


});