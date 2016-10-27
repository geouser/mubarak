// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};

if (isMobile) {
    $('.search_type').addClass('active');
}

jQuery(document).ready(function($) {

    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.menu-button'),
            $element2 = $('header'),
            className = 'hasScrolled';

        $document.scroll(function() {
            $element.toggleClass(className, $document.scrollTop() >= 1);
            $element2.toggleClass(className, $document.scrollTop() >= 1);
        });
    });
      


    /*---------------------------
                                  Acoordion
    ---------------------------*/
    $( function() {
        if ( $( ".accordion" ).length > 0 ) {
            $( ".accordion" ).accordion({
                heightStyle: "content",
                collapsible: true
            });    
        }
    } );

    /*---------------------------
                                Inputs
    ---------------------------*/
    $('input, textarea').on('focusin', function(event) {
        event.preventDefault();
        $(this).parent().addClass('focus');
    });
    $('input, textarea').on('focusout', function(event) {
        event.preventDefault();
        if ( !$(this).val() ) {
            $(this).parent().removeClass('focus');
        }
    });



    /*----------------------------
                                    Contacts
    ---------------------------*/
    $('.filial').on('click', function(event) {
        event.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');

        $('.pin').removeClass('active')
        $($(this).attr('data-pin')).addClass('active');
    });


    $('.pin').on('click', function(event) {
        event.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');

        $('.filial').removeClass('active')
        $('.filial[data-pin=#'+$(this).attr('id')+']').addClass('active');
    });



    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.menu-button').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('header').toggleClass('active');
        if ($('header').hasClass('active')) {
                $('body').css('overflow', 'hidden');
            } else {
                $('body').css('overflow', 'visible');
            }
    });

    $('.search_type').focus(function(){
        $(this).addClass('active');
    }).blur(function(){
        $(this).removeClass('active');
    });

    /*---------------------------
                                  Magnific popup
    ---------------------------*/
    $('.magnific').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',
        modal: false,

        closeBtnInside: true,
        preloader: false,
        
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });



    /*----------------------------
                              SEND FORM
    -------------------------*/
    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.magnificPopup.open({
            items: {
              src: popup
            },
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            modal: false,
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'
        }, 0);
    }

    $('form').on('submit', function(event) {
        event.preventDefault();
        /* Act on the event */
        var data = $(this).serialize();
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            success: function(result){
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        })
        .always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
            });
        });
        
    });

}); // end file