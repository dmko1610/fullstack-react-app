import React from "react";
import {Data} from "../../containers/App";
import Entry from './Entry/Entry'

const entries = (props: any) => props.entries.map((entry: Data, id: number) => {
    return <Entry
        click={() => props.clicked(id)}
        data={entry}
        changed={(event: any) => props.changed(event, entry._id)}
        key={entry._id}
        value={entry.message}
    />
});
export default entries;
