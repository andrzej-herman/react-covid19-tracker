import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import panstwa from './data/panstwa.json';
import InfoBox from './components/InfoBox';
import CountryTable from './components/table/CountryTable';
import { sortDataByTotal, sortDataByToday, sortDataByMilion, sortDataByTestMilion, sortDataByPercent } from './util';
import LineGraph from './components/LineGraph';
import { Container, Row, Col, Form, Card, Tabs, Tab } from 'react-bootstrap'
import WorldMap from './components/table/worldmap/WorldMap';
import 'leaflet/dist/leaflet.css';

function App() {

const [countries, setCountries] = useState([]);
const [country, setCountry] = useState('PL|Polska');
const [flag, setFlag] = useState('https://disease.sh/assets/img/flags/pl.png');
const [countryInfo, setCountryInfo] = useState({});
const [tableDataByTotal, setTableDataByTotal] = useState([]);
const [tableDataByToday, setTableDataByToday] = useState([]);
const [tableDataByMilion, setTableDataByMilion] = useState([]);
const [tableDataByTestMilion, setTableDataByTestMilion] = useState([]);
const [tableDataByPercent, setTableDataByPercent] = useState([]);
const [tableCategory, setTableCategory] = useState('today');
const [mapCenter, setMapCenter] = useState({lat: 51.75, lng: 19.46667});
const [mapZoom, setMapZoom] = useState(4);
const [mapCountries, setMapCountries] = useState([]);


useEffect(() => {
  const getCountriesData = async () => {

      const countries = panstwa.map((country) => (
        {
          name: country.name,
          code: country.iso2,
        }));

        setCountries(countries);
        const data = await getCountriesFromApi();
        var readyDataTotal = [];
        var readyDataToday = [];
        var readyDataMilion = [];
        var readyDataTest = [];
        var readyDataPercent = [];
        var countriesWithPoland = countries;
        countriesWithPoland.push({
          name: "Polska",
          code: "PL"
       }); 
        var index = 1;
        data.total.forEach(element => {
          const result = countriesWithPoland.find( ({ code }) => code === element.countryInfo.iso2 );
          const cases = (element.cases / 1000).toFixed(2) + " tyś";
          if (result !== undefined) {
            readyDataTotal.push( { name: result.name, totalCases: cases, position: index } );
            index++;
          } 
        });

        index = 1;
        data.today.forEach(element => {
          const result = countriesWithPoland.find( ({ code }) => code === element.countryInfo.iso2 );
          const cases = (element.todayCases / 1000).toFixed(2) + " tyś";
          if (result !== undefined) {
            readyDataToday.push( { name: result.name, totalCases: cases, position: index } );
            index++;
          } 
        });

        index = 1;
        data.milion.forEach(element => {
          const result = countriesWithPoland.find( ({ code }) => code === element.countryInfo.iso2 );
          const cases = element.casesPerOneMillion;
          if (result !== undefined) {
            readyDataMilion.push( { name: result.name, totalCases: cases, position: index } );
            index++;
          } 
        });

        index = 1;
        data.test.forEach(element => {
          const result = countriesWithPoland.find( ({ code }) => code === element.countryInfo.iso2 );
          const cases = element.testsPerOneMillion;
          if (result !== undefined) {
            readyDataTest.push( { name: result.name, totalCases: cases, position: index } );
            index++;
          } 
        });

        index = 1;
        data.percent.forEach(element => {
          const result = countriesWithPoland.find( ({ code }) => code === element.countryInfo.iso2 );
          const cases = ((element.cases / element.tests) * 100).toFixed(1) + " %";
          if (result !== undefined) {
            if (cases !== 'Infinity %') {
              readyDataPercent.push( { name: result.name, totalCases: cases, position: index } );
              index++;
            }  
          } 
        });

        setTableDataByTotal(readyDataTotal);
        setTableDataByToday(readyDataToday);
        setTableDataByMilion(readyDataMilion);
        setTableDataByTestMilion(readyDataTest);
        setTableDataByPercent(readyDataPercent);
        
  };
  getCountriesData();
  getCovidData('https://disease.sh/v3/covid-19/countries/pl');
}, []);

const getCountriesFromApi = async () => {
  var data = { total: [], today: [], milion: [], test: [], percent: [] };
  var byTotal = [];
  var byToday = [];
  var byMilion = [];
  var byTest = [];
  var byPercent = [];
  await fetch('https://disease.sh/v3/covid-19/countries')
  .then((response) => response.json())
  .then((data) => {
    byTotal = sortDataByTotal(data);
    byToday = sortDataByToday(data);
    byMilion = sortDataByMilion(data);
    byTest = sortDataByTestMilion(data);
    byPercent = sortDataByPercent(data);
  })

  data = {
    total: byTotal,
    today: byToday,
    milion: byMilion,
    test: byTest,
    percent: byPercent
  }
  return data;
};


const getCovidData = async (url, world) => {
  await fetch(url)
  .then(response => response.json())
  .then(data => {

    let covidData ={};

    if (!world) {
      covidData = {
        lat: data.countryInfo.lat,
        lng: data.countryInfo.long,
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
    } else {
      covidData = {
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
    }
  }

      setCountryInfo(covidData);
      if (!world) {
        setMapCenter({ lat: covidData.lat, lng: covidData.lng });
        setMapZoom(4);
      } else {
        setMapCenter({ lat: 34.80746, lng: -40.4796 });
        setMapZoom(2);
      }

      return covidData;
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

  let world = code === 'ALL' ? true : false;
  await getCovidData(url, world);
 
};

const onCategoryChange = (event) => {
  setTableCategory(event.target.value);
};

// const fullValue = country.split('|');
// const code = fullValue[0];
// const name = fullValue[1];

  var tableData = tableCategory === 'today' ? tableDataByToday : 
  tableCategory === 'total' ? tableDataByTotal : tableCategory === "perMilion" ? tableDataByMilion 
  : tableCategory === 'test' ? tableDataByTestMilion : tableDataByPercent;
  
  
  var tableTitle = tableCategory === 'today' ? 'Zarażenia dzisiaj (wg państw)' : 
  tableCategory === 'total' ? 'Zarażenia łącznie (wg państw)' : tableCategory === "perMilion" ? 'Zarażenia na milion mieszkańców (wg państw)' 
  : tableCategory === 'test' ? 'Wykonane testy na milion mieszkańców (wg państw)' : "Procent wyników pozytywnych w testach (wg państwa)"; 

  return (
    <Container className="app">
      <Row>
        <Col>
          <div className="app__header">
            <h1 className="app__title">Statystyki<span className="app__covid"> Covid-19</span></h1>
            <p className="app__header__author">Dane pochodzą z serwisu: <a href="https://disease.sh" target="blank">disease.sh</a></p>
            <p className="app__header__author">Realizacja: Andrzej Herman</p>
          </div>
        </Col>
        <Col>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Wybierz państwo</Form.Label>
            <Form.Control as="select" onChange={onCountryChange} value={country}>
              <option value="PL|Polska">Polska</option>
                {
                    countries.map((c) => (
                    <option key={c.code} value={`${c.code}|${c.name}`}>{c.name}</option>
                    ))
                }
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row className="app__boxes">
        <Col className="infoBox">
          <InfoBox title="zarazeni" total={countryInfo.totalCases} cases={countryInfo.todayCases} updated={countryInfo.lastUpdated}/>
        </Col>
        <Col className="infoBox" >
          <InfoBox title="wyzdrowialo" total={countryInfo.totalRecovered} cases={countryInfo.todayRecovered} updated={countryInfo.lastUpdated}/>
        </Col>
        <Col className="infoBox" >
          <InfoBox title="zgony" total={countryInfo.totalDeaths} cases={countryInfo.todayDeaths} updated={countryInfo.lastUpdated}/>
        </Col>
      </Row>    

      <Row className="app__tabs">
        <Col>
          <Card>
            <Card.Body>
              <Tabs>
                <Tab eventKey="mapa" title="Mapa zakażeń">
                  <div className="tab__content">
                      <WorldMap countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
                  </div>
                </Tab>
                <Tab eventKey="tabela" title="Tabele kategorii">
                  <div className="tab__content">                 
                    <Form.Group controlId="exampleForm.ControlSelect2">
                      <Form.Label style={{fontSize: 12}}>Wybierz kategorię</Form.Label>
                      <Form.Control as="select" size="sm" onChange={onCategoryChange} value={tableCategory}>
                        <option value="today">zarażenia dzisiaj</option>
                        <option value="total">zarażenia ogółem</option>
                        <option value="perMilion">zarażenia na milion mieszkańców</option>
                        <option value="test">ilość wykonanych testów na milion mieszkańców</option>
                        <option value="percent">procent wyników pozytywnych / ilość testów</option>
                      </Form.Control>
                    </Form.Group>
                    <Card.Title style={{fontSize: 16, marginTop: 20}}>{tableTitle}</Card.Title>
                    <CountryTable countries={tableData}/>
                  </div>
                </Tab>
                <Tab eventKey="wykresy" title="Wykresy">
                  <div className="tab__content">
                    <Card.Title style={{fontSize: 16}}>Nowe przypadki na świecie</Card.Title>
                    <LineGraph />
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>      

    </Container>
   
  )
}

export default App;
