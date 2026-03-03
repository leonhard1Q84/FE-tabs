/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { TabBar } from './components/TabBar';
import { Dashboard } from './pages/Dashboard';
import { VehicleList } from './pages/VehicleList';
import { VehicleDetail } from './pages/VehicleDetail';
import { TabData, Vehicle } from './types';

export default function App() {
  const [tabs, setTabs] = useState<TabData[]>([
    { id: 'dashboard', title: '工作台', type: 'dashboard', closable: false }
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('dashboard');

  const openMenuTab = (id: string, title: string, type: 'dashboard' | 'list') => {
    const existingTab = tabs.find(t => t.id === id);
    if (existingTab) {
      setActiveTabId(id);
    } else {
      const newTab: TabData = { id, title, type, closable: true };
      setTabs([...tabs, newTab]);
      setActiveTabId(id);
    }
  };

  const openTab = (vehicle: Vehicle) => {
    const tabId = `vehicle-detail-${vehicle.id}`;
    const existingTab = tabs.find(t => t.id === tabId);
    
    if (existingTab) {
      setActiveTabId(tabId);
    } else {
      const newTab: TabData = {
        id: tabId,
        title: vehicle.plate,
        type: 'detail',
        vehicleId: vehicle.id,
        closable: true
      };
      setTabs([...tabs, newTab]);
      setActiveTabId(tabId);
    }
  };

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    
    if (activeTabId === id) {
      // Switch to the last available tab, or the list tab
      const closedTabIndex = tabs.findIndex(t => t.id === id);
      const nextTab = newTabs[closedTabIndex - 1] || newTabs[0];
      if (nextTab) {
        setActiveTabId(nextTab.id);
      }
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden font-sans text-sm">
      <Sidebar activeTabId={activeTabId} onMenuClick={openMenuTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <TabBar 
          tabs={tabs} 
          activeTabId={activeTabId} 
          onTabClick={setActiveTabId} 
          onCloseTab={closeTab} 
        />
        <main className="flex-1 relative overflow-hidden">
          {tabs.map(tab => (
            <div 
              key={tab.id} 
              className={`absolute inset-0 overflow-auto p-4 ${tab.id === activeTabId ? 'block' : 'hidden'}`}
            >
              {tab.type === 'dashboard' && <Dashboard />}
              {tab.type === 'list' && <VehicleList onOpenDetail={openTab} />}
              {tab.type === 'detail' && <VehicleDetail vehicleId={tab.vehicleId!} />}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

