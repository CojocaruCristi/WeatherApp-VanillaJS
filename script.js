window.addEventListener('load',() => {
    let long;
    let lat;
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';//This allows to fetch data from API
            const ApiUrl = `${proxy}https://api.darksky.net/forecast/47dd9badb523a4b4258d995b863e1444/${lat},${long}`;

            fetch(ApiUrl)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                    locationTimezone.textContent = data.timezone;
                    temperatureDegree.textContent = data.currently.temperature;
                    temperatureDescription.textContent = data.currently.summary;
                    //Set weather icon
                    setIcons(data.currently.icon, document.querySelector(".icon"))
                })
        })
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({"color": "white"});
        skycons.add(iconID, icon);
        skycons.play();
    }
});