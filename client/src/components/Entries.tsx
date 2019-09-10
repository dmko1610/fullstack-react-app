import * as React from 'react';


interface IProps {
}

interface IState {
}

class EntriesComponent extends React.Component<IProps, IState> {

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

export const Entries = EntriesComponent;
