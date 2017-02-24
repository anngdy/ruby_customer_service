// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require bootstrap.js
//= require turbolinks
//= require_tree .


function datepickerFocus(){
  $('.datepicker-button').on('click', function(){
    inputText = $(this).parents('.input-group')
                       .children('.datepicker-text');
    inputText.datepicker(translate_datepicker()).focus();
  });
}
function translate_datepicker(){
  return { dateFormat: 'dd/mm/yy',
    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    nextText: 'Próximo',
    prevText: 'Anterior'
  }
}
$(document).on('ready page:load', function () {
  datepickerFocus();
  $("body").delegate(".datepicker-button", "click", function(){
    inputText = $(this).parents('.input-group')
                       .children('.datepicker-text');
    inputText.datepicker(translate_datepicker()).focus();
  });
  $('.pagination.paginate-simple li a').removeAttr('data-remote');
  adjustPopover();
  $('.sm-waiting-modal').on('shown.bs.modal', function(){
    $('#file-upload').filestyle({buttonText: ""});
    $('#file-upload').css('visibility', 'visible');
  });
  $('.waiting-modal').on('shown.bs.modal', function(){
    $('.wysihtml5').each(function(i, elem) {
      $(elem).wysihtml5({ toolbar:{ 'fa': true, 'html': false,
                                    'image': false,
            'size': 'sm',
                                    'blockquote': false,
                                    'lists': false
                                   } });
    });
    // "Create or conclude enrols in LMS" dialog
    $(".create-or-conclude-action").on('change', function() {    
     if ( $(this)[0].value == "conclude") {
       $("#create-or-conclude-scope-all").html("Todos os alunos <b>trancados</b> e com <b>AE</b> no período");
     } else {
       $("#create-or-conclude-scope-all").html("Todos os alunos <b>matriculados</b> no período");
     }
    });
    $(".create-or-conclude-scope").on('change', function() {
      if ( $(this)[0].value == "specific") {
        $("#create-or-conclude-ras").removeAttr("disabled");
      } else {
        $("#create-or-conclude-ras").attr("disabled","disabled");
      }
    });
  });
  /* Activating Best In Place */
  jQuery(".best_in_place").best_in_place();
  /* HTML Editor */
  window['rangy'].initialized = false
  $('.wysihtml5').each(function(i, elem) {
    $(elem).wysihtml5({ toolbar:{ "fa": true } });
    
  });
});
//Adjust popover after filtering and paginating
function adjustPopover(){
 $('.has-popover').on('mouseover').popover({
    html: true,
    trigger: 'hover'
 });
}
//Close waiting modal
window.onpopstate = function () {
  closeModal();
}
function closeModal(){
  $('.waiting-modal').modal('hide');
  $('.sm-waiting-modal').modal('hide');
}
function waitingOnModal(){
  return "<div class='text-center'><h4>Aguarde...</h4><i class='fa fa-spinner fa-spin fa-3x fa-fw'></i></div>";
}
//Clear modal contents on close modal
$(document).on('ready page:load', function () {
  $('body').on('hidden.bs.modal', '.modal', function () {
    $(this).removeData('bs.modal');
  });
  $('.waiting-call').on('click', function(){
    $.ajax( {
      url: $('.waiting-call').attr('data-url'),
      context: document.body,
      dataType: 'html'
    }).done(function(data){
      window.location.pathname = $('.waiting-call').attr('data-url').split('/').slice(3).join('/');
      $(document).on('ready page:load', function(){
        closeModal();
      });
    });
  });
});
+function ($) {
  $(function(){
    // class
    $(document).on('click', '[data-toggle^="class"]', function(e){
      e && e.preventDefault();
      var $this = $(e.target), $class , $target, $tmp, $classes, $targets;
      !$this.data('toggle') && ($this = $this.closest('[data-toggle^="class"]'));
      $class = $this.data()['toggle'];
      $target = $this.data('target') || $this.attr('href');
      $class && ($tmp = $class.split(':')[1]) && ($classes = $tmp.split(','));
      $target && ($targets = $target.split(','));
      $classes && $classes.length && $.each($targets, function( index, value ) {
        if ( $classes[index].indexOf( '*' ) !== -1 ) {
          var patt = new RegExp( '\\s' + 
              $classes[index].
                replace( /\*/g, '[A-Za-z0-9-_]+' ).
                split( ' ' ).
                join( '\\s|\\s' ) + 
              '\\s', 'g' );
          $($this).each( function ( i, it ) {
            var cn = ' ' + it.className + ' ';
            while ( patt.test( cn ) ) {
              cn = cn.replace( patt, ' ' );
            }
            it.className = $.trim( cn );
          });
        }
        ($targets[index] !='#') && $($targets[index]).toggleClass($classes[index]) || $this.toggleClass($classes[index]);
      });
      $this.toggleClass('active');
    });
    // collapse nav
    $(document).on('click', 'nav a', function (e) {
      var $this = $(e.target), $active;
      $this.is('a') || ($this = $this.closest('a'));
      $active = $this.parent().siblings( ".active" );
      $active && $active.toggleClass('active').find('> ul:visible').slideUp(200);
      ($this.parent().hasClass('active') && $this.next().slideUp(200)) || $this.next().slideDown(200);
      $this.parent().toggleClass('active');
      $this.next().is('ul') && e.preventDefault();
      setTimeout(function(){ $(document).trigger('updateNav'); }, 300);
    });
  });
}(jQuery);



