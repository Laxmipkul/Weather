const apiKey = '182a0f047c23437390261613252507';
const btn = document.getElementById('getWeatherBtn');
const input = document.getElementById('locationInput');
const resultDiv = document.getElementById('weatherResult');

btn.addEventListener('click', () => {
  const location = input.value.trim();
  if (!location) {
    resultDiv.innerHTML = 'Please enter a location.';
    return;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Location not found');
      }
      return response.json();
    })
    .then(data => {
      const temp = data.current.temp_c;
      const condition = data.current.condition.text;
      const icon = data.current.condition.icon;
      resultDiv.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <img src="${icon}" alt="${condition}">
        <p><strong>${temp}°C</strong> - ${condition}</p>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = 'Error: ' + error.message;
    });
});
