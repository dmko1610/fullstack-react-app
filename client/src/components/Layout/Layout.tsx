import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
// @ts-ignore
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props: any) => (
    <Auxiliary>
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxiliary>
);

export default layout;
