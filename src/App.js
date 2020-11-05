import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import panstwa from './data/panstwa.json';
import InfoBox from './components/InfoBox';
import CountryTable from './components/table/CountryTable';
import { 
  sortDataByTotal, 
  sortDataByToday, 
  sortDataByMilion, 
  sortDataByTestMilion, 
  sortDataByPercent, 
  sortDataTodayMilion,
  sortDataTodayDeath,
  sortDataTodayDeathThousand,
  sortDataTotalDeath,
  sortDataTotalDeathThousand } from './util';
import LineGraph from './components/LineGraph';
import { Container, Row, Col, Form, Card, Tabs, Tab, Button } from 'react-bootstrap'
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
const [tableDataTodayMilion, setTableDataTodayMilion] = useState([]);
const [tableDataTodayDeath, setTableDataTodayDeath] = useState([]);
const [tableDataTodayDeathThousand, setTableDataTodayDeathThousand] = useState([]);
const [tableDataTotalDeath, setTableDataTotalDeath] = useState([]);
const [tableDataTotalDeathThousand, setTableDataTotalDeathThousand] = useState([]);
const [tableCategory, setTableCategory] = useState('today');
const [mapCenter, setMapCenter] = useState({lat: 51.75, lng: 19.46667});
const [mapZoom, setMapZoom] = useState(4);
const [mapDisplayData, setMapDisplayData] = useState([]);
const [currentType, setCurrentType] = useState('todayCases');


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
        var readyDataTodayMilion = [];
        var readyDataTodayDeath = [];
        var readyDataTodayDeathThousand = [];
        var readyDataTotalDeath = [];
        var readyDataTotalDeathThousand = [];
        var readyDisplayData = [];
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

        index = 1;
        data.todayMilion.forEach(element => {
          const result = countriesWithPoland.find( ({ code }) => code === element.countryInfo.iso2 );
          const cases = ((element.todayCases * 1000000) / element.population).toFixed(1);
          if (result !== undefined) {
            if (cases !== 'Infinity %') {
              readyDataTodayMilion.push( { name: result.name, totalCases: cases, position: index } );
              index++;
            }  
          } 
        });

        index = 1;
        data.todayDeath.forEach(element => {
          const result = countriesWithPoland.find( ({ code }) => code === element.countryInfo.iso2 );
          const cases = element.todayDeaths.toFixed(0);
          if (result !== undefined) {
            if (cases !== 'Infinity %') {
              readyDataTodayDeath.push( { name: result.name, totalCases: cases, position: index } );
              index++;
            }  
          } 
        });

        index = 1;
        data.todayDeathThousand.forEach(element => {
          const result = countriesWithPoland.find( ({ code }) => code === element.countryInfo.iso2 );
          const cases = ((element.todayDeaths * 1000) / element.population).toFixed(3);
          if (result !== undefined) {
            if (cases !== 'Infinity %') {
              readyDataTodayDeathThousand.push( { name: result.name, totalCases: cases, position: index } );
              index++;
            }  
          } 
        });

        index = 1;
        data.totalDeath.forEach(element => {
          const result = countriesWithPoland.find( ({ code }) => code === element.countryInfo.iso2 );
          const cases = element.deaths.toFixed(0);
          if (result !== undefined) {
            if (cases !== 'Infinity %') {
              readyDataTotalDeath.push( { name: result.name, totalCases: cases, position: index } );
              index++;
            }  
          } 
        });

        index = 1;
        data.totalDeathThousand.forEach(element => {
          const result = countriesWithPoland.find( ({ code }) => code === element.countryInfo.iso2 );
          const cases = ((element.deaths * 1000) / element.population).toFixed(5);
          if (result !== undefined) {
            if (cases !== 'Infinity %') {
              readyDataTotalDeathThousand.push( { name: result.name, totalCases: cases, position: index } );
              index++;
            }  
          } 
        });








        data.displayData.forEach(element => {
          const result = countriesWithPoland.find( ({ code }) => code === element.countryInfo.iso2 );
          const test = ((element.deaths * 1000) / element.population).toFixed(5);
          if (result !== undefined) {
            if (test !== 'Infinity %') {
              readyDisplayData.push( 
              { 
                name: result.name, 
                lat: element.countryInfo.lat,
                lng: element.countryInfo.long,
                cases: element.cases,
                todayCases: element.todayCases,
                recovered: element.recovered,
                todayRecovered: element.todayRecovered,
                deaths: element.deaths,
                todayDeaths: element.todayDeaths,
                population: element.population,
                flag: element.countryInfo.flag,
                continent: element.continent,
                updated: new Date(element.updated).toLocaleString(),
                totalActive: element.active,
                tests: element.tests,
                testsPerMillion: element.testsPerOneMillion,
                percentOfDiscover: `${((element.cases / element.tests) * 100).toFixed(1)} %`,
                activePerOneMillion: element.activePerOneMillion
              } 
              );
            }  
          } 
        });

        setTableDataByTotal(readyDataTotal);
        setTableDataByToday(readyDataToday);
        setTableDataByMilion(readyDataMilion);
        setTableDataByTestMilion(readyDataTest);
        setTableDataByPercent(readyDataPercent);
        setTableDataTodayMilion(readyDataTodayMilion);
        setTableDataTodayDeath(readyDataTodayDeath);
        setTableDataTodayDeathThousand(readyDataTodayDeathThousand);
        setTableDataTotalDeath(readyDataTotalDeath);
        setTableDataTotalDeathThousand(readyDataTotalDeathThousand);
        setMapDisplayData(readyDisplayData);
        
  };
  getCountriesData();
  getCovidData('https://disease.sh/v3/covid-19/countries/pl');
}, []);

const getCountriesFromApi = async () => {
  var data = { total: [], today: [], milion: [], test: [], percent: [], todayMilion: [], todayDeath: [], todayDeathThousand: [], totalDeath: [], totalDeathThousand: [], displayData: [] };
  var byTotal = [];
  var byToday = [];
  var byMilion = [];
  var byTest = [];
  var byPercent = [];
  var byTodayMilion = [];
  var byTodayDeath = [];
  var byTodayDeathThousand = [];
  var byTotalDeath = [];
  var byTotalDeathThousand = [];
  var dataDisplayData = [];
  await fetch('https://disease.sh/v3/covid-19/countries')
  .then((response) => response.json())
  .then((data) => {
    byTotal = sortDataByTotal(data);
    byToday = sortDataByToday(data);
    byMilion = sortDataByMilion(data);
    byTest = sortDataByTestMilion(data);
    byPercent = sortDataByPercent(data);
    byTodayMilion = sortDataTodayMilion(data);
    byTodayDeath = sortDataTodayDeath(data);
    byTodayDeathThousand = sortDataTodayDeathThousand(data);
    byTotalDeath = sortDataTotalDeath(data);
    byTotalDeathThousand = sortDataTotalDeathThousand(data);
    dataDisplayData = data;
  })

  data = {
    total: byTotal,
    today: byToday,
    milion: byMilion,
    test: byTest,
    percent: byPercent,
    todayMilion: byTodayMilion,
    todayDeath: byTodayDeath,
    todayDeathThousand: byTodayDeathThousand,
    totalDeath: byTotalDeath,
    totalDeathThousand: byTotalDeathThousand,
    displayData: dataDisplayData
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

const changeMap = (event) => {

    let current = 'todayCases';
    const text = event.target.firstChild.nodeValue;
    if (text === 'Zarażenia dzisiaj') current = 'todayCases';
    if (text === 'Zarażenia łącznie') current = 'cases';
    if (text === 'Ozdrowieńcy dzisiaj') current = 'todayRecovered';
    if (text === 'Ozdrowieńcy łącznie') current = 'recovered';
    if (text === 'Zgony dzisiaj') current = 'todayDeaths';
    if (text === 'Zgony łącznie') current = 'deaths';
    setCurrentType(current);

}

  var tableData = tableCategory === 'today' ? tableDataByToday : 
  tableCategory === 'total' ? tableDataByTotal : tableCategory === "perMilion" ? tableDataByMilion : 
  tableCategory === 'test' ? tableDataByTestMilion : 
  tableCategory === 'percent' ? tableDataByPercent : 
  tableCategory === "todayMilion" ? tableDataTodayMilion :
  tableCategory === "todayDeath" ? tableDataTodayDeath :
  tableCategory === "todayDeathThousand" ? tableDataTodayDeathThousand :
  tableCategory === "totalDeath" ? tableDataTotalDeath : tableDataTotalDeathThousand;
  
  
  var tableTitle = tableCategory === 'today' ? 'Zarażenia dzisiaj (wg państw)' : 
  tableCategory === 'total' ? 'Zarażenia łącznie (wg państw)' : tableCategory === "perMilion" ? 'Zarażenia na milion mieszkańców (wg państw)' : 
  tableCategory === 'test' ? 'Wykonane testy na milion mieszkańców (wg państw)' : 
  tableCategory === 'percent' ? "Procent wyników pozytywnych w testach (wg państwa)" : 
  tableCategory === "todayMilion" ? "Zarażenia dzisiaj na milion mieszkańców (wg państw)" : 
  tableCategory === "todayDeath" ? "Zgony dzisiaj (wg państw)" :
  tableCategory === "todayDeathThousand" ? "Zgony dzisiaj na tysiąc mieszkańców (wg państw)" :
  tableCategory === "totalDeath" ? "Zgony łącznie (wg państw)" : "Zgony łącznie na tysiąc mieszkańców (wg państw)"; 

  var variant1 = currentType === 'todayCases' ? 'primary' : 'secondary';
  var variant2 = currentType === 'cases' ? 'primary' : 'secondary';
  var variant3 = currentType === 'todayRecovered' ? 'primary' : 'secondary';
  var variant4 = currentType === 'recovered' ? 'primary' : 'secondary';
  var variant5 = currentType === 'todayDeaths' ? 'primary' : 'secondary';
  var variant6 = currentType === 'deaths' ? 'primary' : 'secondary';

  return (

    <Container fluid style={{marginTop: 30, marginBottom: 30}}>
      <Row id="master">
        <Col xs={12} lg={8} md={8} id="master__left">
          <Container fluid>
            <Row id="left__header">
              <Col xs={12} lg={7} md={7}>
                <h2 className="app__title">Statystyki<span className="app__covid"> Covid-19</span></h2>
                <p className="app__header__author">Dane pochodzą z serwisu: <a href="https://disease.sh" target="blank">Open Disease Data (disease.sh)</a></p>
                <p className="app__header__author">Realizacja: mgr inż. Andrzej Herman</p>
              </Col>
              <Col xs={12} lg={5} md={5}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Wybierz państwo</Form.Label>
                  <Form.Control as="select" onChange={onCountryChange} value={country}>
                    <option value="PL|Polska">Polska</option>
                    {
                      countries.map((c) => (
                      <option key={c.code} value={`${c.code}|${c.name}`}>{c.name}</option>))
                    }
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row id="left__boxes" style={{textAlign:"center", marginTop:20}}>
              <Col style={{marginTop: 10}} lg={4} md={4} xs={12}>
                <InfoBox  title="zarazeni" total={countryInfo.totalCases} cases={countryInfo.todayCases} updated={countryInfo.lastUpdated}/>
              </Col>
              <Col style={{marginTop: 10}} lg={4} md={4} xs={12}>
                <InfoBox title="wyzdrowialo" total={countryInfo.totalRecovered} cases={countryInfo.todayRecovered} updated={countryInfo.lastUpdated}/>
              </Col>
              <Col style={{marginTop: 10}} lg={4} md={4} xs={12}>
                <InfoBox title="zgony" total={countryInfo.totalDeaths} cases={countryInfo.todayDeaths} updated={countryInfo.lastUpdated}/>
              </Col>
            </Row>
            <Row id="left__map" style={{textAlign:"center", marginTop:20}}>
              <Col>
                <Card style={{paddingLeft: 20, paddingRight: 20, paddingBottom: 20}}>
                  <Card.Body>
                        <div className="tab__content">
                          <h6 style={{color: "#82888a"}}>Wybierz opcję mapy</h6>
                          <Row style={{marginBottom: 15, marginTop: 10}}>
                            <Col lg={2} md={2} xs={12} style={{marginTop: 10}}><Button variant={variant1} block size="sm" onClick={changeMap}>Zarażenia dzisiaj</Button></Col>
                            <Col lg={2} md={2} xs={12} style={{marginTop: 10}}><Button variant={variant2} block size="sm" onClick={changeMap}>Zarażenia łącznie</Button></Col>
                            <Col lg={2} md={2} xs={12} style={{marginTop: 10}}><Button variant={variant3} block size="sm" onClick={changeMap}>Ozdrowieńcy dzisiaj</Button></Col>
                            <Col lg={2} md={2} xs={12} style={{marginTop: 10}}><Button variant={variant4} block size="sm" onClick={changeMap}>Ozdrowieńcy łącznie</Button></Col>
                            <Col lg={2} md={2} xs={12} style={{marginTop: 10}}><Button variant={variant5} block size="sm" onClick={changeMap}>Zgony dzisiaj</Button></Col>
                            <Col lg={2} md={2} xs={12} style={{marginTop: 10}}><Button variant={variant6} block size="sm" onClick={changeMap}>Zgony łącznie</Button></Col>
                          </Row>
                          <Row>
                            <Col>
                              <p style={{color: "#82888a", fontSize: 13}}>Kliknij na znacznik na mapie aby zobaczyć szczegóły kraju</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <WorldMap data={mapDisplayData} type={currentType} center={mapCenter} zoom={mapZoom}/>
                            </Col>
                          </Row>
                        </div>    
                        <hr style={{marginTop: 50, marginBottom: 50}}/>
                        <div className="tab__content__graph">
                          <Card.Title style={{fontSize: 16, color: "#82888a"}}>Dzienny przyrost zarażeń na świecie (różnica względem poprzedniego dnia)</Card.Title>
                          <LineGraph />
                        </div>
                        <div className="tab__content__graph">
                          <Card.Title style={{fontSize: 16, color: "#82888a"}}>Dzienny przyrost ozdrowień na świecie (różnica względem poprzedniego dnia)</Card.Title>
                          <LineGraph casesType = 'recovered'/>
                        </div>
                        <div className="tab__content__graph">
                          <Card.Title style={{fontSize: 16, color: "#82888a"}}>Dzienny przyrost zgonów na świecie (różnica względem poprzedniego dnia)</Card.Title>
                          <LineGraph casesType = 'deaths'/>
                        </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col xs={12} lg={4} md={4} id="master__right">
          <Container fluid>
            <Row id="right__table" style={{marginTop: 10}}>
              <Col lg={12} xs={12} md={12}>
                <Card>
                  <Card.Body>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                      <Form.Label style={{fontSize: 12, color: "#ff0101"}}>Wybierz kategorię danych</Form.Label>
                      <Form.Control as="select" size="sm" onChange={onCategoryChange} value={tableCategory}>
                        <option value="today">zarażenia dzisiaj</option>
                        <option value="todayMilion">zarażenia dzisiaj na milion mieszkańców</option>
                        <option value="total">zarażenia łącznie</option>
                        <option value="perMilion">zarażenia łącznie na milion mieszkańców</option>
                        <option value="todayDeath">zgony dzisiaj</option>
                        <option value="todayDeathThousand">zgony dzisiaj na tysiąc mieszkańców</option>
                        <option value="totalDeath">zgony łącznie</option>
                        <option value="totalDeathThousand">zgony łącznie na tysiąc mieszkańców</option>
                        <option value="test">ilość wykonanych testów na milion mieszkańców</option>
                        <option value="percent">procent wyników pozytywnych / ilość testów</option>
                      </Form.Control>
                    </Form.Group>
                    <Card.Title style={{fontSize: 16, marginTop: 20}}>{tableTitle}</Card.Title>
                    <CountryTable countries={tableData}/>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default App;
