'use strict';
let map;
async function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
  setTimeout(() => map.setCenter(new google.maps.LatLng(34, 118)), 1000);
}
console.log(initMap);
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
