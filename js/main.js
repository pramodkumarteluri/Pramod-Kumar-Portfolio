(function ($) {
    'use strict';

    $(window).on('load', function () {
        setTimeout(function () {
            $('.preloader').addClass('loaded');
        }, 500);
    });

    $('a[href^="#"]').on('click', function (e) {
        var targetSelector = $(this).attr('href');
        var target = $(targetSelector);

        if (target.length) {
            e.preventDefault();

            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 600);

            $('.navbar-collapse').collapse('hide');
        }
    });

    var sections = $('section[id]');
    var navLinks = $('.nav-link');

    function setActiveLink() {
        var scrollPos = $(window).scrollTop() + 110;
        var currentId = '';

        sections.each(function () {
            var section = $(this);
            var top = section.offset().top;
            var bottom = top + section.outerHeight();
            var id = section.attr('id');

            if (scrollPos >= top && scrollPos < bottom) {
                currentId = id;
            }
        });

        navLinks.removeClass('active');

        if (currentId) {
            $('.nav-link[href="#' + currentId + '"]').addClass('active');
        }
    }

    $(window).on('scroll', setActiveLink);
    $(window).on('load', setActiveLink);
    setActiveLink();

    $('.filter-btn').on('click', function () {
        var filter = $(this).data('filter');

        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        if (filter === 'all') {
            $('.project-item').show();
        } else {
            $('.project-item').hide();
            $('.project-item.' + filter).show();
        }
    });

    $('#contact-form').on('submit', function (e) {
        e.preventDefault();

        var email = $('#contact-email-top').val().trim();
        var name = $('#contact-name').val().trim();
        var subject = $('#contact-subject').val().trim();
        var message = $('#contact-message').val().trim();

        var finalSubject = encodeURIComponent(subject + ' - From ' + name);
        var finalBody = encodeURIComponent(
            'Name: ' + name + '\n' +
            'Email: ' + email + '\n\n' +
            message
        );

        window.location.href = 'mailto:@gmail.com?subject=' + finalSubject + '&body=' + finalBody;
    });

    var roles = [
        'Aspiring Software Engineer',
        "AI/ML Developer",
        'Frontend Developer',
        'Backend Developer',
        'Full Stack Developer'
    ];

    var roleIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typedRole = document.getElementById('typed-role');

    function typeRole() {
        if (!typedRole) return;

        var currentRole = roles[roleIndex];

        if (isDeleting) {
            typedRole.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedRole.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        var speed = isDeleting ? 50 : 90;

        if (!isDeleting && charIndex === currentRole.length) {
            speed = 1400;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 300;
        }

        setTimeout(typeRole, speed);
    }

    document.addEventListener('DOMContentLoaded', typeRole);
})(jQuery);