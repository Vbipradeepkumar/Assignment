
// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
angular.module('formApp', ['ngAnimate', 'ui.router'])

// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: '/pages/form.html',
            controller: 'formController'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.profile', {
            url: '/profile',
            templateUrl: '/pages/form-profile.html'
        })
        
        .state('form.match', {
            url: '/match',
            templateUrl: '/pages/form-match.html'
        })
        // url will be /form/cost
        .state('form.cost', {
            url: '/cost',
            templateUrl: '/pages/form-cost.html'
        })
        
        // url will be /form/submit
        .state('form.submit', {
            url: '/submit',
            templateUrl: '/pages/form-submit.html'
        });
       
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/form/profile');
})

// our controller for the form
// =============================================================================
.controller('formController', function($scope,$http) {
    
    // we will store all of our form data in this object
    $scope.formData = {};
    
    // function to process the form
    $scope.processForm = function() {
        if($scope.formData.name === undefined  || $scope.formData.card=== undefined   || $scope.formData.match=== undefined  || $scope.formData.type=== undefined){
            alert("Details incomplete");
        }
        else{
          //random id generation
          function makeid(){
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

                return text;
            }
            var rand_id  = makeid();
            $http.post("http://localhost:1337/bookticket/create", {
                name: $scope.formData.name,
                card: $scope.formData.card,
                match: $scope.formData.match,
                cost: $scope.formData.type,
                id: rand_id
            })
            .success(function(data) {
                var qrcode = new QRCode("form", {
                    text: rand_id,
                     width: 128,
                    height: 128,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
                var content = "Hi Sir/Madam,  Your ticket has been booked. Plz ensure you reach out to us a day before the match date along with a copy of this mail and the original submitted proof. The generated id is "
                //Mail API
                $.ajax({
                  type: 'POST',
                  url: 'https://mandrillapp.com/api/1.0/messages/send.json',
                  data: {
                  'key': 'u1IAL_R9ZDaboyElRz9TMQ', //API key -> should come from process file
                  'message': {
                  'from_email': 'bookticket@ICCCRICKET.com',
                  'to': [
                      {
                      'email': $scope.formData.email, // Receiver's email id
                      'name': 'PradeepKumar',
                       'type': 'to'
                      }
                   ],
                   'autotext': 'false',
                   'subject': $scope.formData.match + ' ID', //ID title
                   'html': content + rand_id //Ticket content mailed       
                   }
                  }
                });
                $scope.formData={}
            });
        }
    };
    
});

