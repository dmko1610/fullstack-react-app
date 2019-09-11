import React, {Component} from 'react';
import Entries from '../components/Entries/Entries';
import Cockpit from '../components/Cockpit/Cockpit';
// @ts-ignore
import classes from './App.css'

export type Data = {
    id: number,
    _id: string,
    message: string,
}

interface State {
    datas: Data[],
    data: Data,
    id: number,
    message: string,
    idToDelete: number,
    idToUpdate: number,
    updateToApply: string
}

interface Props {

}

class App extends Component {
    state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            datas: [],
            data: {
                id: 0,
                message: '',
                _id: ''
            },
            id: 0,
            message: '',
            idToDelete: 0,
            idToUpdate: 0,
            updateToApply: '',
        };
    }

    componentDidMount(): void {
        this.fetchData();
    }

    fetchData = () => {
        fetch('http://localhost:3001/api/getData')
            .then((data) => data.json())
            .then((res) => {
                this.setState({datas: res.data});
            });
    };

    nameChangedHandler = (event: any, _id: string) => {
        const entryIndex = this.state.datas.findIndex(index => {
            return index._id === _id;
        });
        const entry = {
            ...this.state.datas[entryIndex]
        };
        entry.message = event.target.value;

        const entries = [...this.state.datas];
        entries[entryIndex] = entry;
        this.setState({datas: entries});
    };

    deleteEntryHandler = (index: number) => {
        const entries = [...this.state.datas];
        entries.splice(index, 1);
        this.setState({datas: entries});
    };

    /*
      putDataToDB = (message: string) => {
          console.log(Object.values(this.state.data));
          let currentIds = Object.values(this.state.data).map((data: any) => data.id);
          let idToBeAdded = 0;
          while (currentIds.includes(idToBeAdded)) {
              ++idToBeAdded;
          }
          axios.post('http://localhost:3001/api/putData', {
              id: idToBeAdded,
              message: message,
          });
      };

      deleteFromDB = (idTodelete: number) => {
          let objIdToDelete = null;
          Object.values(this.state.data).forEach((dat: any) => {
              if (dat.id === idTodelete) {
                  objIdToDelete = dat._id;
              }
          });

          axios.delete('http://localhost:3001/api/deleteData', {
              data: {
                  id: objIdToDelete,
              },
          });
      };

      updateDB = (idToUpdate: number, updateToApply: string) => {
          let objIdToUpdate = null;
          // parseInt(idToUpdate);
          Object.values(this.state.data).forEach((dat: any) => {
              if (dat.id === idToUpdate) {
                  objIdToUpdate = dat._id;
              }
          });

          axios.post('http://localhost:3001/api/updateData', {
              id: objIdToUpdate,
              update: {message: updateToApply},
          });
      };*/

    render() {
        return (
            <div className={classes.App}>
                <Cockpit/>
                <Entries
                    entries={this.state.datas}
                    clicked={this.deleteEntryHandler}
                    changed={this.nameChangedHandler}/>
                {/*  <div style={{padding: '10px'}}>
                        <input
                            type="text"
                            onChange={(e) => this.setState({message: e.target.value})}
                            placeholder="add something in the database"
                            style={{width: '200px'}}/>
                        <button onClick={() => this.putDataToDB(this.state.message)}>
                            ADD
                        </button>
                    </div>

                    <div style={{padding: '10px'}}>
                        <input
                            type="text"
                            style={{width: '200px'}}
                            onChange={(e) => this.setState({idToDelete: parseInt(e.target.value)})}
                            placeholder="put id of item to delete here"
                        />
                        <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
                            DELETE
                        </button>
                    </div>

                    <div style={{padding: '10px'}}>
                        <input
                            type="text"
                            style={{width: '200px'}}
                            onChange={(e) => this.setState({idToUpdate: parseInt(e.target.value)})}
                            placeholder="id of item to update here"
                        />
                        <input
                            type="text"
                            style={{width: '200px'}}
                            onChange={(e) => this.setState({updateToApply: e.target.value})}
                            placeholder="put new value of the item here"
                        />
                        <button
                            onClick={() =>
                                this.updateDB(this.state.idToUpdate, this.state.updateToApply)
                            }>
                            UPDATE
                        </button>
                    </div>*/}
            </div>
        )
    }
}

export default App;
