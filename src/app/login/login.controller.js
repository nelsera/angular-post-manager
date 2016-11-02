(function() {
  'use strict';

  angular
    .module('travelplusManager')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($timeout, webDevTec, toastr, $interval, $location, $window) {
    if (localStorage.getItem('logged')) {
      $location.path('/ofertas');
    }

    var vm = this;

    $('hgroup').animate({
      opacity: 1},
      400, function () {
        $('form').animate({
        opacity: 1},
        400);
      });


    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1477776233744;
    vm.showToastr = showToastr;

    activate();

    var checkAutofill = $interval(function (){
      if (vm.username && vm.password) {
        $('[name="username"], [name="password"]').addClass('used');
        $interval.cancel(checkAutofill);
      }
    },1);

    function loading(show) {
      if (show) { 
        $('#loader').fadeIn(400, function () {
          $('.cssload-thecube').animate({
            'top': '21px',
            'opacity': 1},
            400);
          $('.button').addClass('active').find('span').text('Entrando');
        });
        $('[name="username"], [name="password"], .button').blur();
        $('.alert.error').slideUp(200);
      } else {
        $('#loader').fadeOut(0, function () {
          $('.cssload-thecube').animate({
            'top': '138px',
            'opacity': 0},
            0);
          $('.button').removeClass('active').find('span').text('Entrar');
        });
        $('.alert.error').slideDown('fast');
        $timeout(function () {
          $('.alert.error').hide(0);
        }, 5000);
      }
    }

    vm.tryLogin = function(){
      loading(true);
      $timeout(function () {
        if (vm.username==='admin' && vm.password=='admin') {
          $('.login').fadeOut('fast');
          $window.localStorage.setItem('logged', true);
          $location.path('/ofertas');
        } else {
          loading(false);
        }
      },3000);
    };
    
    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }

    $(window, document, undefined).ready(function() {

      $('input').blur(function() {
        var $this = $(this);
        if ($this.val())
          $this.addClass('used');
        else
          $this.removeClass('used');
      });

      var $ripples = $('.ripples');

      $ripples.on('click.Ripples', function(e) {

        if(!!$('.button').attr('disabled')) {
          return false;
        }

        var $this = $(this);
        var $offset = $this.parent().offset();
        var $circle = $this.find('.ripplesCircle');

        var x = e.pageX - $offset.left;
        var y = e.pageY - $offset.top;

        $circle.css({
          top: y + 'px',
          left: x + 'px'
        });

        $this.addClass('is-active');

      });

      $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
        $(this).removeClass('is-active');
      });
    });
  }
})();
