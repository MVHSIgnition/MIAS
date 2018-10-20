var div = document.createElement('div');
var spanOne = document.createElement('span');
var spanTwo = document.createElement('span');
var spanThree = document.createElement('span');

div.classList.add('mias_container');

if (document.body.firstChild){
    document.body.insertBefore(div, document.body.firstChild);
}
else{
    document.body.appendChild(div);
}

spanOne.setAttribute("style", "font-weight: bold;");
spanTwo.setAttribute("style", "font-weight: bold;");
spanOne.innerHTML += 'Bias: ';
div.appendChild(spanOne);

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

                spanThree.innerHTML += JSON.stringify(json2.content.decision);
                if(Double.parseDouble(JSON.stringify(json2.content.score))<0.25) {
                	spanThree.classList.add('high');
                } else if(Double.parseDouble(JSON.stringify(json2.content.score))>0.7) {
                	spanThree.classList.add('low');
                } else {
                	spanThree.classList.add('med');
                }
                div.appendChild(spanThree);
                spanTwo.innerHTML += " Score: ";
                div.appendChild(spanTwo);
                div.innerHTML += Math.round(Math.round(Double.parseDouble(JSON.stringify(json2.content.score)))*100)/100;
                div.innerHTML += JSON.stringify(json2.content.decision) + " Score (0 being most biased, 1 being most impartial): " + JSON.stringify(json2.content.score);
            }
        }
        var data = JSON.stringify({'url':window.location.href,'title': json.title,'content': json.body});
        xhr2.send(data);
    }
}
xhr.send();