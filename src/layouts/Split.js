import React from "react";
import { connect } from "react-redux";



class OnboardLayout extends React.Component {


  render() {

    const {children} = this.props

    return (
      <section style={{background:"#f7f7f7"}}>
        {children}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  sidebar: state.sidebar
});

export default connect(mapStateToProps, {  })(OnboardLayout);
