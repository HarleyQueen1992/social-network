import React from 'react';
import s from './ProfileInfo.module.css'

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (this.props.status !== prevProps.status) {
            this.setState({
                status: this.props.status
            })
        }
    }
    
    render() {
        return (
            <div>
                {!this.props.editMode &&
                    <div>
                        <div className={s.status} onDoubleClick={ this.activateEditMode } >status: {this.props.status}</div>
                    </div>}
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} className={s.input} autoFocus={true} onBlur={ this.deactivateEditMode } value={this.state.status}/>
                    </div>}
            </div>)

    }
}

export default ProfileStatus;
