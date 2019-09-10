import React from 'react';
import {Data} from "../../../containers/App";
import './Entry.css';

interface Props {
    data: Data
}

const entry = (props: Props) => {

    return (
        <div className="Entry">
            <span>Id: </span> {props.data.id} <br/>
            <span>Message: </span> {props.data.message}
        </div>
    )

};

export default entry;
