//letter "O" in logo
$(function() {
$('.logo-litera').each(function() {
	var ths = $(this);
	ths.html(ths.html().replace('O', '<span class="litera">O</span>'));
	});

	// search
	$('.search').click(function() {
		$('.search-field').stop().slideToggle();
		$('.search-field input[type=text]').focus();
	});
	$(document).keyup(function (e) { 
		if (e.keyCode == 27) {
			$('.search-field').slideUp();
		}
	}).click(function(){
		$('.search-field').slideUp();
});
$('.search-wrap').click(function(e){
	e.stopPropagation();
	});
// Integrate mobile-menu
	$('.top-line').after('<div class="mobile-menu d-lg-none">');
	$('.top-menu').clone().appendTo('.mobile-menu');
	$('.mobile-menu-button').click(function() {
		$('.mobile-menu').stop().slideToggle();
	});

});
