import React from "react";
import burgerLogo from '../../assets/images/burger-logo.png';
// @ts-ignore
import classes from './Logo.css';

const logo = (props: any) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
);

export default logo;
