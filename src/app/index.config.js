(function() {
  'use strict';

  angular
    .module('travelplusManager')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    firebase.initializeApp({
      apiKey: "AIzaSyBZBmCRD-EZJUisa6Lu9cNGEHxW0FDch9E",
      authDomain: "travelplustur-5c1d4.firebaseapp.com",
      databaseURL: "https://travelplustur-5c1d4.firebaseio.com",
      storageBucket: "travelplustur-5c1d4.appspot.com",
      messagingSenderId: "364047226238"
    });
  }

})();
