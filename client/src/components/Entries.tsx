import * as React from 'react';
import {Thunks} from "../store/app";
import {ActionsWithPayload} from "../store/app";
import {connect} from "react-redux";
import {AppState, Data} from "../store/app/app.types";
import {DispatchThunk} from "../store";


interface IProps {
    getData?: any;
    data: Data;
}

interface IState {
    data: Data;
}

class EntriesComponent extends React.Component<IProps, IState> {


    componentDidMount(): void {
        this.props.getData && this.props.getData();
    }

    public render() {
        return (
            <ul>
                {!this.state.data
                    ? 'NO DB ENTRIES'
                    : Object.values(this.props.data).map((element: any) => (
                        <li style={{padding: '10px'}} key={this.state.data._id}>
                            <span style={{color: 'gray'}}> id: </span> {element.id} <br/>
                            <span style={{color: 'gray'}}> message: </span> {element.message}
                        </li>
                    ))
                }
            </ul>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    data: state.data
});

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
   getData: () => {
       dispatch(Thunks.getData());
   }
});

export const Entries = connect(mapStateToProps, mapDispatchToProps)(EntriesComponent);
