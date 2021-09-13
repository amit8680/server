function getCountries() {
    url='/countries';
    fetch(url).then(function(response) {
        return response.json();
      }).then(function(data) {
          checked=selection();
        for (country of data){
            if(checked.includes(country[1])){
            let div = document.createElement('div');
            div.className = 'item';
            div.innerHTML =country[0];
            div.onclick=enableClick(div);
            document.getElementById('list list-5').appendChild(div);
            }
        }
      }).catch(err => {
        console.log('Error: ', err.message);
      });
}
function reload(){
    var node=document.getElementById('list list-5');
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
   getCountries();
   document.getElementById("databox").innerHTML="";
}
function selection(){
    let checkboxes = document.getElementsByName("continent"); 
    let checked=[]
    for(let i = 0; i < checkboxes.length; i++)  
    {  
        if(checkboxes[i].checked)  
            checked.push(checkboxes[i].nextSibling.data); 
    }
    return checked;
}
function enableClick(item){
    item.addEventListener('click',function(){ countryInfo(item.innerHTML)},false);
}
function countryInfo(country){
    url='/countryInfo';
    fetch(url, {
  method: "post",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    country:country
  })
}).then(function(response) {
    return response.json();
  }).then(function(data) {
    document.getElementById("databox").innerHTML=data;
    }
  ).catch(err => {
    console.log('Error: ', err.message);
  });
}