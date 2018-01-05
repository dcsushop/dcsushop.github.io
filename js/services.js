angular.module('app.services', [])

.run(function(){

})

.factory('shopFactory', [function(){
    var shopCategories = [];
    var shopSections = [];
    var shopProducts = [];

    return {
        categories: shopCategories,
        sections: shopSections,
        products: shopProducts
    };
}])


.factory('dataService', [function(){
    var data = [];
    
    
    return {data: data};
}]);