var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {
    var vm = this;
    vm.appointments = {};

    vm.today = new Date().getDate();
    vm.date = new Date();

    vm.setMonth = function (month) {
        vm.date.setMonth(vm.date.getMonth() + 1 + month);
        vm.date.setDate(0);
        vm.days = new Array(vm.date.getDate());
    }

    vm.getDateString = function (date) {
        return new Date(new Date(vm.date).setDate(date)).toLocaleDateString();
    }

    vm.setAppointment = function (date, edit) {
        vm.today = date;

        if (vm.getDateString(date) < vm.getDateString(new Date().getDate())) {
            return;
        }

        if (!edit && vm.appointments[vm.getDateString(date)]) {
            alert('Appointment already exists');
        } else {
            var person = prompt(edit ? "Update an appointment" : "Add an appointment", vm.appointments[vm.getDateString(date)]);
            if (person != null) {
                vm.appointments[vm.getDateString(date)] = person;
            }

        }
    }

    vm.removeAppointment = function (date) {
        delete vm.appointments[vm.getDateString(date)];
    }

    vm.setMonth(0);
});