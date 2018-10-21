/*
var AylienNewsApi = 'aylien-news-api';

var apiInstance = new AylienNewsApi.DefaultApi();

// Configure API key authorization: app_id
var app_id = apiInstance.apiClient.authentications['app_id'];
app_id.apiKey = "f2ceabc2";

// Configure API key authorization: app_key
var app_key = apiInstance.apiClient.authentications['app_key'];
app_key.apiKey = "4aa0715bddaf684e505187c09ed93777";

var opts = {
'title': 'trump',
'sortBy': 'social_shares_count.facebook',
'language': ['en'],
'publishedAtStart': 'NOW-7DAYS',
'publishedAtEnd': 'NOW',
'entitiesBodyLinksDbpedia': [
'http://dbpedia.org/resource/Donald_Trump',
'http://dbpedia.org/resource/Hillary_Rodham_Clinton'
]
};*/
var script = document.createElement('script');
script.src = '//https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
//document.getElementsByTagName('head')[0].appendChild(script);

var div = document.createElement('div');
var spanOne = document.createElement('span');
var spanTwo = document.createElement('span');
var spanThree = document.createElement('span');
var spanFour = document.createElement('span');
var drag = document.createElement('div');
var sourceDiv = document.createElement('div');
var altDiv = document.createElement('div');


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Rate limit headers are as follows:');
    console.log('X-RateLimit-Limit:', response.headers['x-ratelimit-limit']);
    console.log('X-RateLimit-Remaining:', response.headers['x-ratelimit-remaining']);
    console.log('X-RateLimit-Reset:', response.headers['x-ratelimit-reset']);
  }
};

div.classList.add('mias_container');
div.setAttribute('id', 'main-div');

if (document.body.firstChild){
  document.body.insertBefore(div, document.body.firstChild);
  document.body.insertBefore(drag, document.body.firstChild);
  //document.body.insertBefore(img, document.body.firstChild);
}
else{
  document.body.appendChild(div);
  document.body.appendChild(drag);
  //document.body.appendChild(img);
}

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

xhr = new XMLHttpRequest();
xhr2 = new XMLHttpRequest();
xhr3 = new XMLHttpRequest();
var url = "http://localhost:8080/fakebox/check";
console.log("hiiiiiiiiii");

getTabSource(window.location.href, function(source, bias) {
  //console.log(source, bias);
  if (source) {
    sourceDiv.innerHTML = '<p>Source: <a href="' + source.homepage + '">' + source.name + '</a><br/>Bias: ' + bias.name + '</p>';
  }

  spanOne.setAttribute("style", "font-weight: bold;");
  spanTwo.setAttribute("style", "font-weight: bold;");
  spanOne.innerHTML += 'Article bias: ';


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
          //console.log(JSON.stringify(json2.content) + "\n\n" + JSON.stringify(json2.title) + "\n\n" + JSON.stringify(json2.keywords)+JSON.stringify(json2.domain.category));



          var totalMessages = json2.content.keywords.length;
          //console.log("sdfsdf" + totalMessages);
          var keywords = ""

          for ( var i = 0; i < totalMessages; i++)
          {
            if (JSON.stringify(json2.content.keywords[i].keyword).indexOf(' ')>=0)
            {

            }
            else{
              var s = JSON.stringify(json2.content.keywords[i].keyword);
              keywords += s.slice(1,s.length-1) + "%20AND%20"
            }

          }

          var lastIndex = keywords.lastIndexOf("%20AND%");

          keywords = keywords.substring(0, lastIndex);
          //console.log(keywords);
          xhr3.open("GET", "https://newsapi.org/v2/everything?q="+keywords+"&from="+JSON.stringify(json2.date)+"&sortBy=publishedAt&apiKey=b86805fe9ad8438696f50c72993d0fd8");
          //console.log('aaaaaajl');
          //console.log("sd" + "https://newsapi.org/v2/everything?q="+keywords+"&from="+JSON.stringify(json2.date)+"&sortBy=publishedAt&apiKey=b86805fe9ad8438696f50c72993d0fd8");
          xhr3.setRequestHeader("Content-type", "application/json");
          xhr3.onreadystatechange = function () {
            if (xhr3.readyState == 4 && xhr3.status == 200) {
              var json3 = JSON.parse(xhr3.responseText);

              for (var i = 0; i < json3.totalResults; i++) {
                console.log("s,",JSON.stringify(json3.articles[i].url))
                s = JSON.stringify(json3.articles[i].url);
                altDiv.innerHTML += '<p><a href="'+s+'">Article '+i+'</a></p>';
              }
              console.log("hi"+JSON.stringify(json3.totalResults));

            }
          }
          xhr3.send();

          if (sourceDiv.innerHTML == '') {
            sourceDiv.innerHTML = '<p>Source: ' + json2.domain.domain + '<br/></p>';
          }
          sourceDiv.innerHTML += '<p>Category: ' + json2.domain.category + '</p>';

          spanThree.innerHTML += JSON.stringify(json2.content.decision);
          if(parseFloat(JSON.stringify(json2.content.score))<0.25) {
            spanThree.setAttribute("style", "color: red");
          } else if(parseFloat(JSON.stringify(json2.content.score))>0.7) {
            spanThree.setAttribute("style", "color: green");
          } else {
            spanThree.setAttribute("style", "color: yellow");
          }
          console.log(spanThree.classList);
          spanTwo.innerHTML += " Score: ";

          div.innerHTML += Math.round(parseFloat(JSON.stringify(json2.content.score))*100)/100;
          //var data = JSON.stringify({'url':window.location.href,'title': json.title,'content': json.body});
          //xhr2.send(data);
        }
      }
      var data = JSON.stringify({'url':window.location.href,'title': json.title,'content': json.body});
      xhr2.send(data);
    }
  }

  xhr.send();

  div.appendChild(sourceDiv);
  div.appendChild(spanOne);
  div.appendChild(spanThree);
  div.appendChild(spanTwo);
  div.appendChild(altDiv);
});
