import React, {Component} from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: AuthService.getCurrentUser()
        }
    }

    componentDidMount() {
        console.log(this.state.currentUser)
        this.setState({
            currentUser: AuthService.getCurrentUser()
        })
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>{this.state.currentUser.username}</strong> Profile
                    </h3>
                </header>
                <p>
                    <strong>Token:</strong>{" "}
                    {this.state.currentUser.token.substring(0,20)} ...{" "}
                    {this.state.currentUser.token.substr(this.state.currentUser.token.length - 20)}
                </p>
                <p>
                    <strong>Id:</strong>{" "}
                    {this.state.currentUser.id}
                </p>
            </div>
        )
    }
}