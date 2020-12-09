import React from "react";
import { connect } from 'react-redux';



class Default extends React.Component {

  renderDefaultAvatar = () => {
    if (this.props.avatar_image === null || !this.props.avatar_image || this.props.avatar_image==="None" || this.props.avatar_image==="") {
      return(


        <span
        style={{
          "background":this.props.avatar_color,
          "width": this.props.avatar_size,
          "height": this.props.avatar_size,
          "display": "flex",
          "alignItems": "center",
          "justifyContent": "center",
          "border":"none",
          "borderRadius": "50%",
          "fontFamily": "sans-serif",
          "color": "#fff",
          "fontSize": this.props.letter_size,
          "marginLeft": "auto",
          "marginRight": "auto",
        }}
        >
        {this.props.avatar_letter}
        </span>





      )
    }

    return(


      <img
        src={this.props.avatar_image}
        alt={this.props.avatar_letter}
        className="img-fluid rounded-circle"
        width={this.props.avatar_size}
        height={this.props.avatar_size}
      />
    )

  }

  render() {
    return (
      <div>
            {this.renderDefaultAvatar()}
      </div>
  );
 }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {  })(Default);
