import React from 'react';
import { Tab } from 'react-bootstrap';
import { TabSettings } from '../settings-tab.type';
import { DeleteAccountCard } from './delete-account-card';
import { ChangePasswordCard } from './change-password-card';
import './settings-tab.css';

const SettingsTab = () => {
  return ( 
    <Tab.Pane className="fade" eventKey='#settings'>
      <ChangePasswordCard/>
      <DeleteAccountCard/>
    </Tab.Pane>
  );
};
 
export default SettingsTab;

export const settingsTab: TabSettings = {
  eventKey: '#settings',
  displayName: 'Settings',
  pane: <SettingsTab/>,
};