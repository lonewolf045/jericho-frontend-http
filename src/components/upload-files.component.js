import React, { Component } from "react";
import UploadService from "../services/upload-files.service";
import Input from "react-validation/build/input";

const required = value => {
  if(!value) {
      return (
          <div className = "alert alert-danger" role="alert">
              This field is required!
          </div>
      )
  }
}

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      createdBy: ""
    };

    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.onChangeCreatedBy = this.onChangeCreatedBy.bind(this);
  }

  onChangeCreatedBy(event) {
    this.setState({
      createdBy: event.target.value
    })
  }

  selectFile(event) {
      this.setState({
        selectedFiles: event.target.files,
      });
  }

  upload() {
      let currentFile = this.state.selectedFiles[0];
      
      this.setState({
        progress: 0,
        currentFile: currentFile,
      });
      
      UploadService.upload(currentFile,this.state.createdBy /*,(event) => {
        this.setState({
          progress: Math.round((100 * event.loaded) / event.total),
        });
      }*/)
      .then((response) => {
          console.log(response.data.message);
          this.setState({
            message: response.data.message,
          });
        })
        .catch(() => {
          this.setState({
            progress: 0,
            message: "Could not upload the file!",
            currentFile: undefined,
          });
        });
      
      this.setState({
        selectedFiles: undefined,
      });
  }    
    render() {
        const {
            selectedFiles,
            currentFile,
            progress,
            message,
            createdBy
          } = this.state;
      
          return (
            <div>
               {//currentFile && (
              //   <div className="progress">
              //     <div
              //       className="progress-bar progress-bar-info progress-bar-striped"
              //       role="progressbar"
              //       aria-valuenow={progress}
              //       aria-valuemin="0"
              //       aria-valuemax="100"
              //       style={{ width: progress + "%" }}
              //     >
              //       {progress}%
              //     </div>
              //   </div>
              // )
            }

              <div className="form-group">
                <label htmlFor="createdBy">Entity</label>
                  <input
                    type="text"
                    className="form-control"
                    name="createdBy"
                    value={this.state.createdBy}
                    onChange={this.onChangeCreatedBy}
                  />
              </div>
      
              <label className="btn btn-default">
                <input type="file" onChange={this.selectFile} />
              </label>
      
              <button className="btn btn-success"
                disabled={!selectedFiles}
                onClick={this.upload}
              >
                Upload
              </button>
      
              <div className="alert alert-light" role="alert">
                {message}
              </div>
            </div>
          );

  }
}