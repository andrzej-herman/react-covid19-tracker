import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+ 0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll"
                },
                ticks: {
                    callback: function (value, index, values) {
                        return translateAxis(value);
                    },
                }
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    }
}

const translateAxis = (value) => {
    if (value.toString().length <= 6) {
        const month = value.toString().substr(0, 3);
        if (month == 'Jan') return 'Sty' + value.toString().substr(3);
        if (month == 'Feb') return 'Lut' + value.toString().substr(3);
        if (month == 'Mar') return 'Mar' + value.toString().substr(3);
        if (month == 'Apr') return 'Kwi' + value.toString().substr(3);
        if (month == 'May') return 'Maj' + value.toString().substr(3);
        if (month == 'Jun') return 'Cze' + value.toString().substr(3);
        if (month == 'Jul') return 'Lip' + value.toString().substr(3);
        if (month == 'Aug') return 'Sie' + value.toString().substr(3);
        if (month == 'Aug') return 'Sie' + value.toString().substr(3);
        if (month == 'Sep') return 'Wrz' + value.toString().substr(3);
        if (month == 'Oct') return 'Paź' + value.toString().substr(3);
        if (month == 'Dec') return 'Gru' + value.toString().substr(3);
    }
    else
        return value;
}


function LineGraph({casesType = 'cases'}) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response => {
                return response.json();
            })
            .then(data => {
                const chartData = buildChartData(data);
                setData(chartData);
            });
        }

        fetchData();

    }, []);

    const buildChartData = (data, casesType = "cases") => {
        const chartData = [];
        let lastDataPoint;
        for(let date in data.cases) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint,
                };
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        };

        return chartData;
    }

    return (
        <div style={{marginTop: '20px', marginBottom: '20px', height: 250, width: 460}}>
            {data?.length > 0 && (
            <Line 
            options={options}
            data={{
                datasets : [
                    {
                    backgroundColor: "rgba(204, 16, 52, 0.5)",
                    borderColor: "#CC1034",
                    data: data
                }
            ],
            }}
            /> 
            )}
        </div>
    )
}

export default LineGraph
