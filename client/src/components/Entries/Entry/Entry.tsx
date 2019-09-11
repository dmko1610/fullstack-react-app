import React from 'react';
import {Data} from "../../../containers/App";
// @ts-ignore
import entryStyle from './Entry.css';

interface Props {
    data: Data
    click: any
    changed: any
    value: any
}

const entry = (props: Props) => {

    return (
        <div className={entryStyle.Entry}>
            <span onClick={props.click}>Id: </span> {props.data.id} <br/>
            <span>Message: </span> {props.data.message} <br/>
            <input type="text" onChange={props.changed} value={props.data.message}/>
        </div>
    )

};

export default entry;
