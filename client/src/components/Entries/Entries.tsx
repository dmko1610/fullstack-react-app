import React from "react";
import {Data} from "../../containers/App";
import Entry from './Entry/Entry'

interface Props {
    entries: Data[]
    clicked: any
    changed: any
}

interface State {
}

class Entries extends React.PureComponent<Props, State> {

    render () {
        return this.props.entries.map((entry: Data, id: number) => {
            return <Entry
                click={() => this.props.clicked(id)}
                data={entry}
                changed={(event: any) => this.props.changed(event, entry._id)}
                key={entry._id}
                value={entry.message}
            />
        });
    }
}

export default Entries;
