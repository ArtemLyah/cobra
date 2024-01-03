import React from 'react';
import { Tab } from 'react-bootstrap';
import { TabSettings } from '../settings-tab.type';
import { RoadmapListCard } from './roadmap-list-card';

const RoadmapTab = () => {
  return (
    <Tab.Pane className="fade" eventKey='#roadmap-list'>
      <RoadmapListCard/>
    </Tab.Pane>
  );
};
 
export default RoadmapTab;

export const roadmapSettingsTab: TabSettings = {
  eventKey: '#roadmap-list',
  displayName: 'Roadmaps',
  pane: <RoadmapTab/>,
};