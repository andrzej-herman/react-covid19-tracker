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

