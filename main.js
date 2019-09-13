var app = angular.module("myApp", ['ui.bootstrap']);

app.filter('pagination', function () {
    return function (array, option) {
        var begin = ((option.currentPage - 1) * option.pageSize);
        var end = begin + option.pageSize;

        return (array || []).slice(begin, end);
    };
});

app.controller("myCtrl", function ($http) {
    var vm = this;
    vm.banks = [];
    vm.loading = true;

    vm.filter = {
        city: 'MUMBAI',
        search: ''
    };

    vm.paginationOption = {
        currentPage: 1,
        maxSize: 5,
        pageSize: 10,
        pageSizeOptions: [10, 25, 50, 100]
    };

    vm.cities = [
        "MUMBAI",
        "DELHI",
        "KOLKATA",
        "CHENNAI",
        "BANGALORE"
    ];

    vm.getBanks = getBanks;

    function getBanks() {
        vm.paginationOption.currentPage = 1;

        $http.get(`https://vast-shore-74260.herokuapp.com/banks?city=${vm.filter.city}`, {
                cache: true
            })
            .then(function (response) {
                vm.banks = response.data;
                vm.loading = false;
            });
    }

    getBanks();
});