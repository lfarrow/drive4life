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
	}
}