import * as React from 'react';
import {Thunks} from "../store/app";
import {connect} from "react-redux";
import {Data} from "../store/app/app.types";
import {DispatchThunk, RootState} from "../store";
import {getDataFromDb} from "../store/app/app.selectors";


interface IProps {
    getData?: any;
    datas: Data[];
    unfocusPage?: any;
}

interface IState {
}

class EntriesComponent extends React.Component<IProps, IState> {


    componentDidMount(): void {
        this.props.getData && this.props.getData();
    }

    componentWillUnmount(): void {
        this.props.unfocusPage && this.props.unfocusPage();
    }

    public render() {
        console.log(this.props.datas);
        const dbEntries = this.props.datas.map(entry => (
            <div style={{padding: '10px'}} key={entry.id}>
                <span style={{color: 'gray'}}> id: </span> {entry.id} <br/>
                <span style={{color: 'gray'}}> message: </span> {entry.message}
                <hr/>
            </div>
        ));
        return (
            <div>
                <h1>DB Entries</h1>
                {dbEntries}
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    datas: getDataFromDb(state),
});

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    getData: () => {
        dispatch(Thunks.getData());
    }
});

export const Entries = connect(mapStateToProps, mapDispatchToProps)(EntriesComponent);
