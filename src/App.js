import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import './App.css';
import panstwa from './data/panstwa.json';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import FlagBox from './components/FlagBox';
import Table from './components/Table';

function App() {

const [countries, setCountries] = useState([]);
const [country, setCountry] = useState('PL|Polska');
const [flag, setFlag] = useState('https://disease.sh/assets/img/flags/pl.png');
const [countryInfo, setCountryInfo] = useState({});
const [tableData, setTableData] = useState([]);


useEffect(() => {
  const getCountriesData = async () => {

      const countries = panstwa.map((country) => (
        {
          name: country.name,
          code: country.iso2,
        }));

        setCountries(countries);
        await getCountriesFromApi();
  };
  getCountriesData();
  getCovidData('https://disease.sh/v3/covid-19/countries/pl');
}, []);

const getCountriesFromApi = async () => {
  await fetch('https://disease.sh/v3/covid-19/countries')
  .then((response) => response.json())
  .then((data) => {
    data.forEach(element => {
    setTableData(data);

    });
  })
};


const getCovidData = async (url) => {
  await fetch(url)
  .then(response => response.json())
  .then(data => {

    var covidData = {
      lastUpdated: new Date(data.updated).toLocaleString(),
      population: `${(data.population / 1000000).toFixed(2)} mln`,
      todayCases: data.todayCases,
      todayDeaths: data.todayDeaths,
      todayRecovered: data.todayRecovered,
      totalCases: data.cases,
      totalDeaths: data.deaths,
      totalRecovered: data.recovered,
      totalActive: data.active,
      tests: data.tests,
      testsPerMillion: data.testsPerOneMillion,
      percentOfDiscover: `${((data.cases / data.tests) * 100).toFixed(1)} %`,
      activePerOneMillion: data.activePerOneMillion
      };
    
      setCountryInfo(covidData);
  });
}


const onCountryChange = async (event) => {
  const fullValue = event.target.value.split('|');
  const code = fullValue[0];
  const flagPath = `https://disease.sh/assets/img/flags/${code.toLowerCase()}.png`
  setCountry(event.target.value);
  setFlag(flagPath);

  const url = code === 'ALL' 
  ? 'https://disease.sh/v3/covid-19/all' 
  : `https://disease.sh/v3/covid-19/countries/${code.toLowerCase()}`;

  await getCovidData(url);
  console.log(tableData[10]);
};

const fullValue = country.split('|');
const code = fullValue[0];
const name = fullValue[1];
  return (
    <div className="app">

      <div className="app__left">
          <div className="app__header">
            <div className="app__header__title">
              <h1 className="app__title">Statystyki <span className="app__covid">Covid-19</span></h1>
              <p className="app__header__author">Dane pochodzą z serwisu: <a href="https://disease.sh" target="blank">disease.sh</a></p>
              <p className="app__header__author">Programowanie: Andrzej Herman</p>
              
            </div>

            <FormControl className="app__dropdown" style={{minWidth: 250, height: 36}}>
              <Select 
              style={{height: 36}}
              autoWidth={false}
              variant="outlined" 
              onChange={onCountryChange}
              value={country}
              >
              <MenuItem key="PL" value="PL|Polska">Polska</MenuItem>
              {
                countries.map((c) => (
                  <MenuItem key={c.code} value={`${c.code}|${c.name}`}>{c.name}</MenuItem>
                ))
              }
              </Select>
            </FormControl>
          </div>

          <div className="app__stats">
            <FlagBox flag={flag} code={code} name={name} updated={countryInfo.lastUpdated}/>
            <InfoBox title="Zarażeni dzisiaj: " total={countryInfo.totalCases} cases={countryInfo.todayCases}/>
            <InfoBox title="Wyzdrowiało dzisiaj: " total={countryInfo.totalRecovered} cases={countryInfo.todayRecovered}/>
            <InfoBox title="Zmarli dzisiaj: " total={countryInfo.totalDeaths} cases={countryInfo.todayDeaths}/>
          </div>
          <Map />
      </div>

      <Card className="app__right">
          <CardContent>
            <h5 className="fw-400">Przypadki według państw</h5>
            <Table countries={tableData}/>
            <h5 className="fw-400">Nowe przypadki na świecie</h5>
            {/* Graph */}
          </CardContent>
      </Card>

    </div>
  );
}

export default App;
