$(function() {
$('.logo-litera').each(function() {
	var ths = $(this);
	ths.html(ths.html().replace('O', '<span>O</span>'));
	});
});
