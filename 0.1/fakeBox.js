xhr = new XMLHttpRequest();
xhr2 = new XMLHttpRequest();
var url = "http://localhost:8080/fakebox/check";
/*if (typeof strTitle=='undefined'){
		arrTitles = document.getElementsByName("og:title"); //Try og:title
		if (arrTitles.length <= 0){arrTitles = document.getElementsByName("DC.title");} //Try DC.title
		if (arrTitles.length <= 0){arrTitles = document.getElementsByName("headline");} //Try headline
		/*if (arrTitles.length <= 0){ //If no name tags, loop meta tags instead
			for (i = 0; i < arrMeta.length; i++) {
				if (arrMeta[i].getAttribute("property")=="og:title"){strTitle = arrMeta[i].content;} //Find og:title in property attributes
			}
		}*/

	/*	//If anything found, assign it to Title
		if (typeof arrTitle!='undefined'){strTitle = arrTitles[0].content;}

		//Worst case, use html title
		if (typeof strTitle=='undefined'){
			strTitle = document.title;
		}

		//Slice off | and -
		if (typeof strTitle!='undefined'){
			if (strTitle.indexOf("|") != -1){strTitle=strTitle.slice(0, strTitle.indexOf("|")-1);} //Slice off trailing |
			if (strTitle.indexOf("--") != -1){strTitle=strTitle.slice(0, strTitle.indexOf("--")-1);} //Slice off trailing --
			if (strTitle.indexOf(" - ") != -1){strTitle=strTitle.slice(0, strTitle.indexOf(" - "));} //Slice off trailing -
		}
	}

//console.log(strTitle);


/*
curl --request GET \
  --url 'https://document-parser-api.lateral.io/?url=http://www.bbc.com/news/31047780' \
  --header 'content-type: application/json' \
  --header 'subscription-key: API_KEY' | python -m json.tool


*/
xhr.open("GET", 'https://document-parser-api.lateral.io/?url='+window.location.href, true);
xhr.setRequestHeader("Content-type", "application/json");
xhr.setRequestHeader('subscription-key', 'e45749374a35a4f62a6408650661b28b');
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var json = JSON.parse(xhr.responseText);
        xhr2.open("POST", url, true);
        xhr2.setRequestHeader("Content-type", "application/json");
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState == 4 && xhr2.status == 200) {
                var json2 = JSON.parse(xhr2.responseText);
                console.log(JSON.stringify(json2.content) + "\n\n" + JSON.stringify(json2.title))
            }
        }
        var data = JSON.stringify({'url':window.location.href,'title': json.title,'content': json.body});
        xhr2.send(data);
    }
}
xhr.send();
