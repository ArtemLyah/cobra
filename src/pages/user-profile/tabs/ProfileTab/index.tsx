import React from 'react';
import { Tab } from 'react-bootstrap';
import { TabSettings } from '../settings-tab.type';
import { ProfileCard } from './profile-card';
import './profile-tab.css';

const ProfileTab = () => {
  return ( 
    <Tab.Pane className="fade" eventKey='#account-general'>
      <ProfileCard/>
    </Tab.Pane>
  );
};
 
export default ProfileTab;

export const profileSettingsTab: TabSettings = {
  eventKey: '#account-general',
  displayName: 'Profile',
  pane: <ProfileTab/>,
};