import React from "react";
// @ts-ignore
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';

const toolbar = (props: any) => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo />
        <div>LOGO</div>
        <nav>
            ...
        </nav>
    </header>
);

export default toolbar;
