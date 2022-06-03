app.controller('controller_contact', function($scope, toastr, services_contact) {
    $scope.sendEmail = () => {
        if ($scope.full_name == null && $scope.user_email == null && $scope.email_message == null) {
            toastr.warning('No se puede enviar si hay campos vacios');
        } else {
            let email = { 'name': $scope.full_name, 'email': $scope.user_email, 'message': $scope.email_message };

            services_contact.sendEmail(email)
        }
    }
});