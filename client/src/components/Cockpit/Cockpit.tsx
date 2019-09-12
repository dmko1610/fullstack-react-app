import React from 'react';
// @ts-ignore
import classes from './Cockpit.css'

const cockpit = (props: any) => {
    const assignedClasses = [];
    let btnClass = '';
    if (props.showEntries) {
        btnClass = classes.Red
    }

    if (props.datas.lenght <= 2) {
        assignedClasses.push(classes.red);
    }

    if (props.datas.lenght <= 1) {
        assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
            <h1>Full-stack react app</h1>
            <p className={assignedClasses.join(' ')}>It is Working now</p>
            <button
                className={btnClass}
                onClick={props.clicked}>Toggle Entries
            </button>
        </div>
    );
};

export default cockpit;
