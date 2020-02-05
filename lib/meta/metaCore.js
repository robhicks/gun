

var noop = function(){}, u;
$.fn.or = function(s){ return this.length ? this : $(s||'body') };
var m = window.meta = {edit:[]};
var k = m.key = {};
k.meta = {17:17, 91:17, 93:17, 224:17}; // ctrl met

function withMeta(eve){ return eve.metaKey || eve.ctrlKey }

k.down = function(eve){
  if(eve.repeat){ return }
	var key = (k.eve = m.eve = eve).which = eve.which || eve.fake || eve.keyCode;

	// ADDED
	//if(!m.flip.is() && !k.meta[key]){ return } // cancel non-open events when closed TODO make optional
	if(!k.meta[key] && withMeta(eve) && !k.at[key]) { return m.flip(false) } // cancel and close when no action and "meta key" held down (e.g. ctrl+c)

	if(!eve.fake && key === k.last){ return }; k.last = key; // jussi: polyfilling eve.repeat?
	if(!eve.fake && $(eve.target).closest('input, textarea, [contenteditable=true]').length && !$(eve.target).closest('#meta').length){
		if(!meta.flip.is() && !withMeta(eve)){ // cancel meta/hud during text input UNLESS hud is open OR cmd key is held down.
			return;
		}
		//if(k.meta[key]){ k.down.meta = key = -1 }
		//if(!k.down.meta){ return }
		// hmmm?
		//if(!k.meta[key] && !meta.flip.is()) return // aserwed
	}
	m.check('on', key, k.at || (k.at = m.edit));
	if(k.meta[key]){
//		m.list(k.at.back || m.edit);
//		if(k.at){ m.flip() } //  && !k.at.back
		m.flip()
	}
}
k.up = function(eve){ var tmp;
	var key = (k.eve = m.eve = eve).which = eve.which || eve.fake || eve.keyCode;
	//if(!m.flip.is() && !k.meta[key]){ return } // ADDED cancel non-open events when closed TODO make optional
//	if(!eve.fake && $(eve.target).closest('input, textarea, [contenteditable=true]').length){
//		if(k.meta[key]){
//			k.down.meta = null;
//			key = -1;
//		} else
//		if(!k.down.meta){ return }
//	}
	k.last = null;
//	if($(':focus').closest('#meta').length){ return }
	m.check('up', key);
	if(27 === eve.which){ k.wipe() } // -1 === key ||
}
m.flip = function(tmp){
	var board = $('#meta .meta-menu');
	((tmp === false) || (!tmp && board.is(':visible')))?
		board.addClass('meta-none')
	: board.removeClass('meta-none');
}
m.flip.is = function(){
	return $('#meta .meta-menu').is(':visible');
}
m.flip.wait = 500;
m.check = function(how, key, at){
	at = k.at || m.edit;
	var next = at[key];
	if(!next){ return }
	var tmp = k.eve || noop;
	if(tmp.preventDefault){ tmp.preventDefault()} // prevent typing (etc) when action found
	if(next[how]){
		//if(tmp.fake && !next.fake){
			//m.tap.next = next;
		//} else {
			next[how](m.eve);
			meta.ui.blink()
			/*if(k.at !== m.next && 'up' === how){
				if(k.down.meta){ m.list(k.at = m.next) }
				else { k.wipe() }
			}*/
		//}
	}
	if('up' == how){ return }
	if(at != next){ next.back = at }
	(k.combo || (k.combo = [])).push(key);
	m.list(next, true);
}
m.list = function(at, opt){
	if(!at){ return m.flip(false) }
//	m.ui.depth(m.key.combo ? m.key.combo.length : 0)
	var l = [];
	$.each(at, function(i,k){ 'back' != i && k.combo && k.name && l.push(k) });
	if(!l.length){ return }
	k.at = at;
	l = l.sort(function(a,b){
		a = a.combo.slice(-1)[0] || 0;
		if(a.length){ a = a.toUpperCase().charCodeAt(0) }
		b = b.combo.slice(-1)[0] || 0;
		if(b.length){ b = b.toUpperCase().charCodeAt(0) }
		return (a < b)? -1 : 1;
	});
	var $ul = $('#meta .meta-menu ul')
	$ul.children('li').addClass('meta-none').hide(); setTimeout(function(){ $ul.children('.meta-none').remove() },250); // necessary fix for weird bug glitch
	$.each(l, function(i, k){
		$ul.append($('<li>').text(k.name).data(k));
	});
	if(opt){ m.flip(true) }
	$ul.append($('<li>').html('&larr;').on('click', function(){
//	  m.key.combo.pop()
		m.list(at.back);
	}));
}
m.ask = function(help, cb){
	var $ul = $('#meta .meta-menu ul').empty();
	var $put = $('<input>').attr('id', 'meta-ask').attr('placeholder', help);
	var $form = $('<form>').append($put).on('submit', function(eve){
		eve.preventDefault();
		cb($put.val());
		$li.remove();
		//k.wipe();
		m.list(k.at);
	});
	var $li = $('<li>').append($form);
	$ul.append($li);
	m.flip(true);
	$put.focus();
}
k.wipe = function(opt){
//	k.down.meta = false;
	k.combo = [];
	if(!opt){ m.flip(false) }
	m.list(k.at = m.edit);
};
m.tap = function(){
	var on = $('.meta-on')
		.or($($(document.querySelectorAll(':hover')).get().reverse()).first())
		.or($(document.elementFromPoint(meta.tap.x||0, meta.tap.y||0)));
	return on;
}
meta.edit = function(edit){
	var tmp = edit.combow = [];
	$.each(edit.combo || (edit.combo = []), function(i,k){
		if(!k || !k.length){ if('number' == typeof k){ tmp.push(k) } return }
		tmp.push(k.toUpperCase().charCodeAt(0));
	});
	var at = meta.edit, l = edit.combo.length;
	$.each(tmp, function(i,k){ at = at[k] = (++i >= l)? edit : at[k] || {} });
	edit.combow = edit.combow.join(',');
	m.list(k.at || meta.edit);
}


	