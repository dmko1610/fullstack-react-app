import * as React from 'react';

class EntriesComponent extends React.Component {
    public render() {
        return (
            <ul>
                {
                    this.data.length <= 0
                        ? 'NO DB ENTRIES'
                        : this.data.map((element) => (
                            <li style={{ padding: '10px' }} key={ this.data.message }>
                                <span style={{ color: 'gray' }}> id: </span> { element.id } <br />
                                <span style={{ color: 'gray' }}></span> { element.message }
                            </li>
                        ))
                }
            </ul>
        )
    }
}
export const Entries = EntriesComponent;