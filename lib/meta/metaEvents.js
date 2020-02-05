
var m = meta, k = m.key;
$(window).on('focus', k.wipe.bind(null, false)); // .on('blur', k.wipe.bind(null, false))
$(document).on('mousedown mousemove mouseup', function(eve){
	m.tap.eve = eve;
	m.tap.x = eve.pageX||0;
	m.tap.y = eve.pageY||0;
	m.tap.on = $(eve.target);
})
// Setting m.tap.edit has been commented, so should never end up here?
//.on('mousedown touchstart', function(eve){
//	var tmp = m.tap.edit;
//	if(!tmp || !tmp.on){ return }
//	tmp.on(eve);
//	m.tap.edit = null;
//});

//$(document).on('touchstart', '#meta .meta-start', function(eve){ m.tap.stun = true });

var [start, end] = 'ontouchstart' in window
										? ['touchstart', 'touchend']
										: ['mousedown', 'mouseup']

$(document).on(start, '#meta .meta-menu li', function(eve){
	var combo = $(this).data().combo;
	eve.fake = eve.which = combo && combo.slice(-1)[0].charCodeAt(0);
	eve.tap = true;
	k.down(eve);
	$(document).one(end, () => k.up(eve))
return;
//	if(m.tap.stun){ return m.tap.stun = false }
//	if(!(eve.fake = eve.which = (($(this).text().match(/[A-Z]/)||{})[0]||'').toUpperCase().charCodeAt(0))){ return }
//	eve.tap = true;
//	k.down(eve);
//	k.up(eve);
});
$(document).on('keydown', k.down).on('keyup', k.up);

$('#meta').on('click', function(ev) {
  if (ev.target.tagName == 'LI' || ev.target.tagName == 'UL') return
	meta.flip()
})

//$(document).on('select contextmenu keyup mouseup', '[contenteditable=true]', m.text.on);


	