'use strict';
let map;
// Function to switch between screens
function showScreen(screenId) {
  const allScreens = document.querySelectorAll('.content');
  allScreens.forEach((screen) => screen.classList.add('hidden'));
  document.getElementById(screenId)?.classList.remove('hidden');
}
// Handle 'Plan My Trip' submission
const tripForm = document.getElementById('trip-form');
tripForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Extract form inputs
  const start = document.getElementById('start').value;
  const destination = document.getElementById('destination').value;
  const range = document.getElementById('range').value;
  // Validate inputs
  if (!start || !destination || !range) {
    alert('Please fill out all fields.');
    return;
  }
  // Navigate to Map Screen
  showScreen('map-screen');
  const [startLat, startLng] = start.split(',');
  const [destinationLat, destinationLng] = destination.split(',');
  // Mock data: Populate map and stations
  displayMap(
    { lat: startLat, lng: startLng },
    { lat: destinationLat, lng: destinationLng },
  );
  displayStations();
});
// Display map (placeholder)
function displayMap(start, destination) {
  map.setCenter(new google.maps.LatLng(+start.lat, +start.lng));
  console.log(destination);
}
// Display charging stations (mock data)
function displayStations() {
  const stations = [
    { name: 'Station 1', address: '123 Main St', distance: '2 miles' },
    { name: 'Station 2', address: '456 Elm St', distance: '5 miles' },
    { name: 'Station 3', address: '789 Oak St', distance: '10 miles' },
  ];
  const stationsList = document.getElementById('stations-list');
  if (stationsList) {
    stationsList.innerHTML = stations
      .map(
        (station) => `
      <li>
        <strong>${station.name}</strong><br />
        Address: ${station.address}<br />
        Distance: ${station.distance}
      </li>
    `,
      )
      .join('');
  }
}
// Menu navigation
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach((menuItem) => {
  menuItem.addEventListener('click', () => {
    const targetScreen = menuItem.getAttribute('data-screen');
    if (targetScreen) {
      showScreen(targetScreen);
    }
  });
});
async function initMap() {
  /*
    const { Map } = (await google.maps.importLibrary(
      'maps',
    )) as google.maps.MapsLibrary;
    map = new Map(document.getElementById('map') as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
    */
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 18,
  });
}
console.log(initMap);
/*
const loader = new Loader({
  apiKey: 'API_KEY',
  version: 'weekly',
});

loader.load().then(async () => {
  console.log('hi');
  const { Map } = (await google.maps.importLibrary(
    'maps',
  )) as google.maps.MapsLibrary;
  map = new Map(document.getElementById('map') as HTMLElement, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
});

*/
document.addEventListener('DOMContentLoaded', () => {
  const apiKey = prompt('Enter your Google Maps API KEY');
  const sTag = document.createElement('script');
  sTag.setAttribute('async', '');
  sTag.setAttribute(
    'src',
    `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&callback=initMap`,
  );
  document.body.appendChild(sTag);
});
