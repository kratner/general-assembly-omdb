// omdb.js
var $ = jQuery.noConflict();

var base = "http://www.omdbapi.com/";

var se;
var sb;
var dr;
var det;
var html;

$(document).ready(init);

function init(e) {
	se = $("input#search");
	sb = $("button#searchbtn");
	sb.attr("disabled", "disabled");
	se.keyup(validate);
	det = $("div#detail");
}

function validate(e) {
	if (se.val().length > 3) {
		sb.removeAttr("disabled");
		sb.click(search);
	} else {
		sb.attr("disabled", "disabled");
		sb.off("click");
	}
}

function search(e) {
	txt = se.val();
	d = {
		t: txt
	};
	s = {
		data : d,
		success : searchComplete
	};
	$.ajax(base,s);
}

function searchComplete(d,s,j) {
	dr = $.parseJSON(d);
	showResults(dr);
}

function showResults(dr) {
	html = "";
	html += "<h4>" + dr.Title + "</h4>";
	html += "<table>";
	for (prop in dr) {
		if ( prop == "Poster") {
			//html += '<tr><td>' + prop + '</td><td><img src="' + dr[prop] + '" /></td></tr>';
			html += '<tr><td valign="top"><strong>' + prop + '</strong></td><td valign="top"><a href="' + dr[prop] + '" target="_blank">View Poster</a></td></tr>';
		} else if ( prop == "imdbID") {
			html += '<tr><td valign="top"><strong>IMDB Link</strong></td><td valign="top"><a href="http://www.imdb.com/title/' + dr[prop] + '" target="_blank">View IMDB Entry</a></td></tr>';			
		} else if ( prop == "Type" || prop == "Response") {
			html += "";
		} else {
			html += '<tr><td valign="top"><strong>' + prop + '</strong></td><td valign="top">' + dr[prop] + '</td></tr>';
		}
	}
	html += "</table>";
	det.html(html);
}