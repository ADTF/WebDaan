/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



		(function() {
			var support = { transitions: Modernizr.csstransitions },
				// transition end event name
				transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
				transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
				onEndTransition = function( el, callback ) {
					var onEndCallbackFn = function( ev ) {
						if( support.transitions ) {
							if( ev.target != this ) return;
							this.removeEventListener( transEndEventName, onEndCallbackFn );
						}
						if( callback && typeof callback === 'function' ) { callback.call(this); }
					};
					if( support.transitions ) {
						el.addEventListener( transEndEventName, onEndCallbackFn );
					}
					else {
						onEndCallbackFn();
					}
				};

			new GridFx(document.querySelector('.grid'), {
				imgPosition : {
					x : 1,
					y : -0.75
				},
				onOpenItem : function(instance, item) {
					var win = {width: window.innerWidth, height: window.innerHeight};
					instance.items.forEach(function(el) {
						if(item != el) {
							var delay = Math.floor(Math.random() * 130);
							el.style.WebkitTransition = 'opacity .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1), -webkit-transform .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1)';
							el.style.transition = 'opacity .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1), transform .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1)';
							
							var elOffset = el.getBoundingClientRect(),
								elSize = {width : el.offsetWidth, height : el.offsetHeight};

							el.style.WebkitTransform = 'translate3d(' + (win.width/2 - elOffset.left - elSize.width/2) + 'px,' + (win.height - elOffset.top - elSize.height/2) + 'px,0) scale3d(0,0,1)';
							el.style.transform = 'translate3d(' + (win.width/2 - elOffset.left - elSize.width/2) + 'px,' + (win.height - elOffset.top - elSize.height/2) + 'px,0) scale3d(0,0,1)';
							el.style.opacity = 0;
						}
					});
				},
				onCloseItem : function(instance, item) {
					instance.items.forEach(function(el) {
						if(item != el) {
							el.style.WebkitTransition = 'opacity .3s, -webkit-transform .3s';
							el.style.transition = 'opacity .3s, transform .3s';

							el.style.WebkitTransform = 'translate3d(0,0,0) scale3d(1,1,1)';
							el.style.transform = 'translate3d(0,0,0) scale3d(1,1,1)';
							el.style.opacity = 1;

							onEndTransition(el, function() {
								el.style.transition = 'none';
								el.style.WebkitTransform = 'none';
							});
						}
					});
				}
			});
		})();   