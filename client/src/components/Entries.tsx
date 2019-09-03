import * as React from 'react';
import {Thunks} from "../store/app";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {AppState, Data} from "../store/app/app.types";
import {DispatchThunk, RootState} from "../store";
import {getDataFromDb} from "../store/app/app.selectors";


interface IProps {
    getData?: any;
    finishFetching?: any;
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
        console.log(this.props);
        return (
            <ul>
                {!this.props.data
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

const mapStateToProps = (state: RootState) => ({
    data: getDataFromDb(state)
});

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    getData: () => {
        dispatch(Thunks.getData());
    }
});

export const Entries = connect(mapStateToProps, mapDispatchToProps)(EntriesComponent);
