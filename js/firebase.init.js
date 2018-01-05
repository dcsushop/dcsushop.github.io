angular.module('firebaseConfig', ['firebase'])

.run(function($state, $rootScope, $ionicLoading){
    
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCk3gM4cdqbqUZrfOqOrxwpEmd-piKD984",
    authDomain: "dcsu-shop-orders.firebaseapp.com",
    databaseURL: "https://dcsu-shop-orders.firebaseio.com",
    storageBucket: "dcsu-shop-orders.appspot.com",
  };
  firebase.initializeApp(config);
    
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //if(myLoginPopup) myLoginPopup.close(); IONIC LOADING?
            $ionicLoading.hide();
            $state.go('ordersPage');
        } else {
            if ($state.current.name !== 'logIn') $state.go('logIn');
        }
        
    });
    
    
    logIn = function(useremail,userpassword){
        firebase.auth().signInWithEmailAndPassword(useremail, userpassword).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          //console.log(errorCode);
          // ...
        });
        
    };
});

/*

.service("TodoExample", ["$firebaseArray", function($firebaseArray){
    var ref = firebase.database().ref().child("todos");
    var items = $firebaseArray(ref);
    var todos = {
        items: items,
        addItem: function(title){
            items.$add({
                title: title,
                finished: false
            })
        },
        setFinished: function(item, newV){
            item.finished = newV;
            items.$save(item);
        }
    }
    return todos;
}])

*/