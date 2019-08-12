'use strict';

const apiKey = 'eD14wia8rogauYwTP9YAOicaoQp00j1tvFHx3gTl';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params) 
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function showResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('#results-list').append(
            `<li>
                <h3>${responseJson.data[i].fullName}</h3>
                <p>${responseJson.data[i].description}</p>
                <a href="${responseJson.data[i].url}"><p>Visit the ${responseJson.data[i].name} Website</p></a>
            </li>`
        )
    };
    $('#results').removeClass('hidden');
};

function getParks(query, limit=10) {
    let stateCode = $('#js-search-state').val();
    const params = {
        api_key: apiKey,
        q: query,
        stateCode: stateCode,
        limit
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => showResults(responseJson))
        .catch(err => {
            $('#js-error-mgs').text(`Something went wrong: ${err.message}`);
        });
}

function formListener() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-state').val();
        const limit = $('#js-max-results').val();
        getParks(searchTerm, limit);
    });
}

$(formListener);