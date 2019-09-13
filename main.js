var app = angular.module("myApp", ['ui.bootstrap']);

app.filter('pagination', function () {
    return function (banks, option) {
        var begin = ((option.currentPage - 1) * option.pageSize);
        var end = begin + option.pageSize;

        return (banks || []).slice(begin, end);
    };
});

app.filter('favorite', function () {
    return function (banks, isFavorite, favorites) {
        if (isFavorite) {
            return (banks || []).filter(bank => favorites[bank.ifsc]);
        } else {
            return banks;
        }
    };
});

app.controller("myCtrl", function ($http) {
    var vm = this;
    vm.loading = true;
    vm.isFavorite = false;

    vm.banks = [];
    vm.favorites = {};

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
    vm.setFavorites = setFavorites;

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

    function getFavorites() {
        vm.favorites = JSON.parse(localStorage.getItem('favorites')) || {};
    }

    function setFavorites(bank) {
        vm.favorites[bank.ifsc] = !vm.favorites[bank.ifsc];
        localStorage.setItem('favorites', JSON.stringify(vm.favorites));
    }

    getBanks();
    getFavorites();
});