import React from 'react';
import {Data} from "../App";

interface Props {
    data: Data
}

const entry = (props: Props) => {

    return (
        <div>
            <span>Id: </span> {props.data.id} <br/>
            <span>Message: </span> {props.data.message}
        </div>
    )

};

export default entry;
