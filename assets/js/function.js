$(function() {
    'use strict';
    
    // click functionality of architectural details
    $(document.body).on('click', '.content-product-view', 
        function() {
            var _this = $(this).parent(),
                _parent = $(this).parents('.display-details'),
                _mainParent = _parent.parent('.content--product-details'),
                _index = _this.data('index'),
                _info = $(this).data('info'),
                _link = "",
                details = [];
            
            _mainParent.find('.content-full-details').remove();
            _mainParent.find('.active').find('span > i').removeClass('fa fa-angle-up').addClass('fa fa-angle-down');
            _mainParent.find('.active').removeClass('active');
            _this.addClass('active');
            _mainParent.find('.active').find('span > i').removeClass('fa fa-angle-down').addClass('fa fa-angle-up');
            // get list of architectural details data

            if (_info == "architectural-details") {
                _link = "assets/data/architecturalDetails.json";
            } else if (_info == "metframe-details") {
                _link = "assets/data/metframeDetails.json";
            } else if (_info == "metframe-details-animation") {
                _link = "assets/data/metframeAnimationDetails.json";
            }

            $.get(_link, 
                function(data) {
                    var data = data.data;
                    // get each data
                    $.each(data, function(key, value) {
                        if (_index == value.id) {
                            
                            _parent.after('<div class="row content-full-details"></div>');

                            $('.content-full-details').hide();
                            if (_this.hasClass('active')) {
                                $('.content-full-details').slideDown(500,'linear')
                            } else {
                                $('.content-full-details').slideUp(500,'linear')
                            }

                            $.each(value.data, function(k, v) {
                                _mainParent.find('.content-full-details').append(
                                    '<div class="col-md-4 view-details">' +
                                        '<h4><a href="#ex' + k + '" data-modal>' + v.title + '</a></h4>' +
                                        '<a href="#ex' + k + '" data-modal><img src="https://placeimg.com/640/480/arch" /></a>' +
                                        '<div id="ex' + k + '" class="modal">' +
                                            '<iframe src="' + v.link + '" frameborder="0" allowvr allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel=""></iframe>' +
                                        '</div>' +
                                    '</div>'
                                );
                            });
                        }
                    });
                });

            
        });

        $(document).on('click', 'a[data-modal]', function(event) {
            $(this).modal();
            console.log($(this).attr('href'))
            return false;
        });
});