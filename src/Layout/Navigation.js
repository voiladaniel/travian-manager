import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faShieldAlt, faUser, faBolt, faBookOpen } from '@fortawesome/free-solid-svg-icons'

import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export const Navigation = (props) =>{

    const onToggle = (e) => {
        props.onToggle(e);
    };

    return(
        <>
        <Route render={({ location, history }) => (
            <SideNav onToggle={onToggle}
                     onSelect={(selected) => {
                        const to = '/' + selected;
                        history.push(to);
                            // if (location.pathname !== to) {
                            //     history.push(to);
                            // }
            }}>
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="Home">
                        <NavIcon>
                            <FontAwesomeIcon icon={faHome}/>
                        </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Defense">
                        <NavIcon>
                        <FontAwesomeIcon icon={faBookOpen}/>
                        </NavIcon>
                        <NavText>
                            Planner
                        </NavText>
                        {/* <NavItem eventKey="charts/linechart">
                            <NavText>
                                Line Chart
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="charts/barchart">
                            <NavText>
                                Bar Chart
                            </NavText>
                        </NavItem> */}
                    </NavItem>
                    {/* <NavItem eventKey="Attack">
                        <NavIcon>
                            <FontAwesomeIcon icon={faBolt}/>
                        </NavIcon>
                        <NavText>
                            Attack
                        </NavText>
                    </NavItem> */}
                    <NavItem eventKey="Accounts">
                        <NavIcon>
                            <FontAwesomeIcon icon={faUser}/>
                        </NavIcon>
                        <NavText>
                            Accounts
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
            )}
            />
        </>
    )
}