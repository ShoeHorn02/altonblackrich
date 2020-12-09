import React from "react";





const LayoutPicture = (props) => (
  
  <div
      style={{ "backgroundImage": `url(${props.background_photo})`, 'backgroundRepeat': 'noRepeat', 'backgroundPosition': 'center center', 'backgroundSize': 'cover', width:"100%", height:"100vh", "marginRight": "-0.75rem"}  }
      className="bg-cover h-100 mr-n3"
  />
);

export default LayoutPicture;
