const axios = require("axios");
const db = require("../utils");

const STATES_DATA = "https://covid19-brazil-api.now.sh/api/report/v1";
const BRAZIL_DATA = "https://covid19.mathdro.id/api/countries/BR";
const WORLD_DATA = "https://covid19.mathdro.id/api";

async function getDate() {
  await axios.get(STATES_DATA).then(
    response => {
      statesData = response.data;
      console.log(statesData);
    },
    error => {
      console.log(error);
    }
  );

  await axios.get(BRAZIL_DATA).then(
    response => {
      brazilData = {
        confirmed: response.data.confirmed.value,
        recovered: response.data.recovered.value,
        deaths: response.data.deaths.value
      };
      console.log(brazilData);
    },
    error => {
      console.log(error);
    }
  );

  await axios.get(WORLD_DATA).then(response => {
    worldData = {
      confirmed: response.data.confirmed.value,
      recovered: response.data.recovered.value,
      deaths: response.data.deaths.value
    };
    console.log(worldData);
  });

  db.createJsonDb({ statesData, brazilData, worldData });
}

setInterval(() => {
  getData();
}, 600000);

getDate();
