import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = 'da23baaa428a424f94bb25ec0a3d28c5';

type GoogleGeocodingResponse = {
    {results: {geometry: { location: {lat: number; lng: number} } }[]};
}

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    axios
    .get<GoogleGeocodingResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
            enteredAddress
        )}&key=${GOOGLE_API_KEY}`
        )
        .then(response => {
            const coordinates = response.data.results[0].geometry.location;
        })
        .catch(err =>{
            console.log(err);
        });
}

form.addEventListener('submit', searchAddressHandler);

// `https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=da23baaa428a424f94bb25ec0a3d28c5