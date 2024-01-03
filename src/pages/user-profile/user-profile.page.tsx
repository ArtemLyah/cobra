import React, { useState } from 'react';
import { ListGroup, Tab } from 'react-bootstrap';
import Tabs from './tabs';
import UserProfilePreview from './user-profile-preview';
import '../styles/user-page.css';

const UserPage = () => {
  const [ activeTab, setActiveTab ] = useState<string>('#account-general');
  
  return (
    <div className="user-page__container">
      <Tab.Container activeKey={activeTab} onSelect={(key: string | null) => key && setActiveTab(key)}>
        <div className="user-page-grid user-page__tab-grid">
          <div className='tab'>
            <UserProfilePreview/>
            <ListGroup style={{ marginTop: '1rem' }}>
              {
                Tabs.map(
                  (tab) => 
                    <ListGroup.Item 
                      className="listGroup-item" 
                      key={tab.eventKey} 
                      href={tab.eventKey}
                      action
                    >
                      {tab.displayName}
                    </ListGroup.Item>
                )
              }
            </ListGroup>
          </div>
          <div className='content'>
            <Tab.Content>
              {
                Tabs.map(tab => <React.Fragment key={tab.eventKey}>{tab.pane}</React.Fragment>)
              }
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </div >
  );
};

export default UserPage;