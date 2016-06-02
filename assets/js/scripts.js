/* Functions */
function addClassToElement(element, className) {
	element.classList.add(className);
};

function removeClassFromElement(element, className) {
	element.classList.remove(className);
};

function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

function addInputListeners(elements) {
	if (elements != undefined) {
		for(var i = 0; i < elements.length; i++) {
			elements[i].addEventListener("input", onInputChange);
			elements[i].addEventListener("blur", validateInput);
			elements[i].addEventListener("input", validateInvalidInput);
		}
	}
};

function onInputChange() {
	var input = this;
    if (input.value.length > 0) {
    	addClassToElement(input, 'populated');
    } else {
    	removeClassFromElement(input, 'populated');
    }
};

function validateInput(element) {
	var input;
	if(this == window || this == document) {
		input = element;
	}
	else {
		input = this;
	}

	var inputValue = input.value,
		valid = true,
		message = '',
		inputGroup = findAncestor(input, 'input-group'),
		minLength = input.getAttribute('minlength'),
		maxLength = input.getAttribute('maxlength'),
		required = input.getAttribute('required'),
		type = input.getAttribute('type'),
		emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
		
	if(required != null && (inputValue == null || inputValue == '')) {
    	valid = false;
    	message = 'Required field!';
    }
    else if(minLength != null && inputValue.length < minLength) {
    	valid = false;
    	message = 'Too few characters!';
    }
    else if(maxLength != null && inputValue.length > maxLength) {
    	valid = false;
    	message = 'Too many characters!';
    }     
    else if(type == 'email' && !(inputValue.match(emailRegex)) ) {
    	valid = false;
    	message = 'Invalid email address!';
    }

    if(valid) {
		removeClassFromElement(inputGroup, 'invalid');
	}
	else {
		addClassToElement(inputGroup, 'invalid');
		inputGroup.getElementsByClassName('validation-message')[0].innerHTML = message;		
	}
};

function validateInvalidInput() {
	var input = this,
		inputGroup = findAncestor(input, 'input-group');

	if(inputGroup.classList.contains('invalid')) {
		validateInput(input);
	}
}

function calculateNavHeight() {
	nav.style.maxHeight = (window.innerHeight - header.clientHeight) + 'px';
};


/* Main Code */
var menuIcon, nav, header, body;

document.onreadystatechange = function () {
    if(document.readyState === "complete") {
		menuIcon = document.querySelector('.menu-icon');
		nav = document.querySelector('nav');
		header = document.querySelector('header');
		body = document.querySelector('body');

		//If menu icon clicked, toggle the class on the menu links to show/hide them
		menuIcon.onclick = function(){
		    if (body.classList.contains('show-menu')) {
				body.classList.remove('show-menu');
				nav.style.maxHeight = 0;
			}
			else {
				body.classList.add('show-menu');
				calculateNavHeight();
			}
		};

		if (document.forms["0"] != undefined) {
			addInputListeners(document.forms["0"].getElementsByTagName("input"));
			addInputListeners(document.forms["0"].getElementsByTagName("textarea"));			
		}
	}
}




