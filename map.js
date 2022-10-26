const map = L.map('map-canvas').setView([-42.42, 174.55], 5);

const icon = L.icon({
    iconUrl: '/marker.svg',
    iconSize:     [25, 75],
    iconAnchor:   [10, 55],
    popupAnchor:  [-2, -25]
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
    {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
    .addTo(map);

for (let i = 0; i < markers.length; i++ ) {
    const marker = L.marker([markers[i].latitude, markers[i].longitude], {icon: icon}).addTo(map);
    marker.bindPopup(
    `<div class="marker-info">
        <img class="marker-info__image" src="${markers[i].image}">
        <div class="marker-info__text">
        <p class="marker-info__title">${markers[i].name}</p>
        <p>Status: ${markers[i].status}</p>
        </div>
    </div>`
    );
}