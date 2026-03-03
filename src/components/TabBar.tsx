import React from 'react';
import { X, LayoutDashboard, List, Car } from 'lucide-react';
import { TabData } from '../types';

interface TabBarProps {
  tabs: TabData[];
  activeTabId: string;
  onTabClick: (id: string) => void;
  onCloseTab: (id: string, e: React.MouseEvent) => void;
}

export function TabBar({ tabs, activeTabId, onTabClick, onCloseTab }: TabBarProps) {
  const getTabIcon = (type: string, isActive: boolean) => {
    const className = `mr-1.5 ${isActive ? 'text-[#165dff]' : 'text-gray-400 group-hover:text-gray-600'}`;
    switch (type) {
      case 'dashboard': return <LayoutDashboard size={14} className={className} />;
      case 'list': return <List size={14} className={className} />;
      case 'detail': return <Car size={14} className={className} />;
      default: return null;
    }
  };

  return (
    <div className="flex items-center bg-white border-b border-gray-200 px-4 py-2 gap-1.5 overflow-x-auto no-scrollbar shadow-sm z-10">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <div
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            className={`
              group flex items-center justify-between h-8 px-3 rounded cursor-pointer select-none transition-all text-[13px] font-medium border
              ${isActive 
                ? 'bg-[#e8f3ff] text-[#165dff] border-transparent' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}
            `}
          >
            <div className="flex items-center">
              {getTabIcon(tab.type, isActive)}
              <span className="truncate max-w-[160px]">{tab.title}</span>
            </div>
            {tab.closable && (
              <button
                onClick={(e) => onCloseTab(tab.id, e)}
                className={`ml-2 p-0.5 rounded-full flex items-center justify-center transition-colors
                  ${isActive ? 'text-[#165dff] hover:bg-[#d0e4ff]' : 'text-gray-400 hover:bg-gray-200 hover:text-gray-700'}
                `}
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
