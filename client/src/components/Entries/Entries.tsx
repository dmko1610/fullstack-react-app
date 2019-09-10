import React from "react";
import {Data} from "../../containers/App";
import Entry from './Entry/Entry'

const entries = (props: any) => props.entries.map((entry: Data, index: number) => {
    // @ts-ignore
    return <Entry
        id={entry.id}
        message={entry.message}
    />
});
export default entries;
