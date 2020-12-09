import React from "react";
import Dropzone from 'react-dropzone'
import store from "../../../redux/store/index";
import {
  Card,
  Button,
  CardBody,
  CardHeader,
  CardTitle,
  Spinner,
  Progress,
} from "reactstrap";




import { postPhotoToAlbum } from '../../../redux/actions/album';

async function UpdatePhotoToAlbum(userid, albumid, photo, handlerLoaderFlag, handlerUploadCount, count) {
  await handlerLoaderFlag(1)
  const a = 0
  photo.map(
    async (x,y) => {
      const result = await store.dispatch(postPhotoToAlbum(userid, albumid, x))
      if (await result.status === 201 && count < photo.length) {
        await handlerUploadCount(count+1, photo.length)
        }
    },);

 }





const Standard = (props) => {
  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' }
  }

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta)
  }

  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }


  const handleDrop = (dropped) => {
    UpdatePhotoToAlbum(
      props.userid,
      props.albumid,
      dropped,
      props.handlerLoaderFlag,
      props.handlerUploadCount,
      props.upload_count
    )
  }

  return (
    <Dropzone
    onDrop={handleDrop}
    getUploadParams={getUploadParams}
    onChangeStatus={handleChangeStatus}
    onSubmit={handleSubmit}
    accept="image/*"
    inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
    styles={{
      dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
      inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
    }}
    >
      {({getRootProps, getInputProps}) => (

        <div {...getRootProps()}>
          <input {...getInputProps()} />





              <Card style={{border:'2px dashed black', cursor: 'pointer', display: 'flex', 'justifyContent': 'center', 'alignItems': 'center'}} className="pt-6 pb-6">
                <CardHeader style={{'position': 'absolute'}} className="p-0 m-0">
                  <CardTitle tag="h5" className="mb-0">
                  <div className="text-center mt-5 mb-5 float-center" style={{width:'400px'}}>

                    {props.flag_loader === 0?

                      <div className="h4 font-weight-normal ">
                        <p>Drop Photos Here</p>

                        <div className="customSeperator"><i>or</i></div>

                        <Button color="primary" size="lg" className="btn-pill" outline> Select Photos </Button>

                      </div>


                    :
                    <div  >
                    <div>
                      <Spinner key="1" color="primary"  />
                      </div>
                      <div>
                      <Progress value={(props.upload_count / props.upload_total)*100} className="mb-3 mt-3 border-yellow" >
                        uploading {props.upload_count} of {props.upload_total}
                      </Progress>
                      </div>
                      </div>


                  }

                  </div>
                  </CardTitle>
                </CardHeader>
              </Card>




        </div>

      )}
    </Dropzone>
  )
}



export default Standard;
