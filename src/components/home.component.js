import React, {Component} from 'react';
import IdleTimer from 'react-idle-timer';

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            timeout:1000*2*60,
            isTimedOut: false
        }

        this.idleTimer = null
        this.onAction = this._onAction.bind(this)
        this.onActive = this._onActive.bind(this)
        this.onIdle = this._onIdle.bind(this)
    }

    _onAction(e) {
        console.log('user did something', e)
        this.setState({isTimedOut: false})
      }
     
      _onActive(e) {
        console.log('user is active', e)
        this.setState({isTimedOut: false})
      }

      _onIdle(e) {
        console.log('user is idle', e)
        this.setState({isTimedOut:true})
        this.idleTimer.reset()
        this.props.logOut()
      }
    render() {
        return(
            <div className="container">
                {this.props.currUser && <IdleTimer 
                    ref = {ref => {this.idleTimer = ref}}
                    element = {document}
                    onActive={this.onActive}
                    onIdle = {this.onIdle}
                    onAction = {this.onAction}
                    debounce={250}
                    timeout={this.state.timeout}
                />}
                <header className="jumbotron">
                    <h3>Welcome!!!</h3>
                </header>
            </div>
        )
    }
}