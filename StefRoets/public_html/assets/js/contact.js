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
		
	initializeButtons();
	
	initTextarea();
		
	$("#form-section-next").click(function() {
		
		enterPressed();
	});
	
	$("#form-section-submit").click(function() {
		console.log("Sending form");
		
		$("#form-input-submit").click();
	});
	
	function enterPressed() {
		var i = 0;
		while ( i < $("#form-step-" + _counter).attr("data-input-number")) {
			console.log("Result input check: " + checkInput(_counter, i));
			if (!checkInput(_counter, i)) {
				focusNextInput();
				console.log("Going to next input");
				return false;
			}
			i++;
		}
		
		if (_counter < _number )
			focusNextSlide();
		
	}
	
	function initializeButtons() {
		if ($("#form-section-next").is(":visible"))
			$("#form-section-submit").hide();
	}	
	
	$('.form-input').keypress(function (e) {
		if (e.which == 13) {
			e.preventDefault();
			return enterPressed();
		}
	});
	
	function checkSection() {
		
	}
	
	function checkInput(section ,input) {
		console.log("Checking input: " + section + " - " + input);
		console.log("Value: " + $("#input-" + section + "-" + input).val());
		
		if ($("#input-" + section + "-" + input).val() == "") {
			return true;
		}
		
		return false;
	}
	
	function focusNextInput() {
		for (var i = 0; i < $("#form-step-" + _counter).attr("data-input-number"); i++) {
			if ($("#input-" + _counter + "-" + i).val() == "") {
				$("#input-" + _counter + "-" + i).focus();
				return false;
			}
		}
	}
	
	function focusNextSlide() {
		_counter++;
		
		$("#form-wrapper").scrollTo($("#form-step-" + _counter), 1000);
		
		if (_counter == _number) {
			$("#form-section-next").hide("slow");
			$("#form-section-submit").show("slow");

		} else {
			$("#input-" + _counter + "-0").focus();
		}
	}
	
	jQuery.fn.scrollTo = function(elem, speed) { 
		$(this).animate({
			scrollTop:  $(this).scrollTop() - $(this).offset().top + $(elem).offset().top 
		}, speed == undefined ? 1000 : speed); 
		return this; 
	};
	
	$(".form-input-radio").on("change", function() {
	   console.log("Checked input: " + $(this).attr("value"));
	   console.log("Next section: " + $(this).attr("data-input-next"));
	   
	   var next = $(this).attr("data-input-next");
	   _counter = next;
	   
	   $("#form-step-" + _counter).toggleClass("inactive", false);
	   $("#form-wrapper").scrollTo($("#form-step-" + _counter), 1000);
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
			}
		});
		
		e.preventDefault();
    });
	
	function hideAllSections(elem) {
		$(elem).children().hide(); 
	}
	
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
});