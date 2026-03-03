import React, { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingCart, Box, Warehouse, Car, MapPin, Store, FileText, Globe, Settings, ChevronDown } from 'lucide-react';

interface SidebarProps {
  activeTabId: string;
  onMenuClick: (id: string, title: string, type: 'dashboard' | 'list') => void;
}

export function Sidebar({ activeTabId, onMenuClick }: SidebarProps) {
  const [isVehicleMenuExpanded, setIsVehicleMenuExpanded] = useState(false);

  // 自动展开包含当前激活标签页的菜单组
  useEffect(() => {
    if (activeTabId.startsWith('vehicle-')) {
      setIsVehicleMenuExpanded(true);
    }
  }, [activeTabId]);

  return (
    <div className="w-64 bg-[#0f172a] text-gray-300 flex flex-col h-full flex-shrink-0">
      <div className="h-14 flex items-center px-4 border-b border-gray-800">
        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold mr-3">M</div>
        <span className="text-white font-semibold text-lg">FleetEdge</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <NavItem 
          icon={<LayoutDashboard size={18} />} 
          label="工作台" 
          active={activeTabId === 'dashboard'}
          onClick={() => onMenuClick('dashboard', '工作台', 'dashboard')}
        />
        <NavItem icon={<ShoppingCart size={18} />} label="订单管理" hasSub />
        <NavItem icon={<Box size={18} />} label="商品管理" hasSub />
        <NavItem icon={<Warehouse size={18} />} label="库存管理" hasSub />
        
        <div className="mt-2">
          <div 
            onClick={() => setIsVehicleMenuExpanded(!isVehicleMenuExpanded)}
            className={`flex items-center justify-between px-6 py-3 cursor-pointer transition-colors ${isVehicleMenuExpanded ? 'text-white bg-blue-600/10 border-r-2 border-blue-500' : 'hover:bg-gray-800'}`}
          >
            <div className="flex items-center gap-3">
              <Car size={18} className={isVehicleMenuExpanded ? "text-blue-500" : ""} />
              <span className={isVehicleMenuExpanded ? "font-medium" : ""}>车辆管理</span>
            </div>
            <ChevronDown size={16} className={`transition-transform duration-200 ${isVehicleMenuExpanded ? "" : "-rotate-90"}`} />
          </div>
          {isVehicleMenuExpanded && (
            <div className="bg-[#0f172a] py-1">
              <SubNavItem 
                label="车辆信息" 
                active={activeTabId === 'vehicle-list'} 
                onClick={() => onMenuClick('vehicle-list', '车辆信息', 'list')}
              />
              <SubNavItem label="新车入库" />
              <SubNavItem label="车损登记" />
              <SubNavItem label="维保工单" />
              <SubNavItem label="车辆调拨" />
              <SubNavItem label="资产处置单" />
            </div>
          )}
        </div>

        <NavItem icon={<MapPin size={18} />} label="自助取还" hasSub />
        <NavItem icon={<Store size={18} />} label="门店管理" hasSub />
        <NavItem icon={<FileText size={18} />} label="政策管理" hasSub />
        <NavItem icon={<Globe size={18} />} label="渠道管理" hasSub />
        <NavItem icon={<Settings size={18} />} label="系统设置" />
      </div>
    </div>
  );
}

function NavItem({ icon, label, hasSub, active, onClick }: { icon: React.ReactNode, label: string, hasSub?: boolean, active?: boolean, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between px-6 py-3 cursor-pointer transition-colors ${active && !hasSub ? 'bg-blue-600/10 text-white border-r-2 border-blue-500' : 'hover:bg-gray-800'}`}
    >
      <div className="flex items-center gap-3">
        {React.cloneElement(icon as React.ReactElement, { className: active && !hasSub ? 'text-blue-500' : '' })}
        <span className={active && !hasSub ? 'font-medium' : ''}>{label}</span>
      </div>
      {hasSub && <ChevronDown size={16} className="text-gray-500 -rotate-90" />}
    </div>
  );
}

function SubNavItem({ label, active, onClick }: { label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`pl-14 pr-6 py-2.5 cursor-pointer transition-colors ${active ? 'text-blue-400 bg-blue-600/5' : 'hover:text-white hover:bg-gray-800'}`}
    >
      {label}
    </div>
  );
}
