import React, {useEffect} from 'react';
// @ts-ignore
import classes from './Cockpit.css'

const Cockpit = (props: any) => {
    useEffect(() => {
        console.log('[Cockpit] useEffect');
        setTimeout(() => {
            alert('Wow');
        }, 1000);
        return () => {
            console.log('[Cockpit] cleanup work in UseEffect')
        }
    }, []);

    useEffect(() => {
        console.log('[Cockpit] 2nd useEffect');
        return () => {
            console.log('[Cockpit] cleanup work in 2nd UseEffect');
        }
    });

    const assignedClasses = [];
    let btnClass = '';
    if (props.showEntries) {
        btnClass = classes.Red
    }

    if (props.datasLength <= 2) {
        assignedClasses.push(classes.red);
    }

    if (props.datasLength <= 1) {
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

export default React.memo(Cockpit);
