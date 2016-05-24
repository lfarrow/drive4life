var menuIcon, nav, header, body;

function calculateNavHeight() {
	nav.style.maxHeight = (window.innerHeight - header.clientHeight) + 'px';
}

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
			addInputListener(document.forms["0"].getElementsByTagName("input"));
			addInputListener(document.forms["0"].getElementsByTagName("textarea"));			
		}

		function addInputListener(elements) {
			if (elements != undefined) {
				for(var i = 0; i < elements.length; i++) {
					elements[i].addEventListener("input", onInputChange);
				}
			}
		}

		function onInputChange() {
			var input = this;
		    if (input.value.length > 0) {
		    	addClassToElement(input, 'populated');
		    } else {
		    	removeClassFromElement(input, 'populated');
		    }
		};

		function addClassToElement(element, className) {
			element.classList.add(className);
		}

		function removeClassFromElement(element, className) {
			element.classList.remove(className);
		}
	}
}