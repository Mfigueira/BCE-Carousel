$(document).ready(function() {

    const CLASS_ONE_ITEM = "one-item";
    const CLASS_TWO_ITEMS = "two-items";
    const CLASS_THREE_ITEMS = "three-items";
    const DATA_ID = "data-bceid";
    const BREAKPOINT_LARGE = 1200;
    const BREAKPOINT_SMALL = 768;

    $(".bce-component").each(function(i) {

        var component = $(this);
        var inner = component.find('.bce-inner');
        var item = component.find('.bce-item');
        var itemCount = item.length;
        var controls = component.find('.bce-controls');

        component.attr(DATA_ID, i);
        inner.attr(DATA_ID, i);
        controls.attr(DATA_ID, i);

        var nextBtn = $('.bce-controls['+DATA_ID+'="'+i+'"].next').children('.bce-controls-btn');
        var prevBtn = $('.bce-controls['+DATA_ID+'="'+i+'"].prev').children('.bce-controls-btn');

        function cloneItem(data, i) {
            $('.bce-inner['+data+'="'+i+'"] .bce-item:last').clone().insertBefore('.bce-inner['+data+'="'+i+'"] .bce-item:first');
        }

        if (itemCount===1) {
            component.addClass(CLASS_ONE_ITEM);
            inner.addClass(CLASS_ONE_ITEM);
            item.addClass(CLASS_ONE_ITEM);
            controls.addClass(CLASS_ONE_ITEM);

        } else if (itemCount===2) {
            inner.addClass(CLASS_TWO_ITEMS);
            item.addClass(CLASS_TWO_ITEMS);
            controls.addClass(CLASS_TWO_ITEMS);
            cloneItem(DATA_ID, i);
            
        } else if (itemCount===3) {
            inner.addClass(CLASS_THREE_ITEMS);
            controls.addClass(CLASS_THREE_ITEMS);
            cloneItem(DATA_ID, i);

        } else {
            $(window).on('resize', function() {
                setInnerWidth(inner, itemCount);
            });
            setInnerWidth(inner, itemCount);
            cloneItem(DATA_ID, i);
        }

        nextBtn.on('click', function() {
            if ( $(this).is(':visible') ) {
                if (isMobile())
                    goNext('-200%', DATA_ID, i);
                else if (isLargeSize())
                    goNext('-66.6667%', DATA_ID, i);
                else
                    goNext('-100%', DATA_ID, i);
            }
            return;
        });
        prevBtn.on('click', function() {
            if ( $(this).is(':visible') )
                goPrev(DATA_ID, i);
            return;
        });

    });

    function isMobile() {
        var m = window.matchMedia('(min-width:'+BREAKPOINT_SMALL+'px)');
        return (!m.matches) ? true : false;
    }
    function isLargeSize() {
        var m = window.matchMedia('(min-width:'+BREAKPOINT_LARGE+'px)');
        return (m.matches) ? true : false;
    }

    function setInnerWidth(a, b) {
        if (isMobile()) {
            a.css('width', (b+1)*100+'%');
        } else if (isLargeSize()) {
            a.css('width', (b+1)*33.3333+'%');
        } else {
            a.css('width', (b+1)*50+'%');
        } return;
    }

    function goNext(n, data, i) {
        $('.bce-inner['+data+'="'+i+'"]').animate(
            { marginLeft: n },
            500,
            function() {
                $('.bce-inner['+data+'="'+i+'"] .bce-item:first').remove();
                $('.bce-inner['+data+'="'+i+'"] .bce-item:first').clone().insertAfter('.bce-inner['+data+'="'+i+'"] .bce-item:last');
                $('.bce-inner['+data+'="'+i+'"]').css('margin-left', '');
            });
    }

    function goPrev(data, i) {
        $('.bce-inner['+data+'="'+i+'"]').animate(
            { marginLeft:0 },
            500,
            function() {
                $('.bce-inner['+data+'="'+i+'"] .bce-item:last').remove();
                $('.bce-inner['+data+'="'+i+'"] .bce-item:last').clone().insertBefore('.bce-inner['+data+'="'+i+'"] .bce-item:first');
                $('.bce-inner['+data+'="'+i+'"]').css('margin-left', '');
            });
    }
});