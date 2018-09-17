$(document).ready(function () {

    // footer stuff
    let mql = window.matchMedia("screen and (max-width: 723px)");
    mediaqueryresponse(mql); // call listener function explicitly at run time
    mql.addListener(mediaqueryresponse);  // attach listener function to listen in on state changes

    function mediaqueryresponse(mql) {
        if (mql.matches) {
            $(".taber").attr("data-toggle", "collapse");
            $('.collapse').collapse("hide");
        } else {
            $('.collapse').collapse("show");
            $("[data-toggle='collapse']").removeAttr("data-toggle");
        }
    }

    // global cart sidebar stuff
    $('#cart-button').on('click', () => {
        $('#cart-side').toggleClass('sidenav-active');
    });
});