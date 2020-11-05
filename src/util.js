import { Circle, Popup } from 'react-leaflet';

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
            center={[c.lat, c.lng]}
            fillOpacity={0.4}
            color={casesTypeColors[type].hex}
            fillColor={casesTypeColors[type].hex}
            radius={
                Math.sqrt(c[type]) * casesTypeColors[type].multiplier
            }
            >
            <Popup>
                <h1>To jest popup</h1>
            </Popup>
        </Circle>
    ))
);


