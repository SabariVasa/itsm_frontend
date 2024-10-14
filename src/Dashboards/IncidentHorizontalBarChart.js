import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';



const dataset = [
{
    "state":"1-Critical",
    "openIncidents":10,
    "count":0
}
    ,{
    "state":"5-Planning ",
    "openIncidents":10,
    "count":5
},{
    "state":"3 - Moderate",
    "openIncidents":20,
    "count":10
},{
    "state":"2 - High",
    "openIncidents":15,
    "count":15
},{
    "state":"4 - low",
    "openIncidents":20,
    "count":20
}
];

const valueFormatter = (value) => `${value}`;

const chartSetting = {
  xAxis: [
    {
      scaleType:'linear',
      dataKey:'count',
      label: 'Incidents Count',
    },
  ],
  series: [{ dataKey:'openIncidents', label: 'Open Incidents Grouped', valueFormatter }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

export default function IncidentHorizontalBarChart(props) {

  return (
    <div style={{ width:'100%'}}>
      <BarChart
        dataset={dataset}
        yAxis={[
          { scaleType:'band', dataKey: 'state',},
        ]}
        {...chartSetting}
        layout="horizontal"
        grid={{ vertical: true}}
      />
    </div>
  );
}
