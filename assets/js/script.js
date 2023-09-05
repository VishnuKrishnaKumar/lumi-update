$(document).ready(function () {
    // custom navigate
    var elements = document.querySelectorAll('.custom_navigate');
    elements.forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            var target = element.getAttribute('href');
            if (document.querySelector(target)) {
                window.scrollTo({
                    top: document.querySelector(target).offsetTop - headerHeight(),
                    behavior: 'smooth'
                });
            }
        });
    });
    // BANNER SLIDER
    if ($('.banner_slider').length) {
        $('.banner_slider').owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1400,
            nav: false,
            dots: true
        });
    }

    // Success message
    $("#submit").click(function (e) {
        e.preventDefault();
        $(".success_message").addClass('active'); // Show the success message
    });
    $(".success_message .btn").click(function (e) {
        e.preventDefault();
        $(".success_message").removeClass('active'); // Hide the success message when 'ok' button is clicked
    });

    $(document).click(function (e) {
        if (!$(e.target).is("#submit") && !$(e.target).is(".success_message") && $(".success_message").hasClass("active")) {
            $(".success_message").removeClass('active'); // Hide the success message when clicked outside
        }
    });

    // PRELOADER

    setTimeout(function () {
        $('.loader_body').addClass('loaded');
    }, 400)
    setTimeout(function () {
        $('.loader_body').addClass('finished');
        if (window.location.href.indexOf("#reason") > -1) {
            // Get the element with the id "reason"
            var element = document.getElementById("reason");
            console.log(element);
            if (element) {
                // Calculate the offset by subtracting 20 pixels from the top
                var offset = element.getBoundingClientRect().top - 1000;
    
                // Scroll to the element with the offset
                window.scrollTo({
                    top: offset,
                    behavior: "smooth"
                });
    
                // Prevent the default anchor link behavior
                history.replaceState({}, document.title, window.location.pathname);
            }
        }
    }, 800)


    // RESPONSIVE MENU

    $(".menu-btn-1").click(function () {
        $(this).parents('header').toggleClass('menu_active')
        $(this).toggleClass('active');
        $(this).toggleClass('closed')
        $(".collapse").toggleClass('open');
        $(".collapse").toggleClass('closed');
        $("body").toggleClass('open');
    });

    // header

    $(window).on('scroll load resize', function () {
        addClassAtWidth('.women_slider', 'owl-carousel', 768);
        addClassAtWidth('.men_slider', 'owl-carousel', 768);
        containerRight();
        $('header').addClass('active');
        var scroll = $(window).scrollTop();
        if (scroll >= 20) {
            $("header").addClass("scrolled");
        } else {
            $("header").removeClass("scrolled");
        }
    });


    // TEAM
    // AOS ANIMATION 

    AOS.init({
        duration: 1200,
    })
    
    // popup

    let popupFlag = 0;
    let popup = $('.custom_popup');
    $('.close').click(function () {
        popup.removeClass('active');
        popup.addClass('inactive');
        $('body').removeClass('form_active');
        popupFlag = popupFlag + 1;
    })

    $('.custom_popup .bg').click(function () {
        $(this).parents('.custom_popup').removeClass('inactive');
        $(this).parents('.custom_popup').addClass('active')
        $('body').addClass('form_active');
    })




    // custom navigate 

    // document.querySelectorAll('.custom_navigate').forEach(function (element) {
    //     element.addEventListener('click', funrction (event) {
    //         event.preventDefault();
    //         var targetSection = this.getAttribute('href');
    //         var targetPosition = document.querySelector(targetSection).offsetTop;
    //         setTimeout(function () {
    //             console.log($('header').outerHeight());
    //             window.scrollTo({
    //                 top: targetPosition - $('header').outerHeight(),
    //                 behavior: 'smooth'
    //             });
    //         }, 200)
    //     });
    // });

    $('.tab_button li a ').click(function (e) {
        e.preventDefault();
        tabButton(this);
    })


    // adding slider 


    // Call the function with your parameters
    setTimeout(function () {
        initOwlCarousel('.women_slider', 768);
        initOwlCarousel('.men_slider', 768);

    }, 100);

    // making form active
    $(window).on("scroll load resize ", function () {
        if ($('#featured_profile').length) {
            let view = scrolledIntoView($('#featured_profile'))
            setTimeout(function () {
                if (view) {
                    $('.custom_popup').addClass('active');
                    $('body').addClass('form_active')
                }
            }, 200)
        }

    })
    $('input[type="file"]').change(function () {
        var fileName = $(this).val().split("\\").pop();
        $(this).parent().find('label ').text(fileName);
    });

// custom navigate 



})

document.addEventListener('DOMContentLoaded', function () {
    var customNavigateLinks = document.querySelectorAll('.custom_navigate');

    customNavigateLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            var target = document.querySelector(link.getAttribute('href'));
            var offset = target.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        });
    });
});


// footer element position change

function windowWidth() {
    let windowWidth = $(window).width();
    return windowWidth;
}
function windowHeight() {
    let windowHeight = $(window).height();
    return windowHeight;
}
function scrollTop() {
    let scrollTop = $(window).scrollTop();
    return scrollTop;
}
// contact background Image change 

function bannerHeight() {
    if ($('.banner').length) {
        return $('.banner').outerHeight();
    }
}
function headerHeight() {
    return $('header').outerHeight();
}
function containerRight() {
    let offsetRight = $('.container').offset().left + $('.container').width();
    $("body").get(0).style.setProperty("--offsetRight", offsetRight + 'px');
}
function tabButton(obj) {
    let target = $(obj).attr('target');
    $(".tab_button li a").removeClass("active");
    $(obj).addClass('active');
    // $('.steps li ').slideUp(400);
    $('.steps li ').removeClass('active')
    // $('body').find(target).slideDown(400);
    $('body').find(target).addClass('active');
}
// add class


function addClassAtWidth(selector, classname, width) {
    var $element = $(selector);
    if ($element.length > 0) {
        if ($(window).width() <= width) {
            $element.addClass(classname);
        } else {
            $element.removeClass(classname);
        }
    }
}
// adding slider 

function initOwlCarousel(selector, minWidth) {
    const $window = $(window);

    function initializeCarousel() {
        const windowWidth = $window.width();
        if (windowWidth <= minWidth) {
            $(selector).owlCarousel({
                // Owl Carousel options
                items: 2,
                margin: 20,
                loop: true,
                dots: true,
                smartSpeed: 1400,
                // ... other options
            });
        } else {
            $(selector).owlCarousel('destroy');
        }
    }

    // Initialize on page load
    initializeCarousel();

    // Reinitialize on window resize
    $window.on('resize', initializeCarousel);
}

function scrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).outerHeight();
    var elementHeight = $(elem).outerHeight();
    if (elemTop + (elementHeight / 2) <= docViewBottom && elemBottom >= docViewTop) {
        return true;
    }
    else {
        return false;
    }
}

