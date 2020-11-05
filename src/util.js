import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';
import './App.css';

export const sortDataByTotal = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData;
}

export const sortDataByToday = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
        if (a.todayCases > b.todayCases) {
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData;
}

export const sortDataByMilion = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
        if (a.casesPerOneMillion > b.casesPerOneMillion) {
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData;
}

export const sortDataByTestMilion = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
        if (a.testsPerOneMillion > b.testsPerOneMillion) {
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData;
}

export const sortDataByPercent = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
        let aPercent = (a.cases / a.tests) * 100; 
        let bPercent = (b.cases / b.tests) * 100; 

        if (aPercent > bPercent) {
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData;
}

export const sortDataTodayMilion = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {

        let atoday = (a.todayCases * 1000000) / a.population; 
        let btoday = (b.todayCases * 1000000) / b.population; 

        if (atoday > btoday) {
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData;
}

export const sortDataTodayDeath = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {

        if (a.todayDeaths > b.todayDeaths) {
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData;
}

export const sortDataTodayDeathThousand = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {

        let atoday = (a.todayDeaths * 1000) / a.population; 
        let btoday = (b.todayDeaths * 1000) / b.population; 

        if (atoday > btoday) {
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData;
}

export const sortDataTotalDeath = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {

        if (a.deaths > b.deaths) {
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData;
}

export const sortDataTotalDeathThousand = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {

        let atoday = (a.deaths * 1000) / a.population; 
        let btoday = (b.deaths * 1000) / b.population; 

        if (atoday > btoday) {
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData;
}

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 400,
    },
    todayCases: {
        hex: "#CC1034",
        multiplier: 2400,
      },
    recovered: {
      hex: "#7dd71d",
      multiplier: 600,
    },
    todayRecovered: {
        hex: "#7dd71d",
        multiplier: 2400,
      },
    deaths: {
      hex: "#3e3936",
      multiplier: 2400,
    },
    todayDeaths: {
        hex: "#3e3936",
        multiplier: 6400,
      },
  };




export const showDataOnMap = (data, type) => (
    data.map(c => (
        <Circle
            key={c.name}
            center={[c.lat, c.lng]}
            fillOpacity={0.4}
            color={casesTypeColors[type].hex}
            fillColor={casesTypeColors[type].hex}
            radius={
                Math.sqrt(c[type]) * casesTypeColors[type].multiplier
            }
            >
            <Popup className="popup__all">
                <div className="popup__container">
                    <div className="popup__flagContainer"><img className="popup__flag" src={c.flag} alt={c.name}></img></div>
                    <div className="popup__name">{c.name}</div>        
                    <div className="popup__data">Populacja: {numeral(c.population).format("0,0")}</div>
                    <hr/>
                    <div className="popup__data">Zarażenia dzisiaj: {numeral(c.todayCases).format("0,0")}</div>
                    <div className="popup__data">Zarażenia łącznie: {numeral(c.cases).format("0,0")}</div>
                    <br/>
                    <div className="popup__data">Zgony dzisiaj: {numeral(c.todayDeaths).format("0,0")}</div>
                    <div className="popup__data">Zgony łącznie: {numeral(c.deaths).format("0,0")}</div>
                    <br/>
                    <div className="popup__data">Ozdrowieńcy dzisiaj: {numeral(c.todayRecovered).format("0,0")}</div>
                    <div className="popup__data">Ozdrowieńcy łącznie: {numeral(c.recovered).format("0,0")}</div>
                    <br/>
                    <div className="popup__updated">Zaktualizowano: {c.updated}</div>
                </div>
            </Popup>
        </Circle>
    ))
);

