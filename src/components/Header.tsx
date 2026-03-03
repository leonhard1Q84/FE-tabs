import React from 'react';
import { HelpCircle, Bell, User } from 'lucide-react';

export function Header() {
  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
      <div className="text-gray-500 text-sm">
        首页 / <span className="text-gray-900 font-medium">车辆管理</span>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm cursor-pointer">
          <span className="text-red-600 font-bold">🇨🇳</span>
          <span>简体中文</span>
          <span className="text-gray-400 text-xs">▼</span>
        </div>
        
        <div className="flex items-center gap-4 text-gray-500">
          <HelpCircle size={20} className="cursor-pointer hover:text-gray-700" />
          <div className="relative cursor-pointer hover:text-gray-700">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700 border-l pl-4 ml-2">
            <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="text-sm font-medium text-gray-700">管理员</span>
          </div>
        </div>
      </div>
    </div>
  );
}
