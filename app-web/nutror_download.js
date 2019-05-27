function QueryData(queryString, preserveDuplicates){

  // if a query string wasn't specified, use the query string from the URL
  if (queryString == undefined){
    queryString = location.search ? location.search : '';
  }

  // remove the leading question mark from the query string if it is present
  if (queryString.charAt(0) == '?') queryString = queryString.substring(1);

  // check whether the query string is empty
  if (queryString.length > 0){

    // replace plus signs in the query string with spaces
    queryString = queryString.replace(/\+/g, ' ');

    // split the query string around ampersands and semicolons
    var queryComponents = queryString.split(/[&;]/g);

    // loop over the query string components
    for (var index = 0; index < queryComponents.length; index ++){

      // extract this component's key-value pair
      var keyValuePair = queryComponents[index].split('=');
      var key          = decodeURIComponent(keyValuePair[0]);
      var value        = keyValuePair.length > 1
        ? decodeURIComponent(keyValuePair[1])
        : '';

      // check whether duplicates should be preserved
      if (preserveDuplicates){

        // create the value array if necessary and store the value
        if (!(key in this)) this[key] = [];
        this[key].push(value);

      }else{

        // store the value
        this[key] = value;

      }

    }

  }

}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    // Exemplo de requisição GET
      var ajax = new XMLHttpRequest();

    // Seta tipo de requisição e URL com os parâmetros
    ajax.open("GET", url, true);

      let authToken = localStorage.getItem('newAuthToken');

      if (authToken) {
        ajax.setRequestHeader('Authorization', `Bearer ${authToken}`);
      }

    // Envia a requisição
      ajax.send();

    // Cria um evento para receber o retorno.
      ajax.onreadystatechange = () => {
        console.log(`Ready state: ${ajax.readyState} / Status: ${ajax.status} / Response text: ${ajax.responseText}`);

        // Caso o state seja 4 e o http.status for 200, é porque a requisiçõe deu certo.
        if (ajax.readyState == 4 && ajax.status == 200) {
          resolve(ajax.responseText);
          return;
        } else if (ajax.readyState == 4 && ajax.status != 200) {
          reject(ajax.responseText);
        }
      }
  });
}

var promises = [];

document.querySelectorAll('.card-lesson-block .thumbLink').forEach((a, idx) => {
  // promises.push(httpGet(a.href).then((response) => response, (err) => err));
  let completeUrl = a.href;
  let pieces = completeUrl.split('/');
  if (pieces.length > 0) {
    let lessonId = pieces.pop();
    promises.push(httpGet(`https://v3.nutror.com/learner/lessons/${lessonId}`).then((response) => response, (err) => err));
  } else {
    console.log('ERROR = ' + completeUrl);
  }
});
// console.log(promises);

Promise.all(promises).then(
  (responses) => {
    console.log(responses);
    var links = [];
    responses.forEach((response) => {
      let responseParsed = JSON.parse(response);
      let data = responseParsed.data;
      links.push(data.content.replace('vimeo.com/', 'https://player.vimeo.com/video/'));
    });
    console.log(links.join('\n'));
  }
);
