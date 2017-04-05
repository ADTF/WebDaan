$(document).ready(function() {
	var _number = $("#contact-form").attr("data-input-sections");
	var _counter = 0;
	var _vraagcounter = 0;
	
	var observe;
	if (window.attachEvent) {
		observe = function (element, event, handler) {
			element.attachEvent('on'+event, handler);
		};
	}
	else {
		observe = function (element, event, handler) {
			element.addEventListener(event, handler, false);
		};
	}
		
	
        
	initTextarea();
        function initTextarea() {
            var text = document.getElementById('input-5-0');
		function resize () {
                    text.style.height = 'auto';
                    text.style.height = text.scrollHeight+'px';
		}
		function delayedResize () {
                    window.setTimeout(resize, 0);
		}
            observe(text, 'change',  resize);
            observe(text, 'cut',     delayedResize);
            observe(text, 'paste',   delayedResize);
            observe(text, 'drop',    delayedResize);
            observe(text, 'keydown', delayedResize);
            resize();
	}
        
        $('.form-input').keypress(function (e) {
		if (e.which === 13) {
			e.preventDefault();
			return enterPressed();
		}
	});
	
	$("#form-section-submit").click(function() {
		console.log("Sending form");
		$("#form-input-submit").click();
	});	

	$("#contact-form").submit(function(e) {	
		var dataString = $("#contact-form").serialize();
		hideAllSections("#contact-form");
		$("#form-section-message").show();
		$.ajax({
			type: "POST",
			url: "form_submit.php",
			data: dataString,
			success: function(msg) {
				console.log('working: '+msg);
				$("#form-section-message-text").text("Bedankt voor u mail. <br>U ontvangt zo snel mogelijk een antwoord.");
				$("#form-section-message").attr("class", "message-succes");
				
			},
			error: function(msg) {
				console.log('not working '+msg);
                                $("#form-section-message-text").text("Er liep iets fout, probeer opnieuw.");
			}
		});
		
		e.preventDefault();
    });
	
	function hideAllSections(elem) {
		$(elem).children().hide(); 
	}
	
		
});