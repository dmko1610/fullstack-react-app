import * as React from 'react';
import {Thunks} from "../store/app";
import {ActionsWithPayload} from "../store/app";
import {connect} from "react-redux";


interface IProps {

}

class EntriesComponent extends React.Component {


    componentDidMount(): void {
        this.props;
    }

    public render() {
        return (
            <ul>
                {!data
                    ? 'NO DB ENTRIES'
                    : Object.values(data).map((element: any) => (
                        <li style={{padding: '10px'}} key={data._id}>
                            <span style={{color: 'gray'}}> id: </span> {element.id} <br/>
                            <span style={{color: 'gray'}}> message: </span> {element.message}
                        </li>
                    ))
                }
            </ul>
        )
    }
}

export default connect({}, {})(EntriesComponent);
