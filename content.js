div = document.createElement('div');

div.id = 'mias_container';

if (document.body.firstChild){
    document.body.insertBefore(div, document.body.firstChild);
}
else{
    document.body.appendChild(div);
}

div.innerHTML += '<p>XDDDDDDD</p>'

