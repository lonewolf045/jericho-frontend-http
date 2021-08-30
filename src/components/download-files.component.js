import React, {Component} from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import FilesService from '../services/upload-files.service';

const required = value => {
    if(!value) {
        return (
            <div className = "alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

class DownloadFiles extends Component {
    constructor(props) {
        super(props)
        this.onChangeEntity = this.onChangeEntity.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
        this.state = {
            entity: "",
            loading: false,
            message: ""
        }
    }

    onChangeEntity(e) {
        this.setState({
            entity: e.target.value
        })
    }

    handleDownload(e) {
        e.preventDefault()

        this.setState({
            message: "",
            loading: true
        })

        this.form.validateAll();

        if(this.checkBtn.context._errors.length === 0) {
            FilesService.getFiles(this.state.entity).then(() => {
                this.props.history.push("/download");
                    window.location.reload();
            },
            error => {
                const resMessage = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString();

                this.setState({
                    loading: false,
                    message: resMessage
                })
            })
        } else {
            this.setState({
                loading:false
            })
        }
    }



    render() {
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <Form
                        onSubmit={this.handleDownload}
                        ref={c=> {
                            this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="entity">Entity</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="entity"
                                value={this.state.entity}
                                onChange={this.onChangeEntity}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className= "spinner-border spinner-border-sm"></span>
                                )}
                                <span>Download</span>
                            </button>
                        </div>
                        
                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}

                        <CheckButton
                            style={{display:"none"}}
                            ref={c=> {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        )
    }
}

export default DownloadFiles