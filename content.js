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

<<<<<<< HEAD
var getHostName = function (url) {
    try {
      return new URL(url).hostname.match(/(www[0-9]?\.)?(.+)/i)[2];
    } catch (e) {
      return null; // Invalid URL
    }
}
  
var getPath = function (url) {
    try {
      return new URL(url).pathname;
    } catch (e) {
      return '/';
    }
}

window.browser = chrome;
  
var getTabSource = function (url, cb) {
    browser.storage.local.get(['biases', 'sources'], function (items) {
      var hostName = getHostName(url);
      var path = getPath(url);
      var domainSources;
      var source;
  
      var getDomainSource = function (domain) {
        domainSources = items.sources[domain];
        // check if value is an array or object
        if (domainSources) {
          if (domainSources.length) {
            // if array has more than one value
            if (domainSources.length > 1) {
              // iterate
              for (var i = 0; i < domainSources.length; i += 1) {
                // if source hasn't been set, settle for root path
                if (domainSources[i].path === '/' && source === undefined) {
                  source = domainSources[i];
                } else {
                  // check for source's path at beginning of current path
                  if (path.indexOf(domainSources[i].path) === 0) {
                    source = domainSources[i];
                    // we found it, no need to iterate further
                    break;
                  }
                }
              }
              /* note: source could still be undefined if no domain source paths
                were found in current path */
            } else {
              // just match with domain if only one value
              source = domainSources[0];
            }
          } else {
            // not an array, must be slurping old JSON
            source = domainSources;
          }
        } else {
          // see if current domain is actually subdomain and look for source of
          // parent
          const upDomainLevel = domain.match(/[^\.]+\.([^\.]+\..+)/);
          if (upDomainLevel) {
            return getDomainSource(upDomainLevel[1]);
          }
        }
        return source;
      }
  
      if (items.biases !== undefined && items.sources !== undefined) {
        source = getDomainSource(hostName);
  
        if (source !== undefined) {
          var bias = items.biases[source.bias];
        }
      }
      cb(source, bias);
    });
};
  

getTabSource(window.location.href, function(source, bias) {
    console.log(source, bias);
    div.innerHTML += '<h2>' + bias.name + '</h2>';
});

div.innerHTML += 'Article bias: ';
=======
spanOne.setAttribute("style", "font-weight: bold;");
spanTwo.setAttribute("style", "font-weight: bold;");
spanOne.innerHTML += 'Article bias: ';
div.appendChild(spanOne);

>>>>>>> 79060550621beab828433a0bb8c3c61d4bc77737
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
                if(parseFloat(JSON.stringify(json2.content.score))<0.25) {
                	spanThree.setAttribute("style", "color: green");
                	console.log(spanThree.classList);
                } else if(parseFloat(JSON.stringify(json2.content.score))>0.7) {
                	spanThree.setAttribute("style", "color: green");
                } else {
                	spanThree.setAttribute("style", "color: yellow");
                }
                div.appendChild(spanThree);
                spanTwo.innerHTML += " Score: ";
                div.appendChild(spanTwo);
                div.innerHTML += Math.round(parseFloat(JSON.stringify(json2.content.score))*100)/100;
            }
        }
        var data = JSON.stringify({'url':window.location.href,'title': json.title,'content': json.body});
        xhr2.send(data);
    }
}
xhr.send();
