;(function () {
    'use strict';
    var counter = function() {
        $('.js-counter').countTo({
            formatter: function (value, options) {
                return value.toFixed(options.decimals);
            },
        });
    };
    var counterWayPoint = function() {
        if ($('#colorlib-counter').length > 0 ) {
            $('#colorlib-counter').waypoint( function( direction ) {

                if( direction === 'down' && !$(this.element).hasClass('animated') ) {
                    setTimeout( counter , 400);
                    $(this.element).addClass('animated');
                }
            } , { offset: '90%' } );
        }
    };
    // Animations
    var contentWayPoint = function() {
        var i = 0;
        $('.animate-box').waypoint( function( direction ) {

            if( direction === 'down' && !$(this.element).hasClass('animated') ) {

                i++;

                $(this.element).addClass('item-animate');
                setTimeout(function(){

                    $('body .animate-box.item-animate').each(function(k){
                        var el = $(this);
                        setTimeout( function () {
                            var effect = el.data('animate-effect');
                            if ( effect === 'fadeIn') {
                                el.addClass('fadeIn animated');
                            } else if ( effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated');
                            } else if ( effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated');
                            } else {
                                el.addClass('fadeInUp animated');
                            }

                            el.removeClass('item-animate');
                        },  k * 200, 'easeInOutExpo' );
                    });

                }, 100);

            }

        } , { offset: '85%' } );
    };

    $(function(){
        counter();
        counterWayPoint();
        contentWayPoint();
    });
}());