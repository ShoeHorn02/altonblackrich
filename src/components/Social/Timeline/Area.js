import React from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";

import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

const AreaChart = ({ theme, ...props  }) => {
  const data = [
    {
      name: props.full.exercise_xref.exercise,
      data: props.data.map((s,t)=>(s.progression ))
    },

  ];

  const options = {
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth"
    },
    xaxis: {
      type: "datetime",
      categories: props.full.exercise_xref.graph_data.map((s,t)=>(s.date_time ))
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm"
      },
      y: [
        {
          title: {
            formatter: function(val) {
              return val + ' (' + props.full.exercise_xref.measure_value + ')';
            }
          }
        },
      ]
    },
    colors: [
      theme.primary,
      theme.success,
      theme.warning,
      theme.danger,
      theme.info
    ]
  };

  return (
    <Card>

      <CardBody>
        <div className="chart w-100">
          <Chart options={options}
          series={data}
          type="area"
          height="350" />
        </div>
      </CardBody>
    </Card>
  );
};

export default connect(store => ({
  theme: store.theme.currentTheme
}))(AreaChart);
