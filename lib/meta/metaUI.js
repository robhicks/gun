
/* UI */
meta.ui = {
	blink: function(){ // hint visually that action has happened
		$('#meta').css('transition', 'none').css('background', 'none')
		setTimeout(function(){
			$('#meta')[0].style.transition = null
			$('#meta')[0].style.background = null
		})
	},
	depth: function(n){
	  if (n) {
			$('#meta').css('background', 'hsl(60, 100%,'+(85-(n*10))+'%)');
		} else {
			$('#meta')[0].style.background = null
		}
	}
}
var $m = $('<div>').attr('id', 'meta');
$m.append($('<span>').html('&#9776;').addClass('meta-start'));
$m.append($('<div>').addClass('meta-menu meta-none').append('<ul>'));
$(document.body).append($m);
css({
	'#meta': {
		display: 'block',
		position: 'fixed',
		bottom: '2em',
		right: '2em',
		background: 'white',
		'font-size': '18pt',
		'font-family': 'Tahoma, arial',
		//'box-shadow': '0px 0px 1px #000044',
		'border-radius': '1em',
		'text-align': 'center',
		'z-index': 999999,
		margin: 0,
		padding: 0,
		width: '2em',
		height: '2em',
		opacity: 0.7,
		outline: 'none',
		color: '#000044',
		overflow: 'visible',
		transition: 'all 0.2s ease-in'
	},
	'#meta *': {outline: 'none'},
	'#meta .meta-none': {display: 'none'},
	'#meta span': {'line-height': '2em'},
	'#meta .meta-menu': {
		background: 'rgba(0,0,0,0.1)',
		width: '12em',
		right: '-2em',
		bottom: '-2em',
		overflow: 'visible',
		position: 'absolute',
		'overflow-y': 'scroll',
		'text-align': 'right',
		'min-height': '20em',
		height: '100vh'
	},
	'#meta .meta-menu ul': {
		padding: 0,
		margin: '1em 1em 2em 0',
		'list-style-type': 'none'
	},
	'#meta .meta-menu ul li': {
		display: 'block',
		background: 'white',
		padding: '0.5em 1em',
		'border-radius': '1em',
		'margin-left': '0.25em',
		'margin-top': '0.25em',
		'float': 'right',
		'cursor':  'pointer'
	},
	'#meta a': {color: 'black'},
//	'#meta:hover': {opacity: 1},
	'#meta .meta-menu ul:before': {
		content: "' '",
		display: 'block',
		'min-height': '15em',
		height: '50vh'
	},
//	'#meta li': {
//		background: 'white',
//		padding: '0.5em 1em',
//		'border-radius': '1em',
//		'margin-left': '0.25em',
//		'margin-top': '0.25em',
//		'float': 'right'
//	},
//	'#meta:hover .meta-menu': {display: 'block'}
});
function css(css){
	var tmp = '';
	$.each(css, function(c,r){
		tmp += c + ' {\n';
		$.each(r, function(k,v){
			tmp += '\t'+ k +': '+ v +';\n';
		});
		tmp += '}\n';
	});
	var tag = document.createElement('style');
	tag.innerHTML = tmp;
	$m.append(tag)
}
//}catch(e){}


	