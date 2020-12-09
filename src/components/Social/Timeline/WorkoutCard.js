import React from "react";
import classnames from "classnames";

import {
  Card,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";

import TableData from "./TableData"
import Area from "./Area"

class CardWithTabs extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "TimeSeries",
      loading: true,
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


    sortTabs = async (x) =>  {

        await x.map((a,b) => {
          console.log(a.exercise_xref.exercise)
          console.log(a.exercise_xref)
          this.setState({
            ['eTabName' + b] : a.exercise_xref.exercise,
            ['eTabID' + b] : b
          })
        })

      await this.setState({
        activeTab: this.state['eTabID' + 0],
        loading:false
      })
    }

  componentDidMount() {
    this.sortTabs(this.props.workout.full_quick);
    console.log(this.props.workout.full_quick[0].exercise_xref.graph_data)
  }

  render() {
    if (this.state.loading === true) {
      return (
        null
      )
    }
    return (
      <Card>
        <CardHeader>
          <Nav tabs className="card-header-tabs">

          {this.props.workout.full_quick.map((a,b) =>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === this.state['eTabID' + b] })}
                onClick={() => {
                  this.toggle(this.state['eTabID' + b]);
                }}
                href="#"
              >
                {this.state['eTabName' + b]}
              </NavLink>
            </NavItem>
            )}

          </Nav>
        </CardHeader>

        <CardBody>

      {this.props.workout.full_quick.map((a,b) =>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId={this.state['eTabID' + b]} className="text-center">
              <Area
                full={this.props.workout.full_quick[b]}
                data={this.props.workout.full_quick[b].exercise_xref.graph_data}
              />
            </TabPane>
          </TabContent>
        )}

        </CardBody>
      </Card>
    );
  }
}

const WorkoutCard = (props) => (
  <CardWithTabs
    workout = {props.workout}
    derived__start_time_local = {props.derived__start_time_local}
    />
);

export default WorkoutCard;
