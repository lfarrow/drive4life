/* Config Variables */
var photosetsBaseUrl = 	"https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=664143ad8b5f27abb6825680945c8b85&user_id=141809452%40N02&extras=url_o&format=json",
	photoBaseUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=664143ad8b5f27abb6825680945c8b85&format=json",
	photosetId = '72157674243645195',
	perPage = 3,
	page = 0;

/* Global Variables */
var	totalPages = 0,
	photoBatch = [],
	photoInfoBatch = [],
	counter = 0,
	loading = false,
	$template = $('#template'),
	$container = $('#container');

function makeRequest(baseUrl, successFunction, errorFunction, extraParameters) {
	loading = true;

	var newUrl = baseUrl;

	if(extraParameters != undefined) {
		newUrl += extraParameters;
	}

	$.ajax({
	    url: newUrl,
	    dataType: 'jsonp',
	    jsonp: 'jsoncallback',
	    success: successFunction,
	    error: errorFunction
	});
}

function init() {
	makeRequest(photosetsBaseUrl, function(data) {
		totalPages = data.photoset.pages; // Set number of pages
		page = totalPages + 1; // Increment by one so first call will be correct

		getPhotos(); // Make first call
	},
	function(error) {
		console.log(error);
		loading = false;
	}, '&per_page=' + perPage + '&photoset_id=' + photosetId);
}

function getPhotos() {
	page = page - 1;

	makeRequest(photosetsBaseUrl, function(data) {
		totalPages = data.photoset.pages;
		getDescriptions(data);
	},
	function(error) {
		console.log(error);
	}, '&per_page=' + perPage + '&photoset_id=' + photosetId + '&page=' + page);
}

function getDescriptions(data) {

	photoBatch = data.photoset.photo;

	for (var i = 0; i < photoBatch.length; i++) {
		makeRequest(photoBaseUrl, function(data) {
			photoInfoBatch.push(data.photo);
			counter++;

			if(counter == photoBatch.length) {
				counter = 0;
				attachDescriptions();	
			}
		},
		function(error) {
			console.log(error);
		}, '&photo_id=' + photoBatch[i].id);	
	}
}

function attachDescriptions() {
	for (var i = 0; i < photoBatch.length; i++) {
		for (var x = 0; x < photoInfoBatch.length; x++) {
			if(photoBatch[i].title == photoInfoBatch[x].title._content) {
				photoBatch[i].description = photoInfoBatch[x].description._content;
			}
		}
	}
	appendQuotes();
}

function appendQuotes() {
	for (var i = 0; i < photoBatch.length; i++) {
		var $newQuote = $template.clone();

		$newQuote.removeAttr('id');
		$newQuote.removeClass('blockquote-template');

		$newQuote.find('p').html(photoBatch[i].description);
		$newQuote.find('img').attr('src', photoBatch[i].url_o);
		$newQuote.find('.author').html(photoBatch[i].title);

		$container.append($newQuote);
	}

	photoBatch.length = photoInfoBatch.length = 0;

	loading = false;
}

function loadMore() {
	var scrollTop     	= $(window).scrollTop(),
	    elementOffset 	= $('blockquote:last').prev().offset().top,
	    element2Offset 	= $('blockquote:last').offset().top,
	    distance      	= (elementOffset - scrollTop),
	    distance2		= (element2Offset - scrollTop);

	if((distance <= 0 || distance2 <= 0) && !loading && page != 0) {
		getPhotos();
	}
	else if(page == 0 && !loading) {
		$('#loader').hide();
	}
}

$(window).resize(loadMore);
$(window).scroll(loadMore);

init(); // Get number of pages and make first call