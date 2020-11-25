'use strict';

/**
 * ELEMENTS
 * Table of contents: Navigate using $TITLE
 *
 * breakpoints
 * javascript enabled
 * handle header
 * menu trigger
 * search trigger
 * tidy responsive tables
 * accordions
 * handle lightboxes
 * handle skip links
 * search label init
 *
 */

/*------------------------------------**
 $BREAKPOINTS
 **------------------------------------*/

/* if you change this, also change it in /sass/vendor/_include-media.scss */

var medium = 800;

/*------------------------------------**
 $JAVASCRIPT ENABLED
 **------------------------------------*/

/* Adds class to the body to show that JS is enabled, for CSS targeting. e.g.
 * to ensure accordions are open by default if JS is disabled
 */

var body = document.querySelector('body');

function javascriptEnabled() {
    body.classList.add('js-enabled');
}

/*------------------------------------**
 $MENU TRIGGER
 **------------------------------------*/

var menuTrigger = document.querySelector('.js-menu-trigger');
var invisibleMenuClose = document.querySelector('.js-invisible-menu-close');

function toggleMenu() {
    body.classList.toggle('menu-open');
}

/*------------------------------------**
 $MENU SECONDARY LEVEL HANDLER
 **------------------------------------*/

var secondLvlTriggers = Array.prototype.slice.call(document.querySelectorAll("header nav > ul > li > a"));

/* for each trigger */
secondLvlTriggers.forEach(function (secondLvlTrigger) {

    /* -- ACTIVE PAGE OPENS 2ND LVL AUTOMATICALLY -- */

    /* if it's the active trigger */
    if (secondLvlTrigger.classList.contains('active')) {

        /* add open classes to body & second lvl ul */
        body.classList.add('menu-secondary-lvl-open');
        secondLvlTrigger.nextElementSibling.classList.add('secondary-lvl-open');
    }

    /* -- CLICKING ON TRIGGERS -- */

    function handleSecondLvl(e) {

        /* If there is a secondary level */
        if (secondLvlTrigger.nextElementSibling != null) {

            /* If it's a small screen */
            if (window.innerWidth <= medium) {

                /* prevent click */
                e.preventDefault();
            }

            /* add open classes to body & second lvl ul */
            body.classList.add('menu-secondary-lvl-open');
            secondLvlTrigger.nextElementSibling.classList.add('secondary-lvl-open');
        }
    }

    /* on click */
    secondLvlTrigger.addEventListener('click', handleSecondLvl);

    /* on keydown
    secondLvlTrigger.addEventListener('keyup',function(e) {
        if(e.keyCode == 13) {
            handleSecondLvl;
        }
    }); */

    /* -- CLOSING THE 2ND LVL -- */

    var closeTriggers = Array.prototype.slice.call(document.querySelectorAll(".js-menu-back"));

    /* for each close trigger */
    closeTriggers.forEach(function (closeTrigger) {

        /* on click */
        closeTrigger.addEventListener('click', function () {

            /* remove classes from body & second lvl ul */
            body.classList.remove('menu-secondary-lvl-open');
            secondLvlTrigger.nextElementSibling.classList.remove('secondary-lvl-open');
        });
    });
});

/*------------------------------------**
 $SEARCH TRIGGER
 **------------------------------------*/

var searchTrigger = document.querySelector('.js-search-trigger');

function toggleSearch() {
    body.classList.toggle('search-open');
    header.classList.remove('header--transparent');
}

/*------------------------------------**
 $HANDLE HEADER
 **------------------------------------*/

var preHeader = document.querySelector('.js-pre-header');
var header = document.querySelector('.js-header');

function handleHeader() {

    if (!body.classList.contains('fancybox-active') && !body.classList.contains('search-open')) {

        if (window.pageYOffset > preHeader.offsetHeight) {
            header.classList.remove('header--transparent');
        } else {
            header.classList.add('header--transparent');
        }
    }
}

/*------------------------------------**
 $TIDY RESPONSIVE TABLES
 **------------------------------------*/

function responsiveTables() {

    /* Grab all tables on the page */
    var tables = Array.prototype.slice.call(document.querySelectorAll("table"));

    /* Collapse tables */
    tables.forEach(function (table) {

        /* Add heading data attribute to tbody cells */

        var headertext = [],
            headers = table.querySelectorAll("th"),
            tablerows = table.querySelector("th"),
            tablebody = table.querySelector("tbody");

        for (var i = 0; i < headers.length; i++) {
            var current = headers[i];
            headertext.push(current.textContent.replace(/\r?\n|\r/, ""));
        }

        for (var i = 0, row; row = tablebody.rows[i]; i++) {
            for (var j = 0, col; col = row.cells[j]; j++) {
                if (headertext[j] != null) {
                    col.setAttribute("data-th", headertext[j]);
                }
            }
        }

        /* Add classes for table accordions */

        var tableBodyRows = Array.prototype.slice.call(table.querySelectorAll("tbody tr"));

        tableBodyRows.forEach(function (tableBodyRow) {

            /* If there isn't already a tabindex on the rows, add one */
            if (!tableBodyRow.attributes.tabindex) {
                tableBodyRow.setAttribute("tabindex", 0);
            }

            /* Add open class on click */
            tableBodyRow.addEventListener('click', function () {
                tableBodyRow.classList.toggle('open');
            });

            /* Add open class on tableBodyRow keyup if the key pressed is enter
             */

            tableBodyRow.addEventListener('keyup', function (e) {
                if (e.keyCode == 13) {
                    tableBodyRow.classList.toggle('open');
                }
            });
        });
    });
}

/*------------------------------------**
 $ACCORDIONS
 **------------------------------------*/

function toggleAccordion() {

    /* Grab all accordions on the page */
    var accordions = Array.prototype.slice.call(document.querySelectorAll(".js-accordion"));

    /* For each accordion */
    accordions.forEach(function (accordion) {

        /* Grab the heading */
        var accordionHeading = document.querySelector(".js-accordion__heading");

        /* If there isn't already a tabindex on the heading, add one */
        if (!accordionHeading.attributes.tabindex) {
            accordionHeading.setAttribute("tabindex", 0);
        }

        /* On accordionHeading click, toggle open class on accordion */
        accordionHeading.addEventListener('click', function () {
            accordion.classList.toggle('open');
        });

        /* On accordionHeading keyup, if the key pressed is enter,
         * toggle open class on accordion
         */

        accordionHeading.addEventListener('keyup', function (e) {
            if (e.keyCode == 13) {
                accordion.classList.toggle('open');
            }
        });
    });
}

/*------------------------------------**
 $HANDLE LIGHTBOXES
 **------------------------------------*/

var lightboxes = Array.prototype.slice.call(document.querySelectorAll(".js-lightbox"));

lightboxes.forEach(function (lightbox) {

    /* If there isn't already a tabindex, add one */
    if (!lightbox.attributes.tabindex) {
        lightbox.setAttribute("tabindex", 0);
    }

    /* On click, toggle open class */
    lightbox.addEventListener('click', function () {
        body.classList.toggle('lightbox-open');
        this.classList.toggle('lightbox--open');
    });

    /* On keydown */
    lightbox.addEventListener('keydown', function (e) {

        /* if the key pressed is enter, toggle open class */
        if (e.keyCode == 13) {
            body.classList.toggle('lightbox-open');
            this.classList.toggle('lightbox--open');
        }

        /* if key pressed is tab & lightbox is open, toggle open class */
        if (e.keyCode == 9 && this.classList.contains('lightbox--open')) {
            body.classList.toggle('lightbox-open');
            this.classList.toggle('lightbox--open');
        }
    });
});

/*------------------------------------**
 $HANDLE SKIP LINKS
 **------------------------------------*/

var skipContainer = document.querySelector('.js-skip-links');

function handleSkipLinks() {

    /* If the active elements parent is the skip container, add focus class */
    if (document.activeElement.offsetParent === skipContainer) {
        skipContainer.classList.add('js-focused');
    }

    /* else remove it */
    else if (skipContainer.classList.contains('js-focused')) {
            skipContainer.classList.remove('js-focused');
        }
}

/*------------------------------------**
 $FLOAT LABEL INIT
 **------------------------------------*/

var floatlabels = new FloatLabels('#search-form', {});

window.addEventListener('load', javascriptEnabled);
window.addEventListener('load', responsiveTables);
window.addEventListener('load', toggleAccordion);
window.addEventListener('scroll', handleHeader);
window.addEventListener('keyup', handleSkipLinks);
menuTrigger.addEventListener('click', toggleMenu);
invisibleMenuClose.addEventListener('click', toggleMenu);
searchTrigger.addEventListener('click', toggleSearch);
