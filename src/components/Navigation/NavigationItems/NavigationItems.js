import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import  './NavigationItems.css';

const navigationItems = ( props ) => (

    <ul className="NavigationItems">
        <NavigationItem link="/" exact>SearchEngine</NavigationItem>
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Login</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;