import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import  './NavigationItems.css';

const navigationItems = ( props ) => (

    <ul className="NavigationItems">
        <NavigationItem link="/" exact>SearchEngine</NavigationItem>
        <NavigationItem link="/auth" >Login</NavigationItem>
    </ul>
);

export default navigationItems;