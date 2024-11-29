function updateTime() {
  let cityNameElement = document.querySelectorAll(".city");

  for (i = 0; i < cityNameElement.length; i++) {
    let firstCityElement = document.querySelector(`#${cityNameElement[i].id}`);
    let firstCityDateElement = firstCityElement.querySelector(".date");
    let firstCityTimeElement = firstCityElement.querySelector(".time");
    let fullCityName = pprintCityName(firstCityElement.id);

    let timezone = getTimezoneFromCity(fullCityName);
    let firstCityTime = moment().tz(`${timezone}`);
    let cityTime = firstCityTime.format("h:mm:ss");
    let cityTimeAMorPM = firstCityTime.format("A z");

    firstCityDateElement.innerHTML = firstCityTime.format("MMMM Do, YYYY");
    firstCityTimeElement.innerHTML = `${cityTime} <small>${cityTimeAMorPM}</small>`;
  }
}

function getTimezoneFromCity(cityName) {
  const zones = moment.tz.names();
  for (const zone of zones) {
    if (zone.includes(cityName)) {
      return zone;
    }
  }
  return null; // City not found
}

function pprintCityName(cityNameWithAZ) {
  if (cityNameWithAZ.includes("-")) {
    let cityNameFirstPart = cityNameWithAZ.split("-")[0];
    let updatedFirstPart = pprintOneName(cityNameFirstPart);
    let cityNameSecondPart = cityNameWithAZ.split("-")[1];
    let updatedSecondPart = pprintOneName(cityNameSecondPart);
    return `${updatedFirstPart}_${updatedSecondPart}`;
  } else {
    let updatedCityName = pprintOneName(cityNameWithAZ);
    return updatedCityName;
  }
}

function pprintCityNameTwo(cityNameWithAZ) {
  if (cityNameWithAZ.includes("-")) {
    let cityNameFirstPart = cityNameWithAZ.split("-")[0];
    let updatedFirstPart = pprintOneName(cityNameFirstPart);
    let cityNameSecondPart = cityNameWithAZ.split("-")[1];
    let updatedSecondPart = pprintOneName(cityNameSecondPart);
    return `${updatedFirstPart} ${updatedSecondPart}`;
  } else {
    let updatedCityName = pprintOneName(cityNameWithAZ);
    return updatedCityName;
  }
}

function pprintOneName(cityNameWithAZ) {
  let cityName = cityNameWithAZ.split("");
  let firstLetter = cityName[0].toUpperCase();
  let endOfTheName = "";
  for (let i = 1; i < cityName.length; i++) {
    endOfTheName += cityName[i];
  }
  let updatedName = `${firstLetter}${endOfTheName}`;
  return updatedName;
}

function updateCity(event) {
  console.log(event.target.value);
  let timezone;
  let fullCityName;
  let cityId;
  if (event.target.value === "current") {
    timezone = moment.tz.guess();
    fullCityName = timezone.split("/")[1].replace("_", " ");
    cityId = timezone.split("/")[1].replace("_", "-").toLowerCase();
  } else {
    cityId = event.target.value;
    timezone = getTimezoneFromCity(fullCityName);
    fullCityName = pprintCityNameTwo(event.target.value);
  }
  console.log(timezone);
  console.log(fullCityName);
  console.log(cityId);
  let citiesElement = document.querySelector("#chosen-city");
  console.log(citiesElement);
  citiesElement.innerHTML = `
  <div class="city" id="${cityId}">
            <div>
              <h2>${fullCityName}</h2>
              <div class="date"></div>
            </div>
            <div class="time"></div>
          </div>`;
  citiesElement.classList.add("show");
}

updateTime();
setInterval(updateTime, 1000);

let citySelectElement = document.querySelector("#city-select");
citySelectElement.addEventListener("change", updateCity);
