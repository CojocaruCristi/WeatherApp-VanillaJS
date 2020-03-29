window.addEventListener('load',() => {
    let long;
    let lat;
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');
    let degreeSection = document.querySelector('.degree-section');
    let temperatureSpan = document.querySelector('.degree-section span');

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
                    //Set DOM elements
                    locationTimezone.textContent = data.timezone;
                    temperatureDegree.textContent = data.currently.temperature;
                    temperatureSpan.textContent = 'F';
                    temperatureDescription.textContent = data.currently.summary;
                    let celsius = (data.currently.temperature - 32) * (5 / 9);//Formula to celsius
                    //Set weather icon
                    setIcons(data.currently.icon, document.querySelector(".icon"));
                    //Change fahrenheit in to celsius
                    degreeSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === 'F'){
                            temperatureDegree.textContent = Math.floor(celsius);
                            temperatureSpan.textContent = 'C';
                        }else{
                            temperatureDegree.textContent = data.currently.temperature;
                            temperatureSpan.textContent = 'F';
                        }
                    });
                })
        })
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({"color": "white"});
        skycons.add(iconID, icon);
        skycons.play();
    }
});