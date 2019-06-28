'use strict'


function formatQueryParams(params) {
  
   const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
   return queryItems.join('&');
}

function getParks(baseURL, stateArr, maxResults, apiKey) {

   const params= {
     stateCode: stateArr,
     limit: maxResults
   }

   const queryString = formatQueryParams(params);
   const url= baseURL + '?' + queryString + '&api_key=' + apiKey;

   console.log(url);
  
   fetch(url)

  .then(response => {
    if (response.ok) {
      return response.json();
     }
    throw new Error ('No results found!');
  })
  .then (responseJson => {
     displayResults(responseJson, maxResults)
  })

  .catch (err => {
    console.log(err);
    $('.error-message').text(`Something went wrong: ${err.message}`);
  });
}

function displayResults(responseJson, maxResults){
    console.log(responseJson);
  
    $('.error-message').empty();

    $('.results-list').empty();

  for(let i=0; i < responseJson.data.length & i < maxResults; i++) {
    $('.results-list').append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p>
        </li>`);
  }
    $('.results').removeClass('hidden'); 

  }
  
function watchForm (){
  
  $('.js-form').submit(event => {
    event.preventDefault();
    const baseURL ='https://developer.nps.gov/api/v1/parks';
    const stateArr = $('.js-search-term').val().split(",");
    const maxResults = $('.js-max-results').val();
    const apiKey = 'XldvoyfZuJ2fuICcJlZ4J01KNyPMXjdOq8qnK7qA';
    getParks(baseURL, stateArr, maxResults, apiKey);
  });
}

$(watchForm)
