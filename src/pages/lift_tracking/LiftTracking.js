import React from "react";
import axios from "axios";
import Select from "react-select";
import { keyConfig } from '../../redux/actions/auth';
import store from "../../redux/store/index";
import { loginFlag } from '../../redux/actions/auth';
import { API_LIFT_TRACKER_INPUT } from '../../redux/actions/API'
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  UncontrolledTooltip,
  Row,
  InputGroupText,
  CustomInput,
  FormGroup,
} from "reactstrap";
import Header from "../../components/Header";
import HeaderTitle from "../../components/HeaderTitle";
import { exerciseTracker, exerciseTrackerOneRepMax } from '../../redux/actions/lift_tracking';
import Loader from "../../components/Loader"
import Loading from "./Loading"
import WorkoutNotFound from "./WorkoutNotFound"
import WorkoutCompleted from "./WorkoutCompleted"
import { connect } from 'react-redux';

const options = [
  { value: "express_form", label: "Express Form" },
  { value: "free_form", label: "Free Form" },
  { value: "free_form_all", label: "Form Form All" }
];

const buttonWidth = {
  width: "50px",
};

class LiftTracking extends React.Component {

  fetchData = async () =>  {
    await axios.get(`${API_LIFT_TRACKER_INPUT}`, keyConfig(store.getState)).then(res => {
      this.setState({
        lift_tracking_input: res.data,
      });

      try {
        res.data[0].full_quick.map((a,b) => {
          if (a.derived__set_count > 3){
            console.log('ccccc')
            this.setState({
              vertical_form: true
            })
          }
          a.full_set.map((x,y) => {
            console.log(x.derived__constant_weight_value)
            this.setState({
              ['rep'+a.order+x.order] : x.rep_count,
              ['rep_name'+a.order+x.order] : x.rep_count + ' Reps',
            })
            if (res.data[0].routine_xref.training_max_routine || res.data[0].routine_xref.training_max_exercise) {
              this.setState({
                ['weight'+a.order+x.order] : x.derived__suggested_weight,
                ['weight_name'+a.order+x.order] : x.derived__suggested_weight + ' lbs'
              })
              console.log(x.derived__suggested_weight + ' lbs')
            }
          })
          this.setState({
            ['const_weight'+a.order] : a.derived__constant_weight_value,
            ['const_weight_name'+a.order] : a.derived__constant_weight_value + ' lbs'
          })
        })

      } catch (e) {
        console.log('No Workout')
      }

      });

    await this.setState({lift_tracking_input_loading: false})


  }

  componentDidMount() {
    this.fetchData();
    store.dispatch(loginFlag());
  }

  onChange = (e) => {
    console.log(e.target.name + '----')
    console.log(e.target.value + '----')
    this.setState({ [e.target.name]: e.target.value });
  }


  onChangeExpressDrop = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name.replace("_name", "")]: e.target.value.split(" ")[0]
    });
  }



  onSubmit = (e) => {
    e.preventDefault();
    var i;
    var k;
    for (i = 1; i < this.state.lift_tracking_input[0].full_quick.length+1; i++) {
      for (k = 1; k < this.state.lift_tracking_input[0].full_quick[i-1].full_set.length+1; k++) {
        console.log(i +'--' +k)
        this.props.exerciseTracker(
          this.state['rep'+i+k],
          this.state['weight'+i],
          this.weight_level.props.value,
          this.session_day.props.value,
          this.recorded_start_time.props.value,
          this.user_id_xref.props.value,
          this.user_enrollment_history_xref.props.value,
          this.workout_day_xref.props.value,
          this.duration_xref.props.value,
          this['exercise'+i+k].props.value,
          this['set'+i+k].props.value,
        );
      }
    }
    this.props.history.push('/');
  };

  onSubmitFreeFormAll = (e) => {
    e.preventDefault();
    var i;
    var k;
    for (i = 1; i < this.state.lift_tracking_input[0].full_quick.length+1; i++) {
      for (k = 1; k < this.state.lift_tracking_input[0].full_quick[i-1].full_set.length+1; k++) {
        this.props.exerciseTracker(
          this.state['rep'+i+k],
          this.state['weight'+i+k],
          this.weight_level.props.value,
          this.session_day.props.value,
          this.recorded_start_time.props.value,
          this.user_id_xref.props.value,
          this.user_enrollment_history_xref.props.value,
          this.workout_day_xref.props.value,
          this.duration_xref.props.value,
          this['exercise'+i+k].props.value,
          this['set'+i+k].props.value,
        );
      }
    }
    this.props.history.push('/');
  };

  onSubmitExpressFormConst = (e) => {
    e.preventDefault();
    var i;
    var k;
    for (i = 1; i < this.state.lift_tracking_input[0].full_quick.length+1; i++) {
      for (k = 1; k < this.state.lift_tracking_input[0].full_quick[i-1].full_set.length+1; k++) {
        console.log(i +'--' +k)
        this.props.exerciseTracker(
          this.state['rep'+i+k],
          this.state['const_weight'+i],
          this.weight_level.props.value,
          this.session_day.props.value,
          this.recorded_start_time.props.value,
          this.user_id_xref.props.value,
          this.user_enrollment_history_xref.props.value,
          this.workout_day_xref.props.value,
          this.duration_xref.props.value,
          this['exercise'+i+k].props.value,
          this['set'+i+k].props.value,
        );
      }
    }
    this.props.history.push('/');
  };

  onSubmitExpressFormAll = (e) => {
    e.preventDefault();
    var i;
    var k;
    for (i = 1; i < this.state.lift_tracking_input[0].full_quick.length+1; i++) {
      for (k = 1; k < this.state.lift_tracking_input[0].full_quick[i-1].full_set.length+1; k++) {

          console.log('aaa')
          console.log(this.state['weight'+i+k])
          console.log('bbb')


      }
    }

  };

  onSubmitOneRepMax = (e) => {
    e.preventDefault();
    var i;
    for (i = 1; i < this.state.lift_tracking_input[0].full_quick.length+1; i++) {
      console.log(this['exercise'+i].props.value)
      this.props.exerciseTrackerOneRepMax(
        this.state['weight'+i],
        this.props.user_status.pk,
        this.state.lift_tracking_input[0].routine_xref.enroll_history[0].id,
        this['exercise'+i].props.value
      )
    }
    this.props.history.push('/timeline');
  }

  constructor(props) {
    super(props);
    this.state = {
      lift_tracking_input: [],
      lift_tracking_input_loading: true,
      vertical_form: false,
      form_type: "express_form"
    };
  }

  handleFormChange = (selected: any,) => {
    this.setState({
      form_type: selected.value
    })
  };

  renderHeader = () => {
    return(

      <Header>
      <div className = "float-right mt-n1" style={{width:"20%"}}>

        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={options}
          defaultValue={{ label: "Express Form", value: "express_form" }}
          onChange = {this.handleFormChange}
        />
        </div>
        <HeaderTitle>Lift Tracking

        </HeaderTitle>

        <Breadcrumb>
                  <BreadcrumbItem>  <Link to={'/workouts/detail/' + this.state.lift_tracking_input[0].routine_xref.id}>{this.state.lift_tracking_input[0].routine_xref.routine} </Link></BreadcrumbItem>
          <BreadcrumbItem active className="text-mute"><strong>{this.state.lift_tracking_input[0].derived__day_title}</strong> </BreadcrumbItem>
        </Breadcrumb>
      </Header>


    )
  }


  renderFreeFormSets = (x,s,t) => {
    console.log('a n ie ns')
    return(
      <div>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend" color="primary">
            <React.Fragment>
              <Button color="secondary" id={"UncontrolledTooltip" +x.order+s.order} disabled>{s.order}</Button>
              <UncontrolledTooltip target={"UncontrolledTooltip" + +x.order+s.order} placement="top" >
                Set {s.order}
              </UncontrolledTooltip>
            </React.Fragment>
          </InputGroupAddon>
          <Input
            type="number"
            min="0"
            className="form-control"
            placeholder={s.derived__rep_count_message}
            name={'rep'+x.order+s.order}
            onChange={this.onChange}/>
        </InputGroup>
        <Input type="hidden" value={x.exercise_xref.id} ref={(input) => { this["exercise" + x.order + s.order] = input }}/>
        <Input type="hidden" value={s.order} ref={(input) => { this['set'+x.order+s.order] = input }}/>
      </div>
    )
  }

  renderFreeFormWeights = (x,s) => {
    console.log('ww w wk')
    return(
      <div>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend" color="primary">
            <React.Fragment>
              <Button style={buttonWidth} onClick={this.popOver} color="warning" id={"UncontrolledTooltip" +x.order+"weight"} >W </Button>
              <UncontrolledTooltip target={"UncontrolledTooltip" + +x.order+"weight"} placement="top" >
                {x.derived__weight_message}
              </UncontrolledTooltip>
            </React.Fragment>
          </InputGroupAddon>
          <Input
            type="number"
            required
            min="0"
            className="form-control"
            placeholder={x.derived__weight_message}
            name={'weight'+x.order}
            onChange={this.onChange}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].derived__one_rep_max_flag === "false"? this.state.lift_tracking_input[0].full_quick[0].full_set[0].weight_level : 'temp'}ref={(input) => { this.weight_level = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].derived__current_session_day} ref={(input) => { this.session_day = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].derived__time_now} ref={(input) => { this.recorded_start_time = input }}/>
          <Input type="hidden" value={this.props.user_id} ref={(input) => { this.user_id_xref = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].routine_xref.enroll_history[0].id} ref={(input) => { this.user_enrollment_history_xref = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].id} ref={(input) => { this.workout_day_xref = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].derived__current_workout_week} ref={(input) => { this.duration_xref = input }}/>
        </InputGroup>
      </div>
    )
  }


  renderCardTitleExerciseName = (x) => {
    return(
      <CardTitle tag="h5" className="mb-0" tag={Link} to={"/exercises/detail/" + x.exercise_xref.id}>
        <strong>{x.exercise_xref.exercise}</strong>
      </CardTitle>
    )
  }

  renderFreeFormHorizontal = () => {
    return(
      <Form onSubmit={this.onSubmit}>
      {this.state.lift_tracking_input[0].full_quick.map((x,y)=>
        <Card key={y}>
          <CardHeader>
            {this.renderCardTitleExerciseName(x)}
          </CardHeader>
          <CardBody>
            <Row>

              {x.full_set.map((s,t)=>
                <Col lg="3" key={t}>
                  {this.renderFreeFormSets(x,s,t)}
                </Col>
              )}
                <Col lg="3">
                  {this.renderFreeFormWeights(x)}
                </Col>

            </Row>
          </CardBody>
        </Card>
      )}
      <Button color="primary" className="mr-1 btn-block"  type="submit"> Save and Complete </Button>
      </Form>
    )
  }

  renderFreeFormVertical = () => {
    return(
      <Form onSubmit={this.onSubmit} className="customLiftTrackingVertical">
      {this.state.lift_tracking_input[0].full_quick.map((x,y)=>
        <Card key={y}>
          <CardHeader>
            {this.renderCardTitleExerciseName(x)}
          </CardHeader>
          <CardBody>
            <Row>

              {x.full_set.map((s,t)=>
                <Col lg="12" key={t}>
                  {this.renderFreeFormSets(x,s,t)}
                </Col>
              )}
              <Col lg="12">
                  {this.renderFreeFormWeights(x)}
              </Col>

            </Row>
          </CardBody>
        </Card>
      )}
      <Button color="primary" className="mr-1 btn-block"  type="submit"> Save and Complete </Button>
      </Form>
    )
  }

  renderFreeFormWeightsAll = (x,s,t,w) => {
    return(
      <div>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend" color="primary">
            <React.Fragment>
              <Button color="warning" id={"UncontrolledTooltip" +x.order+s.order+"weight"} disabled>W {w === 'y'? s.derived__suggested_weight : null}</Button>
              <UncontrolledTooltip target={"UncontrolledTooltip" + +x.order+s.order+"weight"} placement="top" >
                Enter Weight (Constant accross all sets)
              </UncontrolledTooltip>
            </React.Fragment>
          </InputGroupAddon>
          <Input
            type="number"
            min="0"
            className="form-control"
            placeholder={s.derived__weight_message}
            name={'weight'+x.order+s.order}
            onChange={this.onChange}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].derived__one_rep_max_flag === "false"? this.state.lift_tracking_input[0].full_quick[0].full_set[0].weight_level : 'temp aa'}ref={(input) => { this.weight_level = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].derived__current_session_day} ref={(input) => { this.session_day = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].derived__time_now} ref={(input) => { this.recorded_start_time = input }}/>
          <Input type="hidden" value={this.props.user_id} ref={(input) => { this.user_id_xref = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].routine_xref.enroll_history[0].id} ref={(input) => { this.user_enrollment_history_xref = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].id} ref={(input) => { this.workout_day_xref = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].derived__current_workout_week} ref={(input) => { this.duration_xref = input }}/>
        </InputGroup>
      </div>
    )
  }

  renderFreeFormAll = () => {
    console.log('hey supp s')
    return(
      <Form onSubmit={this.onSubmitFreeFormAll}>
      {this.state.lift_tracking_input[0].full_quick.map((x,y)=>
        <Card key={y}>
          <CardHeader>
            {this.renderCardTitleExerciseName(x)}
          </CardHeader>
          <CardBody>
            {x.full_set.map((s,t)=>
              <Row>
                <Col lg="6" key={t}>
                  {this.renderFreeFormSets(x,s,t)}
                </Col>

                <Col lg="6">
                  {this.renderFreeFormWeightsAll(x,s,t)}
                </Col>
              </Row>
            )}
          </CardBody>
        </Card>
      )}
      <Button color="primary" className="mr-1 btn-block"  type="submit"> Save and Complete </Button>
      </Form>
    )
  }



  renderExpressFormDropSets = (x,s) => {
    return(
      <CustomInput type="select" id={'rep_name'+x.order+s.order} name="customSelect" name={'rep_name'+x.order+s.order} onChange={this.onChangeExpressDrop} value={this.state['rep_name'+x.order+s.order]}>

        {s.rep_count_max === null?
          Array.from(Array(s.rep_count+1), (e, i) => {return <option key={i}>{s.rep_count-i} Reps</option>})
          :
          s.rep_count_max === 999?
          Array.from(Array(25+1), (e, i) => {return <option key={i}>{25-i} Reps</option>})
          :
          s.rep_count_max > 0 && s.rep_count_max < 999?
          Array.from(Array(s.rep_count_max+1), (e, i) => {return <option key={i}>{s.rep_count_max-i} Reps</option>})
          :
          null
        }
      </CustomInput>
    )
  }

  renderExpressFormDropWeights = (x,s) => {
    return(
      <CustomInput type="select" id={'weight'+x.order+s.order} name="customSelect" name={'weight'+x.order+s.order} onChange={this.onChange} value={this.state['weight_name'+x.order+s.order]}>

        {s.derived__suggested_weight > 0 ?
          Array.from(Array(21), (e, i) => {return <option key={i}>{s.derived__suggested_weight - 5 + (i/2) + " lbs"}</option>})
          :
          null
        }
      </CustomInput>
    )
  }



  popOver = (e) => {
    e.preventDefault();
  }



  renderExpressFormSets = (x,s,t) => {
    console.log('riyaad')
    return(
      <div>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend" color="primary">
            <React.Fragment>
              <Button style={buttonWidth} color="secondary" id={"UncontrolledTooltip" +x.order+s.order} onClick={this.popOver} >{s.order} {s.rep_count_max === 999? '*' : '  ' + ' '}</Button>
              <UncontrolledTooltip target={"UncontrolledTooltip" + +x.order+s.order} placement="top" >
              {s.rep_count_max === 999?
                'Set' + s.order + ' (Do as many reps as you can)'
                :
                'Set' + s.order
              }
              </UncontrolledTooltip>
            </React.Fragment>
          </InputGroupAddon>
          {this.renderExpressFormDropSets(x,s)}
        </InputGroup>
        <Input type="hidden" value={x.exercise_xref.id} ref={(input) => { this["exercise" + x.order + s.order] = input }}/>
        <Input type="hidden" value={s.order} ref={(input) => { this['set'+x.order+s.order] = input }}/>
      </div>
    )
  }

  renderExpressFormWeightsConst = (x) => {
    console.log('aa b cd')
    return(
      <div>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend" color="primary">
            <React.Fragment>
              <Button style={buttonWidth} onClick={this.popOver} color="warning" id={"UncontrolledTooltip" +x.order+"weight"} >W </Button>
              <UncontrolledTooltip target={"UncontrolledTooltip" + +x.order+"weight"} placement="top" >
                {x.derived__weight_message}
              </UncontrolledTooltip>
            </React.Fragment>
          </InputGroupAddon>

          {this.renderExpressFormDropWeightsConst(x)}


          <Input type="hidden" value={this.state.lift_tracking_input[0].derived__one_rep_max_flag === "false"? this.state.lift_tracking_input[0].full_quick[0].full_set[0].weight_level : 'temp'}ref={(input) => { this.weight_level = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].derived__current_session_day} ref={(input) => { this.session_day = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].derived__time_now} ref={(input) => { this.recorded_start_time = input }}/>
          <Input type="hidden" value={this.props.user_id} ref={(input) => { this.user_id_xref = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].routine_xref.enroll_history[0].id} ref={(input) => { this.user_enrollment_history_xref = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].id} ref={(input) => { this.workout_day_xref = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].derived__current_workout_week} ref={(input) => { this.duration_xref = input }}/>
        </InputGroup>
      </div>
    )
  }


  renderExpressFormDropWeightsConst = (x,s) => {
    console.log('DROP aa')
    console.log(this.state['const_weight_name'+x.order])
    console.log(x.derived__weight_options[0])
    return(
      <CustomInput type="select" id={'const_weight_name'+x.order} name="customSelect" name={'const_weight_name'+x.order} onChange={this.onChangeExpressDrop} value={this.state['const_weight_name'+x.order]}>

      {x.derived__weight_options.map((a,b) =>
        <option> {a.key} lbs</option>
      )}
      </CustomInput>
    )
  }


  renderExpressFormHorizontal = () => {
    console.log('a l bke')
    return(
      <Form onSubmit={this.onSubmitExpressFormConst}>
      {this.state.lift_tracking_input[0].full_quick.map((x,y)=>
        <Card key={y}>
          <CardHeader>
            {this.renderCardTitleExerciseName(x)}
          </CardHeader>
          <CardBody>
            <Row>
              {x.full_set.map((s,t)=>
                <Col lg="3" key={t}>
                  {this.renderExpressFormSets(x,s,t)}
                </Col>
              )}
              <Col lg="3">
                  {this.renderExpressFormWeightsConst(x)}
              </Col>
            </Row>
          </CardBody>
        </Card>
      )}
      <Button color="primary" className="mr-1 btn-block"  type="submit"> Save and Complete </Button>
      </Form>
    )
  }

  renderExpressFormVertical = () => {
    console.log('suppp')
    console.log(this.state.lift_tracking_input[0].routine_xref.training_max_routine)
    console.log(this.state.vertical_form)
    return(
      <Form onSubmit={this.onSubmit} className="customLiftTrackingVertical">
      {this.state.lift_tracking_input[0].full_quick.map((x,y)=>
        <Card key={y}>
          <CardHeader>
            {this.renderCardTitleExerciseName(x)}
          </CardHeader>
          <CardBody>
            <Row>
              {x.full_set.map((s,t)=>
                <Col lg="12">
                {this.renderExpressFormSets(x,s,t)}
                </Col>
              )}
              <Col lg="12">
                {this.renderFreeFormWeights(x)}
              </Col>
            </Row>
          </CardBody>
        </Card>
      )}
      <Button color="primary" className="mr-1 btn-block"  type="submit"> Save and Complete </Button>
      </Form>
    )
  }

  renderExpressFormWeightsAll = (x,s,t,w) => {
    return(
      <div>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend" color="primary">
            <React.Fragment>
              <Button color="warning" id={"UncontrolledTooltip" +x.order+s.order+"weight"} disabled>W</Button>
              <UncontrolledTooltip target={"UncontrolledTooltip" + +x.order+s.order+"weight"} placement="top" >
                Enter Weight (Constant accross all sets)
              </UncontrolledTooltip>
            </React.Fragment>
          </InputGroupAddon>
          {this.renderExpressFormDropWeights(x,s,t)}


          <Input type="hidden" value={this.state.lift_tracking_input[0].derived__one_rep_max_flag === "false"? this.state.lift_tracking_input[0].full_quick[0].full_set[0].weight_level : 'temp aa'}ref={(input) => { this.weight_level = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].derived__current_session_day} ref={(input) => { this.session_day = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].derived__time_now} ref={(input) => { this.recorded_start_time = input }}/>
          <Input type="hidden" value={this.props.user_id} ref={(input) => { this.user_id_xref = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].routine_xref.enroll_history[0].id} ref={(input) => { this.user_enrollment_history_xref = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].id} ref={(input) => { this.workout_day_xref = input }}/>
          <Input type="hidden" value={this.state.lift_tracking_input[0].derived__current_workout_week} ref={(input) => { this.duration_xref = input }}/>
        </InputGroup>
      </div>
    )
  }



  renderSetOneRepMax = () => {
    console.log('heyeh')
    console.log(this.state.lift_tracking_input[0].derived__one_rep_max_flag)
    return(
      <Form onSubmit={this.onSubmitOneRepMax}>
      {this.state.lift_tracking_input[0].full_quick.map((x,y)=>
        <Card key={y}>
          <CardHeader>
            {this.renderCardTitleExerciseName(x)}
          </CardHeader>
          <CardBody>
            {x.full_set.map((s,t)=>
              <Row>
                <Col lg="6" key={t}>

                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend" color="primary">
                      <React.Fragment>
                        <Button color="secondary" id={"UncontrolledTooltip" +x.order+s.order} disabled>1</Button>
                        <UncontrolledTooltip target={"UncontrolledTooltip" + +x.order+s.order} placement="top" >
                          Set {s.order}
                        </UncontrolledTooltip>
                      </React.Fragment>
                    </InputGroupAddon>

                    <CustomInput type="select">
                      <option>1</option>
                    </CustomInput>


                  </InputGroup>
                  <Input type="hidden" value={x.exercise_xref.id} ref={(input) => { this['exercise' +s.order] = input }}/>

                </Col>

                <Col lg="6">

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend" color="primary">
                        <React.Fragment>
                          <Button color="warning" id={"UncontrolledTooltip" +x.order+s.order+"weight"} disabled>W </Button>
                          <UncontrolledTooltip target={"UncontrolledTooltip" + +x.order+s.order+"weight"} placement="top" >
                            Enter Weight (Constant accross all sets)
                          </UncontrolledTooltip>
                        </React.Fragment>
                      </InputGroupAddon>
                      <Input
                        type="number"
                        min="0"
                        className="form-control"
                        placeholder={x.derived__weight_message}
                        name={'weight'+s.order}
                        onChange={this.onChange}/>
                      <Input type="hidden" value={this.state.lift_tracking_input[0].derived__one_rep_max_flag === "false"? this.state.lift_tracking_input[0].full_quick[0].full_set[0].weight_level : 'temp'}ref={(input) => { this.weight_level = input }}/>
                      <Input type="hidden" value={this.state.lift_tracking_input[0].derived__current_session_day} ref={(input) => { this.session_day = input }}/>
                      <Input type="hidden" value={this.state.lift_tracking_input[0].derived__time_now} ref={(input) => { this.recorded_start_time = input }}/>
                      <Input type="hidden" value={this.props.user_id} ref={(input) => { this.user_id_xref = input }}/>
                      <Input type="hidden" value={this.state.lift_tracking_input[0].routine_xref.enroll_history[0].id} ref={(input) => { this.user_enrollment_history_xref = input }}/>
                      <Input type="hidden" value={this.state.lift_tracking_input[0].id} ref={(input) => { this.workout_day_xref = input }}/>
                      <Input type="hidden" value={this.state.lift_tracking_input[0].derived__current_workout_week} ref={(input) => { this.duration_xref = input }}/>
                    </InputGroup>

                </Col>
              </Row>
            )}
          </CardBody>
        </Card>
      )}
      <Button color="primary" className="mr-1 btn-block"  type="submit"> Save and Complete </Button>
      </Form>
    )
  }


  renderCardTitleExerciseNameOneRepMax = (x) => {
    return(
      <CardTitle tag="h5" className="mb-0">
        {x.exercise_xref.exercise} <span className="text-muted"> (one rep max: {x.derived__one_rep_max_value}) </span>
      </CardTitle>
    )
  }

  renderExpressFormTrainingMaxExercise = () => {
    console.log('hey supp s')
    return(
      <Form onSubmit={this.onSubmitFreeFormAll}>
      {this.state.lift_tracking_input[0].full_quick.map((x,y)=>
        <Card key={y}>
          <CardHeader>
            {this.renderCardTitleExerciseNameOneRepMax(x)}
          </CardHeader>
          <CardBody>
            {x.full_set.map((s,t)=>
              <Row>
                <Col lg="6" key={t}>
                  {this.renderExpressFormSets(x,s,t)}
                </Col>

                <Col lg="6">
                  {this.renderExpressFormWeightsAll(x,s,t,'y')}
                </Col>
              </Row>
            )}
          </CardBody>
        </Card>
      )}
      <Button color="primary" className="mr-1 btn-block"  type="submit"> Save and Complete </Button>
      </Form>
    )
  }

  renderFreeFormTrainingMaxExercise = () => {
    console.log('hey supp s')
    return(
      <Form onSubmit={this.onSubmitFreeFormAll}>
      {this.state.lift_tracking_input[0].full_quick.map((x,y)=>
        <Card key={y}>
          <CardHeader>
            {this.renderCardTitleExerciseNameOneRepMax(x)}
          </CardHeader>
          <CardBody>
            {x.full_set.map((s,t)=>
              <Row>
                <Col lg="6" key={t}>
                  {this.renderExpressFormSets(x,s,t)}
                </Col>

                <Col lg="6">
                  {this.renderFreeFormWeightsAll(x,s,t,'y')}
                </Col>
              </Row>
            )}
          </CardBody>
        </Card>
      )}
      <Button color="primary" className="mr-1 btn-block"  type="submit"> Save and Complete </Button>
      </Form>
    )
  }

  renderExpressFormTrainingMaxRoutine = () => {
    console.log('hey supp s')
    return(
      <Form onSubmit={this.onSubmitFreeFormAll}>
      {this.state.lift_tracking_input[0].full_quick.map((x,y)=>
        <Card key={y}>
          <CardHeader>
            {this.renderCardTitleExerciseNameOneRepMax(x)}
          </CardHeader>
          <CardBody>
            {x.full_set.map((s,t)=>
              <Row>
                <Col lg="6" key={t}>
                  {this.renderExpressFormSets(x,s,t)}
                </Col>

                <Col lg="6">
                  {this.renderFreeFormWeightsAll(x,s,t,'y')}
                </Col>
              </Row>
            )}
          </CardBody>
        </Card>
      )}
      <Button color="primary" className="mr-1 btn-block"  type="submit"> Save and Complete </Button>
      </Form>
    )
  }

  render() {
    if (this.props.user_status === null || this.state.lift_tracking_input_loading) {
      return <Loading />
    }
    else if (this.state.lift_tracking_input.length === 0) {
      return <WorkoutNotFound />
    }
    else if (this.state.lift_tracking_input != null  && this.state.lift_tracking_input[0].routine_xref.enroll_history[0].completed_workout) {
      return <WorkoutCompleted workout = {this.state.lift_tracking_input[0].routine_xref.routine}/>
    }
    return (
      <Container fluid>
          <section>
            {this.renderHeader()}

            {
              this.state.lift_tracking_input[0].derived__one_rep_max_flag === "true"?
              this.renderSetOneRepMax()
              :
              this.state.lift_tracking_input[0].routine_xref.training_max_exercise === true && this.state.form_type === "express_form"?
              this.renderExpressFormTrainingMaxExercise()
              :
              this.state.lift_tracking_input[0].routine_xref.training_max_exercise === true && (this.state.form_type === "free_form" || this.state.form_type === "free_form_all")?
              this.renderFreeFormTrainingMaxExercise()
              :
              this.state.lift_tracking_input[0].routine_xref.training_max_routine === true?
              this.renderExpressFormTrainingMaxRoutine()
              :
              this.state.form_type === "express_form" && this.state.vertical_form==false?
              this.renderExpressFormHorizontal()
              :
              this.state.form_type === "express_form" && this.state.vertical_form==true?
              this.renderExpressFormVertical()
              :
              this.state.form_type === "free_form" && this.state.vertical_form==false?
              this.renderFreeFormHorizontal()
              :
              this.state.form_type === "free_form" && this.state.vertical_form==true?
              this.renderFreeFormVertical()
              :
              this.state.form_type === "free_form_all" ?
              this.renderFreeFormAll()
              :
              null
            }
          </section>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user_id: state.auth.user.pk,
  user_status: state.auth.user,
  general: state.general.isLoading,
  theme: state.theme.currentTheme,
});
export default connect(mapStateToProps, { exerciseTracker, exerciseTrackerOneRepMax })(LiftTracking);
