xhr = new XMLHttpRequest();
xhr2 = new XMLHttpRequest();
xhr3 = new XMLHttpRequest();
var url = "http://localhost:8080/fakebox/check";

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
                console.log(JSON.stringify(json2.content) + "\n\n" + JSON.stringify(json2.title) + "\n\n" + JSON.stringify(json2.keywords));
                //xhr3.open("GET", "https://newsapi.org/v2/everything?q="json2."&from="JSON.stringify(json2.date)"&sortBy=publishedAt&apiKey=b86805fe9ad8438696f50c72993d0fd8")
            }
        }
        var data = JSON.stringify({'url':window.location.href,'title': json.title,'content': json.body});
        xhr2.send(data);
    }
}
xhr.send();
