import React from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";


const AreaChart = ({ theme, ...props }) => {

  return (
    <section className="flex-fill w-100">
      {props.data.map((x,y)=>
        <Card key={y}>
        <CardHeader>
          <CardTitle key={y}  className="mb-0 pb-0" tag={Link} to={'/exercises/detail/'+x.exercise_xref.id }>
            {x.exercise_xref.exercise}
          </CardTitle>
        </CardHeader>
          <CardBody style={{padding:"0px", margin:"0px"}}>
            <div className="chart w-100">
              <Chart

                toggleSeries= "progression"
                options=
                {
                  {
                    chart: {
                      zoom: {
                        enabled: true
                      }
                    },
                    dataLabels: {
                      enabled: false
                    },
                    stroke: {
                      width: [5, 7, 5],
                      curve: "smooth",
                      dashArray: [0, 8, 5]
                    },
                    markers: {
                      size: 5,
                      style: "hollow" // full, hollow, inverted
                    },
                    xaxis: {
                      type: "datetime",
                      categories: x.exercise_xref.graph_data.map((s,t)=>(s.date_time )),
                      labels: {
                        format: 'MMM-yyyy',
                        },
                      datetimeFormatter: {
                        year: 'yy',
                        month: 'MMM \'yy',
                        day: 'dd MMM',
                        hour: 'HH:mm'
                      }
                    },
                    yaxis: {
                      showAlways: true,
                    },
                    tooltip: {
                      x: {
                        format: "dd-MMM-yyyy HH:mm"
                      },
                      y: [
                        {
                          title: {
                            formatter: function(val) {
                              return val + " (lbs)";
                            }
                          }
                        },
                      ]
                    },
                    grid: {
                      borderColor: "#f1f1f1"
                    },
                    colors: [
                      theme.primary,
                      theme.success,
                      theme.warning,
                      theme.danger,
                      theme.info
                    ]
                  }
                }

                series={[
                  {
                    name: "Progression",
                    tyep: "line",
                    data: x.exercise_xref.graph_data.map((s,t)=>(s.progression ))
                  },
                ]}
              type="line" height="350" />
            </div>
          </CardBody>
        </Card>
    )}
  </section>

  );
};

export default connect(store => ({
  theme: store.theme.currentTheme
}))(AreaChart);
