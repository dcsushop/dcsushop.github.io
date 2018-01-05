angular.module('app.controllers', [])
  
.controller('ordersPageCtrl', ['dataService', '$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function (dataService, $scope, $stateParams) {
    $scope.data = [];
    var newArr;
    firebase.database().ref('newOrders').on('value', function(snapshot){
        dataService.data = snapshot.val();
        var data = snapshot.val();
        //newArr = Object.keys(data).map(function (key) { return data[key]; });
        $scope.data = data;
        $scope.$apply();
    });
    
    $scope.siteFilter = '';
    $scope.statusFilter = '';
    
    $scope.logout = function(){
        firebase.auth().signOut();
    };
    
}])
   
.controller('orderPageCtrl', ['dataService', '$scope', '$stateParams', 'Gravatar', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function (dataService, $scope, $stateParams, Gravatar) {
    $scope.data = [];
    $scope.data = dataService.data[$stateParams.id];
    // console.log($stateParams.id);
    // console.log(dataService.data[$stateParams.id].id);
    $scope.gravImg = Gravatar.get($scope.data.billing.email, 100);
//     var d = $scope.data.line_items;
//     d = "{" + d + "}";
//     d = d.replace(/\n\n/g,"},{");
//     d = d.replace(/\n/g,"\",\"");
//     d = d.replace(/NU:/g,"NU");
//     d = d.replace(/: /g,"\":\"");
//     d = d.replace(/{/g,"{\"");
//     d = d.replace(/}/g,"\"}");
    
//   // console.log(d);
//     d = JSON.parse("["+d+"]");
//     $scope.items = [];
//     $scope.items = d;
    //console.log(d);

}])
   
.controller('logInCtrl', ['$scope', '$stateParams', '$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicLoading) {
    // var myPopupScope = $rootScope.$new();
    // myPopupScope.userDetails = [];
    // myPopupScope.login2 = function() {
    //      if (myPopupScope.userDetails) logIn(myPopupScope.userDetails.useremail,myPopupScope.userDetails.userpassword);
    // };
    // myLoginPopup = $ionicPopup.show({
    //      template: '<input type = "text" placeholder = "Email Address" ng-model = "userDetails.useremail"><br/><input type = "password" placeholder = "Password" ng-enter="login2()" ng-model = "userDetails.userpassword">',
    //      title: 'Login',
    //      subTitle: 'You must be a registered user to view this information!',
    //      scope: myPopupScope,
    //      buttons: [
    //         {
    //           text: '<b>Save</b>',
    //           type: 'button-positive',
    //               onTap:  function(e) {
    //                  if (!myPopupScope.userDetails) {
    //                     e.preventDefault();
    //                  } else {
    //                     logIn(myPopupScope.userDetails.useremail,myPopupScope.userDetails.userpassword);
    //                     e.preventDefault();
    //                  }
    //             }
    //         }
    //      ]
    //   });
    $scope.userdetails = [];
    $scope.userdetails.staffLogon = false;
    $scope.loginError = '';
    
    $scope.login = function(){
        $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner>'
        });
        var useremail = $scope.userdetails.collegeid+'@';
        console.log($scope.userdetails.staffLogon);
        if (!$scope.userdetails.staffLogon) useremail += 'student.';
        useremail += 'derby-college.ac.uk';
        firebase.auth().signInWithEmailAndPassword(useremail, $scope.userdetails.password).catch(function(error) {
            $ionicLoading.hide();
            // Handle Errors here.
            console.log('err=' + error.message);
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') $scope.loginError = "Wrong Password!";  
            if (errorCode === 'auth/user-not-found') $scope.loginError = "User not found!";
        }).then(function(user){alert(user.email)});
    };
}])
   
.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

}])
   
.controller('shopCtrl', ['$scope', '$stateParams', 'shopFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, shopFactory) {
    // newKey = firebase.database().ref('shop/categories').push().key;
    // firebase.database().ref('shop/categories/'+newKey).set({'name':'Books','order':0});
    
    $scope.shop = [];
    $scope.shop = shopFactory;
    
    firebase.database().ref('shop/categories').orderByChild('order').once('value', function(snapshot){
        shopFactory.categories = snapshot.val();
        $scope.$apply();
    });
}])
   
.controller('productSectionsCtrl', ['$scope', '$stateParams', 'shopFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, shopFactory) {
    // newKey = firebase.database().ref('shop/products').push().key;
    // firebase.database().ref('shop/products/'+newKey).set({'name':'pen','price':0.1});
    // firebase.database().ref('shop/categories/products/'+newKey).set({'name':'pen','price':0.1});
    
    // newKey = firebase.database().ref('shop/products').push().key;
    // firebase.database().ref('shop/products/'+newKey).set({'name':'USB Stick 8gb','price':6});
    // firebase.database().ref('shop/categories/products/'+newKey).set({'name':'USB Stick 8gb','price':6,'category':});

    // newKey = firebase.database().ref('shop/categories/' + $stateParams.category + '/sections').push().key;
    // firebase.database().ref('shop/categories/' + $stateParams.category + '/sections/'+newKey).set({'name':'Stationary','key':newKey});
    // firebase.database().ref('shop/sections/'+newKey).set({'name':'Stationary','key':newKey,'category':$stateParams.category});
    // newKey = firebase.database().ref('shop/categories/' + $stateParams.category + '/sections').push().key;
    // firebase.database().ref('shop/categories/' + $stateParams.category + '/sections/'+newKey).set({'name':'Stationary','key':newKey});
    // firebase.database().ref('shop/sections/'+newKey).set({'name':'IT Materials','key':newKey,'category':$stateParams.category});
    console.log($stateParams);
    $scope.shop = [];
    $scope.shop = shopFactory;
    firebase.database().ref('shop/categories/' + $stateParams.category + '/sections').once('value', function(snapshot){
        shopFactory.sections = snapshot.val();
        $scope.$apply();
    });
    
}
])
   
.controller('productsCtrl', ['$scope', '$stateParams', 'shopFactory', '$ionicListDelegate', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, shopFactory,$ionicListDelegate) {
    $scope.shop = [];
    $scope.shop = shopFactory;
    firebase.database().ref('shop/sections/' + $stateParams.section + '/products').once('value', function(snapshot){
        shopFactory.products = snapshot.val();
        $scope.$apply();
    });
    
    $scope.addToCart = function(slidingItem,d){
        $ionicListDelegate.closeOptionButtons();
        alert(d);
    };

}])
 