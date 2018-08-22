// ------------------------------------------------------------------------------ //
//
// Template name : Bootsnav - Multi Purpose Header
// Categorie : Bootstrap Menu in CSS
// Author : adamnurdin01
// Version : v.1.2
// Created : 2016-06-02
// Last update : 2016-10-19
//
// ------------------------------------------------------------------------------ //

(function($) {
	"use strict";

	var bootsnav = {
		initialize: function() {
			this.event();
			this.hoverDropdown();
			this.navbarSticky();
			this.navbarScrollspy();
		},
		event: function() {

			// ------------------------------------------------------------------------------ //
			// Variable
			// ------------------------------------------------------------------------------ //
			var getNav = $("nav.navbar.bootsnav");

			// ------------------------------------------------------------------------------ //
			// Navbar Sticky 
			// ------------------------------------------------------------------------------ //
			var navSticky = getNav.hasClass("navbar-sticky");
			if(navSticky) {
				// Wraped navigation
				getNav.wrap("<div class='wrap-sticky'></div>");
			}

			// ------------------------------------------------------------------------------ //
			// Navbar Center 
			// ------------------------------------------------------------------------------ //
			if(getNav.hasClass("brand-center")) {
				var postsArr = new Array(),
					index = $("nav.brand-center"),
					$postsList = index.find('ul.navbar-nav');

				index.prepend("<span class='storage-name' style='display:none;'></span>");

				//Create array of all posts in lists
				index.find('ul.navbar-nav > li').each(function() {
					if($(this).hasClass("active")) {
						var getElement = $("a", this).eq(0).text();
						$(".storage-name").html(getElement);
					}
					postsArr.push($(this).html());
				});

				//Split the array at this point. The original array is altered.
				var firstList = postsArr.splice(0, Math.round(postsArr.length / 2)),
					secondList = postsArr,
					ListHTML = '';

				var createHTML = function(list) {
					ListHTML = '';
					for(var i = 0; i < list.length; i++) {
						ListHTML += '<li>' + list[i] + '</li>'
					}
				}

				//Generate HTML for first list
				createHTML(firstList);
				$postsList.html(ListHTML);
				index.find("ul.nav").first().addClass("navbar-left");

				//Generate HTML for second list
				createHTML(secondList);
				//Create new list after original one
				$postsList.after('<ul class="nav navbar-nav"></ul>').next().html(ListHTML);
				index.find("ul.nav").last().addClass("navbar-right");

				//Wrap navigation menu
				index.find("ul.nav.navbar-left").wrap("<div class='col-half left'></div>");
				index.find("ul.nav.navbar-right").wrap("<div class='col-half right'></div>");

				//Selection Class
				index.find('ul.navbar-nav > li').each(function() {
					var dropDown = $("ul.dropdown-menu", this),
						megaMenu = $("ul.megamenu-content", this);
					dropDown.closest("li").addClass("dropdown");
					megaMenu.closest("li").addClass("megamenu-fw");
				});

				var getName = $(".storage-name").html();
				if(!getName == "") {
					$("ul.navbar-nav > li:contains('" + getName + "')").addClass("active");
				}
			}

			// ------------------------------------------------------------------------------ //
			// Navbar Sidebar 
			// ------------------------------------------------------------------------------ //
			if(getNav.hasClass("navbar-sidebar")) {
				// Add Class to body
				$("body").addClass("wrap-nav-sidebar");
				getNav.wrapInner("<div class='scroller'></div>");
			} else {
				$(".bootsnav").addClass("on");
			}

			// ------------------------------------------------------------------------------ //
			// Menu Center 
			// ------------------------------------------------------------------------------ //
			if(getNav.find("ul.nav").hasClass("navbar-center")) {
				getNav.addClass("menu-center");
			}

			// ------------------------------------------------------------------------------ //
			// Navbar Full
			// ------------------------------------------------------------------------------ //
			if(getNav.hasClass("navbar-full")) {
				// Add Class to body
				$("nav.navbar.bootsnav").find("ul.nav").wrap("<div class='wrap-full-menu'></div>");
				$(".wrap-full-menu").wrap("<div class='nav-full'></div>");
				$("ul.nav.navbar-nav").prepend("<li class='close-full-menu'><a href='#'><span class='glyphicon glyphicon-remove'></span></a></li>");
			} else if(getNav.hasClass("navbar-mobile")) {
				getNav.removeClass("no-full");
			} else {
				getNav.addClass("no-full");
			}

			// ------------------------------------------------------------------------------ //
			// Navbar Mobile
			// ------------------------------------------------------------------------------ //
			if(getNav.hasClass("navbar-mobile")) {
				// Add Class to body
				$('.navbar-collapse').on('shown.bs.collapse', function() {
					$("body").addClass("side-right");
				});
				$('.navbar-collapse').on('hide.bs.collapse', function() {
					$("body").removeClass("side-right");
				});

				$(window).on("resize", function() {
					$("body").removeClass("side-right");
				});
			}

			// ------------------------------------------------------------------------------ //
			// Navbar Fixed
			// ------------------------------------------------------------------------------ //
			if(getNav.hasClass("no-background")) {
				$(window).on("scroll", function() {
					var scrollTop = $(window).scrollTop();
					if(scrollTop > 34) {
						$(".navbar-fixed").removeClass("no-background");
					} else {
						$(".navbar-fixed").addClass("no-background");
					}
				});
			}

			// ------------------------------------------------------------------------------ //
			// Navbar Fixed
			// ------------------------------------------------------------------------------ //
			if(getNav.hasClass("navbar-transparent")) {
				$(window).on("scroll", function() {
					var scrollTop = $(window).scrollTop();
					if(scrollTop > 34) {
						$(".navbar-fixed").removeClass("navbar-transparent");
					} else {
						$(".navbar-fixed").addClass("navbar-transparent");
					}
				});
			}

			// ------------------------------------------------------------------------------ //
			// Button Cart
			// ------------------------------------------------------------------------------ //
			$(".btn-cart").on("click", function(e) {
				e.stopPropagation();
			});

			// ------------------------------------------------------------------------------ //
			// Toggle Search
			// ------------------------------------------------------------------------------ //
			$("nav.navbar.bootsnav .attr-nav").each(function() {
				$("li.search > a", this).on("click", function(e) {
					e.preventDefault();
					$(".top-search").slideToggle();
				});
			});
			$(".input-group-addon.close-search").on("click", function() {
				$(".top-search").slideUp();
			});

			// ------------------------------------------------------------------------------ //
			// Toggle Side Menu
			// ------------------------------------------------------------------------------ //
			$("nav.navbar.bootsnav .attr-nav").each(function() {
				$("li.side-menu > a", this).on("click", function(e) {
					e.preventDefault();
					$("nav.navbar.bootsnav > .side").toggleClass("on");
					$("body").toggleClass("on-side");
				});
			});
			$(".side .close-side").on("click", function(e) {
				e.preventDefault();
				$("nav.navbar.bootsnav > .side").removeClass("on");
				$("body").removeClass("on-side");
			});

			// ------------------------------------------------------------------------------ //
			// Wrapper
			// ------------------------------------------------------------------------------ //
			//          $("body").wrapInner( "<div class='wrapper'></div>");
		},

		// ------------------------------------------------------------------------------ //
		// Change dropdown to hover on dekstop
		// ------------------------------------------------------------------------------ //
		hoverDropdown: function() {
			var getNav = $("nav.navbar.bootsnav"),
				getWindow = $(window).width(),
				getHeight = $(window).height(),
				getIn = getNav.find("ul.nav").data("in"),
				getOut = getNav.find("ul.nav").data("out");

			if(getWindow < 991) {

				// Height of scroll navigation sidebar
				$(".scroller").css("height", "auto");

				// Disable mouseenter event
				$("nav.navbar.bootsnav ul.nav").find("li.dropdown").off("mouseenter");
				$("nav.navbar.bootsnav ul.nav").find("li.dropdown").off("mouseleave");
				$("nav.navbar.bootsnav ul.nav").find(".title").off("mouseenter");
				$("nav.navbar.bootsnav ul.nav").off("mouseleave");
				$(".navbar-collapse").removeClass("animated");

				// Enable click event
				$("nav.navbar.bootsnav ul.nav").each(function() {
					$(".dropdown-menu", this).addClass("animated");
					$(".dropdown-menu", this).removeClass(getOut);

					// Dropdown Fade Toggle
					$("a.dropdown-toggle", this).off('click');
					$("a.dropdown-toggle", this).on('click', function(e) {
						e.stopPropagation();
						$(this).closest("li.dropdown").find(".dropdown-menu").first().stop().fadeToggle().toggleClass(getIn);
						$(this).closest("li.dropdown").first().toggleClass("on");
						return false;
					});

					// Hidden dropdown action
					$('li.dropdown', this).each(function() {
						$(this).find(".dropdown-menu").stop().fadeOut();
						$(this).on('hidden.bs.dropdown', function() {
							$(this).find(".dropdown-menu").stop().fadeOut();
						});
						return false;
					});

					// Megamenu style
					$(".megamenu-fw", this).each(function() {
						$(".col-menu", this).each(function() {
							$(".content", this).addClass("animated");
							$(".content", this).stop().fadeOut();
							$(".title", this).off("click");
							$(".title", this).on("click", function() {
								$(this).closest(".col-menu").find(".content").stop().fadeToggle().addClass(getIn);
								$(this).closest(".col-menu").toggleClass("on");
								return false;
							});

							$(".content", this).on("click", function(e) {
								e.stopPropagation();
							});
						});
					});
				});

				// Hidden dropdown
				var cleanOpen = function() {
					$('li.dropdown', this).removeClass("on");
					$(".dropdown-menu", this).stop().fadeOut();
					$(".dropdown-menu", this).removeClass(getIn);
					$(".col-menu", this).removeClass("on");
					$(".col-menu .content", this).stop().fadeOut();
					$(".col-menu .content", this).removeClass(getIn);
				}

				// Hidden om mouse leave
				$("nav.navbar.bootsnav").on("mouseleave", function() {
					cleanOpen();
				});

				// Enable click atribute navigation
				$("nav.navbar.bootsnav .attr-nav").each(function() {
					$(".dropdown-menu", this).removeClass("animated");
					$("li.dropdown", this).off("mouseenter");
					$("li.dropdown", this).off("mouseleave");
					$("a.dropdown-toggle", this).off('click');
					$("a.dropdown-toggle", this).on('click', function(e) {
						e.stopPropagation();
						$(this).closest("li.dropdown").find(".dropdown-menu").first().stop().fadeToggle();
						$(".navbar-toggle").each(function() {
							$(".glyphicon", this).removeClass("glyphicon-remove");
							$(".glyphicon", this).addClass("glyphicon-th-list");
							$(".navbar-collapse").removeClass("in");
							$(".navbar-collapse").removeClass("on");
						});
					});

					$(this).on("mouseleave", function() {
						$(".dropdown-menu", this).stop().fadeOut();
						$("li.dropdown", this).removeClass("on");
						return false;
					});
				});

				// Toggle Bars
				$(".navbar-toggle").each(function() {
					$(this).off("click");
					$(this).on("click", function() {
						$(".glyphicon", this).toggleClass("glyphicon-th-list");
						$(".glyphicon", this).toggleClass("glyphicon-remove");
						cleanOpen();
					});
				});

			} else if(getWindow > 991) {
				// Height of scroll navigation sidebar
				$(".scroller").css("height", getHeight + "px");

				// Navbar Sidebar
				if(getNav.hasClass("navbar-sidebar")) {
					// Hover effect Sidebar Menu
					$("nav.navbar.bootsnav ul.nav").each(function() {
						$("a.dropdown-toggle", this).off('click');
						$("a.dropdown-toggle", this).on('click', function(e) {
							e.stopPropagation();
						});

						$(".dropdown-menu", this).addClass("animated");
						$("li.dropdown", this).on("mouseenter", function() {
							$(".dropdown-menu", this).eq(0).removeClass(getOut);
							$(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(getIn);
							$(this).addClass("on");
							return false;
						});

						$(".col-menu").each(function() {
							$(".content", this).addClass("animated");
							$(".title", this).on("mouseenter", function() {
								$(this).closest(".col-menu").find(".content").stop().fadeIn().addClass(getIn);
								$(this).closest(".col-menu").addClass("on");
								return false;
							});
						});

						$(this).on("mouseleave", function() {
							$(".dropdown-menu", this).stop().removeClass(getIn);
							$(".dropdown-menu", this).stop().addClass(getOut).fadeOut();
							$(".col-menu", this).find(".content").stop().fadeOut().removeClass(getIn);
							$(".col-menu", this).removeClass("on");
							$("li.dropdown", this).removeClass("on");
							return false;
						});
					});
				} else {
					// Hover effect Default Menu
					$("nav.navbar.bootsnav ul.nav").each(function() {
						$("a.dropdown-toggle", this).off('click');
						$("a.dropdown-toggle", this).on('click', function(e) {
							e.stopPropagation();
						});

						$(".megamenu-fw", this).each(function() {
							$(".title", this).off("click");
							$("a.dropdown-toggle", this).off("click");
							$(".content").removeClass("animated");
						});

						$(".dropdown-menu", this).addClass("animated");
						$("li.dropdown", this).on("mouseenter", function() {
							$(".dropdown-menu", this).eq(0).removeClass(getOut);
							$(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(getIn);
							$(this).addClass("on");
							return false;
						});

						$("li.dropdown", this).on("mouseleave", function() {
							$(".dropdown-menu", this).eq(0).removeClass(getIn);
							$(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
							$(this).removeClass("on");
						});

						$(this).on("mouseleave", function() {
							$(".dropdown-menu", this).removeClass(getIn);
							$(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
							$("li.dropdown", this).removeClass("on");
							return false;
						});
					});
				}

				// ------------------------------------------------------------------------------ //
				// Hover effect Atribute Navigation
				// ------------------------------------------------------------------------------ //
				$("nav.navbar.bootsnav .attr-nav").each(function() {
					$("a.dropdown-toggle", this).off('click');
					$("a.dropdown-toggle", this).on('click', function(e) {
						e.stopPropagation();
					});

					$(".dropdown-menu", this).addClass("animated");
					$("li.dropdown", this).on("mouseenter", function() {
						$(".dropdown-menu", this).eq(0).removeClass(getOut);
						$(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(getIn);
						$(this).addClass("on");
						return false;
					});

					$("li.dropdown", this).on("mouseleave", function() {
						$(".dropdown-menu", this).eq(0).removeClass(getIn);
						$(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
						$(this).removeClass("on");
					});

					$(this).on("mouseleave", function() {
						$(".dropdown-menu", this).removeClass(getIn);
						$(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
						$("li.dropdown", this).removeClass("on");
						return false;
					});
				});
			}

			// ------------------------------------------------------------------------------ //
			// Menu Fullscreen
			// ------------------------------------------------------------------------------ //
			if(getNav.hasClass("navbar-full")) {
				var windowHeight = $(window).height(),
					windowWidth = $(window).width();

				$(".nav-full").css("height", windowHeight + "px");
				$(".wrap-full-menu").css("height", windowHeight + "px");
				$(".wrap-full-menu").css("width", windowWidth + "px");

				$(".navbar-collapse").addClass("animated");
				$(".navbar-toggle").each(function() {
					var getId = $(this).data("target");
					$(this).off("click");
					$(this).on("click", function(e) {
						e.preventDefault();
						$(getId).removeClass(getOut);
						$(getId).addClass("in");
						$(getId).addClass(getIn);
						return false;
					});

					$("li.close-full-menu").on("click", function(e) {
						e.preventDefault();
						$(getId).addClass(getOut);
						setTimeout(function() {
							$(getId).removeClass("in");
							$(getId).removeClass(getIn);
						}, 500);
						return false;
					});
				});
			}
		},

		// ------------------------------------------------------------------------------ //
		// Navbar Sticky
		// ------------------------------------------------------------------------------ //
		navbarSticky: function() {
			var getNav = $("nav.navbar.bootsnav"),
				navSticky = getNav.hasClass("navbar-sticky");

			if(navSticky) {

				// Set Height Navigation
				var getHeight = getNav.height();
				$(".wrap-sticky").height(getHeight);

				// Windown on scroll
				var getOffset = $(".wrap-sticky").offset().top;
				$(window).on("scroll", function() {
					var scrollTop = $(window).scrollTop();
					if(scrollTop > getOffset) {
						getNav.addClass("sticked");
					} else {
						getNav.removeClass("sticked");
					}
				});
			}
		},

		// ------------------------------------------------------------------------------ //
		// Navbar Scrollspy
		// ------------------------------------------------------------------------------ //
		navbarScrollspy: function() {
			var navScrollSpy = $(".navbar-scrollspy"),
				$body = $('body'),
				getNav = $('nav.navbar.bootsnav'),
				offset = getNav.outerHeight();

			if(navScrollSpy.length) {
				$body.scrollspy({
					target: '.navbar',
					offset: offset
				});

				// Animation Scrollspy
				$('.scroll').on('click', function(event) {
					event.preventDefault();

					// Active link
					$('.scroll').removeClass("active");
					$(this).addClass("active");

					// Remove navbar collapse
					$(".navbar-collapse").removeClass("in");

					// Toggle Bars
					$(".navbar-toggle").each(function() {
						$(".glyphicon", this).removeClass("glyphicon-remove");
						$(".glyphicon", this).addClass("glyphicon-th-list");
					});

					// Scroll
					var scrollTop = $(window).scrollTop(),
						$anchor = $(this).find('a'),
						$section = $($anchor.attr('href')).offset().top,
						$window = $(window).width(),
						$minusDesktop = getNav.data("minus-value-desktop"),
						$minusMobile = getNav.data("minus-value-mobile"),
						$speed = getNav.data("speed");

					if($window > 992) {
						var $position = $section - $minusDesktop;
					} else {
						var $position = $section - $minusMobile;
					}

					$('html, body').stop().animate({
						scrollTop: $position
					}, $speed);
				});

				// Activate Navigation
				var fixSpy = function() {
					var data = $body.data('bs.scrollspy');
					if(data) {
						offset = getNav.outerHeight();
						data.options.offset = offset;
						$body.data('bs.scrollspy', data);
						$body.scrollspy('refresh');
					}
				}

				// Activate Navigation on resize
				var resizeTimer;
				$(window).on('resize', function() {
					clearTimeout(resizeTimer);
					var resizeTimer = setTimeout(fixSpy, 200);
				});
			}
		}
	};

	// Initialize
	$(document).ready(function() {
		bootsnav.initialize();
	});

	// Reset on resize
	$(window).on("resize", function() {
		bootsnav.hoverDropdown();
		setTimeout(function() {
			bootsnav.navbarSticky();
		}, 500);

		// Toggle Bars
		$(".navbar-toggle").each(function() {
			$(".glyphicon", this).removeClass("glyphicon-remove");
			$(".glyphicon", this).addClass("glyphicon-th-list");
			$(this).removeClass("fixed");
		});
		$(".navbar-collapse").removeClass("in");
		$(".navbar-collapse").removeClass("on");
		$(".navbar-collapse").removeClass("bounceIn");
	});

}(jQuery));

$(function() {
	
	new WOW().init();
	
	$(document).ready(function() {
		$("#index_weixin").mouseover(function(){
			$(".foot_weixin").show();
		});
		$("#index_weixin").mouseout(function(){
			$(".foot_weixin").hide();
		});
	});
	$(document).ready(function() {
    	$(".anli_pc:gt(0)").hide();
		$(".anli_details_dime3 li").each(function(index){
			$(this).click(function(){
				$(".anli_pc").eq(index).show().siblings('.anli_pc').hide();
				$(this).addClass('active').siblings().removeClass('active');
			});
		});
    });
	//首页案例
	$(document).ready(function() {
		$(".index_case").bind("mouseenter mouseleave", function(e) {
			var w = $(this).width();
			var h = $(this).height();
			var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
			var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
			//alert(x);
			var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
			//direction的值为“0,1,2,3”分别对应着“上，右，下，左”
			var eventType = e.type;
			//alert(e.type);
			if(e.type == 'mouseenter') {
				if(direction == 0) {
					$(this).find('.index_case_nr').css({
						'display': 'block',
						'top': -h + 'px',
						'left': '0px'
					}).animate({
						'top': '0px'
					});
				} else if(direction == 1) {
					$(this).find('.index_case_nr').css({
						'display': 'block',
						'left': w + 'px',
						'top': '0px'
					}).animate({
						'left': '0px'
					});
				} else if(direction == 2) {
					$(this).find('.index_case_nr').css({
						'display': 'block',
						'top': h + 'px',
						'left': '0px'
					}).animate({
						'top': '0px'
					});
				} else if(direction == 3) {
					$(this).find('.index_case_nr').css({
						'display': 'block',
						'left': -w + 'px',
						'top': '0px'
					}).animate({
						'left': '0px'
					});
				}
			} else {
				if(direction == 0) {
					$(this).find('.index_case_nr').animate({
						'top': -h + 'px'
					});
				} else if(direction == 1) {
					$(this).find('.index_case_nr').animate({
						'left': w + 'px'
					});
				} else if(direction == 2) {
					$(this).find('.index_case_nr').animate({
						'top': h + 'px'
					});
				} else if(direction == 3) {
					$(this).find('.index_case_nr').animate({
						'left': -w + 'px'
					});
				}
			}
		});
	});
})

window.onload = function() {
	var li = $api.domAll('.title-box-ul li');
	Swipe($api.byId('swipe'), {
		auto: 2000,
		continuous: true,
		callback: function(index, elem) {
			var i = li.length;
			while(i--) {
				li[i].className = '';
			}
			li[index].className = 'active';
		}
	});

	Swipe($('#swipe2')[0], {
		continuous: true
	});
	Swipe($('#swipe3')[0], {
		continuous: true
	});
	Swipe($('#swipe4')[0], {
		continuous: true
	});
	Swipe($('#swipe5')[0], {
		continuous: true
	});

	$('.className').each(function(index, element) {
		Swipe($(element)[0], {
			auto: 2000,
			continuous: true
		});
	});
}