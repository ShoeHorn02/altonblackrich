import React from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "reactstrap";


const LineChart = ({ theme, ...props }) => {

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      intersect: false
    },
    hover: {
      intersect: true
    },
    plugins: {
      filler: {
        propagate: false
      }
    },
    elements: {
      point:{
        radius: 0
      }
    },
    scales: {
      xAxes: [{
        reverse: true,
        type: 'time',
        distribution: 'series',
        time:{
          tooltipFormat:'YYYY-MMM-DD',
          displayFormats: {
             'millisecond':'MMM',
             'second': 'MMM',
             'minute': 'MMM',
             'hour': 'MMM',
             'day': 'MMM',
             'week': 'MMM',
             'month': 'MMM',
             'quarter': 'MMM',
             'year': 'MMM',
          },
        },
        gridLines: {
          color: "rgba(0,0,0,0.0)"
        }
      }],
      yAxes: [{
        ticks: {
          stepSize: 5
        },
        display: true,
        gridLines: {
          color: "rgba(0,0,0,0)",
          fontColor: "#fff"
        }
      }]
    }
  };


  return (
    <section className="flex-fill w-100">
      {props.data.map((x,y)=>
      <Card key={y}>
        <CardHeader>
          <CardTitle tag="h5" className="mb-0" tag={Link} to={'/exercises/detail/'+x.exercise_xref.id }>
            {x.exercise_xref.exercise}
          </CardTitle>
        </CardHeader>
        <CardBody className="py-3">
          <div className="chart chart-sm">
            <Line
              data={{
                labels: x.exercise_xref.graph_data.map(s=>(s.date)),
                datasets: [
                  {
                    label: "Progression (lbs)",
                    fill: true,
                    borderWidth: 2,
                    backgroundColor: theme.primary,
                    borderColor: theme.primary,
                    data: [x.exercise_xref.graph_data.map(s=>(s.progression)),]
                  },
                ]
              }}
              options={options}
            />
          </div>
        </CardBody>
      </Card>
      )}
    </section>
  );
};

export default connect(store => ({
  theme: store.theme.currentTheme
}))(LineChart);
