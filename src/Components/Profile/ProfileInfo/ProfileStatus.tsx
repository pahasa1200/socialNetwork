import React, {ChangeEvent} from "react";

type PropsType = {
    status: string
    updateUserStatus: (newStatus: string) => void
}

type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType>{
    state = {
        editMode: false,
        status: this.props.status
    }
    activate = () => {
        this.setState({
            editMode: true
        })
    }
    deactivate = () => {
        this.setState({
            editMode: false
        })
        this.props.updateUserStatus(this.state.status);
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
          status: e.currentTarget.value
            }

        )
    }
    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
                }
            )
        }
    }

    render () {
        return(
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activate}>{this.props.status || '---'}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivate} value={this.props.status}/>
                </div>
                }
            </div>
        )
    }
}
export default ProfileStatus;