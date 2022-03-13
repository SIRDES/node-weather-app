const formEl = document.querySelector("form");
const searchInputEl = document.querySelector("input");
const errorEl = document.querySelector("#error");
const locationEl = document.querySelector("#locationDetails");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchInputEl.value;
  const url = `/weather?address=${location}`;

  locationEl.textContent = "Loading..."
  errorEl.textContent=""
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        locationEl.textContent= ""
        errorEl.textContent = data.error
        console.log(data.error);
      } else {
        errorEl.textContent = ""
        locationEl.textContent = `Place Name: ${data.place_name}\nTemperature: ${data.temperature}`
        console.log(data);
      }
    });
  });
  searchInputEl.value = "";
});
