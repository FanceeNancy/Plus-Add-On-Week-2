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
  let zones = moment.tz.names();
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
  return `${firstLetter}${endOfTheName}`;
}

updateTime();
setInterval(updateTime, 1000);
