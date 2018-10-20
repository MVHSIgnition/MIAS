var div = document.createElement('div');


div.classList.add('mias_container');

if (document.body.firstChild){
    document.body.insertBefore(div, document.body.firstChild);
}
else{
    document.body.appendChild(div);
}

div.innerHTML += 'Article bias: ';
xhr = new XMLHttpRequest();
xhr2 = new XMLHttpRequest();
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
                console.log(JSON.stringify(json2.content) + "\n\n" + JSON.stringify(json2.title));
                div.innerHTML += JSON.stringify(json2.content.decision) + " Score (0 being most biased, 1 being most impartial): " + JSON.stringify(json2.content.score);
            }
        }
        var data = JSON.stringify({'url':window.location.href,'title': json.title,'content': json.body});
        xhr2.send(data);
    }
}
xhr.send();