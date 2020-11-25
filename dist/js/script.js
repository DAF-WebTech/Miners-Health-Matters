"use strict";

var medium = 800,
    body = document.querySelector("body");function javascriptEnabled() {
  body.classList.add("js-enabled");
}var menuTrigger = document.querySelector(".js-menu-trigger"),
    invisibleMenuClose = document.querySelector(".js-invisible-menu-close");function toggleMenu() {
  body.classList.toggle("menu-open");
}var secondLvlTriggers = Array.prototype.slice.call(document.querySelectorAll("header nav > ul > li > a"));secondLvlTriggers.forEach(function (t) {
  t.classList.contains("active") && (body.classList.add("menu-secondary-lvl-open"), t.nextElementSibling.classList.add("secondary-lvl-open")), t.addEventListener("click", function (e) {
    null != t.nextElementSibling && (window.innerWidth <= medium && e.preventDefault(), body.classList.add("menu-secondary-lvl-open"), t.nextElementSibling.classList.add("secondary-lvl-open"));
  }), Array.prototype.slice.call(document.querySelectorAll(".js-menu-back")).forEach(function (e) {
    e.addEventListener("click", function () {
      body.classList.remove("menu-secondary-lvl-open"), t.nextElementSibling.classList.remove("secondary-lvl-open");
    });
  });
});var searchTrigger = document.querySelector(".js-search-trigger");function toggleSearch() {
  body.classList.toggle("search-open"), header.classList.remove("header--transparent");
}var searchNext = $('.pagination.search [rel="next"]').attr("href");$(".pagination.search").replaceWith('<p><a href="' + searchNext + '" class="button button--right-arrow">Continue this search on the Department of Natural Resources, Mines and Energy website.</a></p>');var preHeader = document.querySelector(".js-pre-header"),
    header = document.querySelector(".js-header");function handleHeader() {
  body.classList.contains("fancybox-active") || body.classList.contains("search-open") || (window.pageYOffset > preHeader.offsetHeight ? header.classList.remove("header--transparent") : header.classList.add("header--transparent"));
}function responsiveTables() {
  Array.prototype.slice.call(document.querySelectorAll("table")).forEach(function (e) {
    for (var t = [], n = e.querySelectorAll("th"), o = (e.querySelector("th"), e.querySelector("tbody")), s = 0; s < n.length; s++) {
      var r = n[s];t.push(r.textContent.replace(/\r?\n|\r/, ""));
    }var a;for (s = 0; a = o.rows[s]; s++) {
      for (var i, l = 0; i = a.cells[l]; l++) {
        null != t[l] && i.setAttribute("data-th", t[l]);
      }
    }Array.prototype.slice.call(e.querySelectorAll("tbody tr")).forEach(function (t) {
      t.attributes.tabindex || t.setAttribute("tabindex", 0), t.addEventListener("click", function () {
        t.classList.toggle("open");
      }), t.addEventListener("keyup", function (e) {
        13 == e.keyCode && t.classList.toggle("open");
      });
    });
  });
}function toggleAccordion() {
  Array.prototype.slice.call(document.querySelectorAll(".js-accordion")).forEach(function (t) {
    var e = document.querySelector(".js-accordion__heading");e.attributes.tabindex || e.setAttribute("tabindex", 0), e.addEventListener("click", function () {
      t.classList.toggle("open");
    }), e.addEventListener("keyup", function (e) {
      13 == e.keyCode && t.classList.toggle("open");
    });
  });
}var lightboxes = Array.prototype.slice.call(document.querySelectorAll(".js-lightbox"));lightboxes.forEach(function (e) {
  e.attributes.tabindex || e.setAttribute("tabindex", 0), e.addEventListener("click", function () {
    body.classList.toggle("lightbox-open"), this.classList.toggle("lightbox--open");
  }), e.addEventListener("keydown", function (e) {
    13 == e.keyCode && (body.classList.toggle("lightbox-open"), this.classList.toggle("lightbox--open")), 9 == e.keyCode && this.classList.contains("lightbox--open") && (body.classList.toggle("lightbox-open"), this.classList.toggle("lightbox--open"));
  });
});var skipContainer = document.querySelector(".js-skip-links");function handleSkipLinks() {
  document.activeElement.offsetParent === skipContainer ? skipContainer.classList.add("js-focused") : skipContainer.classList.contains("js-focused") && skipContainer.classList.remove("js-focused");
}var floatlabels = new FloatLabels("#search-form", {});window.addEventListener("load", javascriptEnabled), window.addEventListener("load", responsiveTables), window.addEventListener("load", toggleAccordion), window.addEventListener("scroll", handleHeader), window.addEventListener("keyup", handleSkipLinks), menuTrigger.addEventListener("click", toggleMenu), invisibleMenuClose.addEventListener("click", toggleMenu), searchTrigger.addEventListener("click", toggleSearch);