import React, {Component} from 'react';
import axios from 'axios'
// import { Entries } from './components/Entries';

type Data = {
    id: number,
    _id: string,
    message: string,
}

interface State {
    data: Data,
    id: number,
    message: string,
    intervalIsSet?: NodeJS.Timeout,
    idToDelete: number,
    idToUpdate: number,
    objectToUpdate: Object
}

interface Props {
}

class App extends Component<Props, State> {

    state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            data: {
                id: 0,
                message: '',
                _id: ''
            },
            id: 0,
            message: '',
            intervalIsSet: setInterval(this.getDataFromDb, 1000),
            idToDelete: 0,
            idToUpdate: 0,
            objectToUpdate: [],
        };
    }

    componentDidMount() {
        this.getDataFromDb();
    }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({
                ...this.state,
                intervalIsSet: undefined
            });
        }
    }

    getDataFromDb = () => {
        fetch('http://localhost:3001/api/getData')
            .then((data) => data.json())
            .then((res) => this.setState({data: res.data}));
    };

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
        // parseInt(idTodelete);
        let objIdToDelete = null;
        // this.state.data.forEach((dat: Data) => {
        //   if (dat.id === idTodelete) {
        //     objIdToDelete = dat._id;
        //   }
        // });

        axios.delete('http://localhost:3001/api/deleteData', {
            data: {
                id: objIdToDelete,
            },
        });
    };

    updateDB = (idToUpdate: number, updateToApply: string) => {
        let objIdToUpdate = null;
        // parseInt(idToUpdate);
        // this.state.data.forEach((dat: Data) => {
        //   if (dat.id === idToUpdate) {
        //     objIdToUpdate = dat._id;
        //   }
        // });

        axios.post('http://localhost:3001/api/updateData', {
            id: objIdToUpdate,
            update: {message: updateToApply},
        });
    };

    render() {
        const {data} = this.state;

        return (
            <div>
                <ul>
                    {
                        !data
                            ? 'NO DB ENTRIES'
                            : Object.values(data).map((element: any) => (
                                <li style={{padding: '10px'}} key={data._id}>
                                    <span style={{color: 'gray'}}> id: </span> {element.id} <br/>
                                    <span style={{color: 'gray'}}> message: </span> {element.message}
                                </li>
                            ))
                    }
                </ul>
                <div style={{padding: '10px'}}>
                    <input
                        type="text"
                        onChange={(e) => this.setState({message: e.target.value})}
                        placeholder="add something in the database"
                        style={{width: '200px'}}/>
                    <button onClick={() => this.putDataToDB(this.state.message)}>
                        ADD
                    </button>
                </div>
                {/*
                <div style={ { padding: '10px' } }>
                  <input
                    type="text"
                    style={ { width: '200px' } }
                    onChange={ (e) => this.setState({ idToDelete: e.target.value }) }
                    placeholder="put id of item to delete here"
                  />
                  <button onClick={ () => this.deleteFromDB(this.state.idToDelete) }>
                    DELETE
                  </button>
                </div>
                <div style={ { padding: '10px' } }>
                  <input
                    type="text"
                    style={ { width: '200px' } }
                    onChange={ (e) => this.setState({ idToUpdate: e.target.value }) }
                    placeholder="id of item to update here"
                  />
                  <input
                    type="text"
                    style={ { width: '200px' } }
                    onChange={ (e) => this.setState({ updateToApply: e.target.value }) }
                    placeholder="put new value of the item here"
                  /> */}
                {/* <button
            onClick={ () =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }>
            UPDATE
          </button> */}
                {/* </div> */}
            </div>
        )
    }
}

export default App;
