import React from 'react';
import { Search, Upload, Download, Plus, Edit2, Trash2, MoreHorizontal, Snowflake, Wifi } from 'lucide-react';
import { mockVehicles } from '../mockData';
import { Vehicle } from '../types';

interface VehicleListProps {
  onOpenDetail: (vehicle: Vehicle) => void;
}

export function VehicleList({ onOpenDetail }: VehicleListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
      {/* Top Actions */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">车辆管理</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-gray-300 rounded text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Upload size={16} /> 批量导入
          </button>
          <button className="px-3 py-1.5 border border-gray-300 rounded text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Download size={16} /> 导出数据
          </button>
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <Plus size={16} /> 新增
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-gray-100 grid grid-cols-5 gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">车牌号 / VIN</label>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="查询" className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">品牌 / 车型</label>
          <input type="text" placeholder="查询" className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">所属门店</label>
          <select className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white">
            <option>全部门店</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">车况</label>
          <select className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white">
            <option>全部</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">销售状态</label>
          <div className="flex gap-2">
            <select className="flex-1 px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white">
              <option>全部</option>
            </select>
            <button className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">查询</button>
            <button className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">重置</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-3 border-b border-gray-100 flex gap-2 overflow-x-auto">
        <FilterTab label="全部" active />
        <FilterTab label="Mini" count={2} />
        <FilterTab label="Economy" count={12} />
        <FilterTab label="Compact" count={8} />
        <FilterTab label="Intermediate" count={5} />
        <FilterTab label="Standard" count={15} />
        <FilterTab label="Fullsize" count={3} />
        <FilterTab label="Premium" count={4} />
        <FilterTab label="Luxury" count={2} />
        <FilterTab label="Special" count={1} />
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 border-b border-gray-200 w-12 text-center"><input type="checkbox" className="rounded border-gray-300" /></th>
              <th className="py-3 px-4 border-b border-gray-200 font-medium text-gray-600">车牌号 / VIN</th>
              <th className="py-3 px-4 border-b border-gray-200 font-medium text-gray-600">车型信息</th>
              <th className="py-3 px-4 border-b border-gray-200 font-medium text-gray-600">配置概览</th>
              <th className="py-3 px-4 border-b border-gray-200 font-medium text-gray-600">状态 (车况 / 销售状态)</th>
              <th className="py-3 px-4 border-b border-gray-200 font-medium text-gray-600">里程 / 油量</th>
              <th className="py-3 px-4 border-b border-gray-200 font-medium text-gray-600 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockVehicles.map(vehicle => (
              <tr key={vehicle.id} className="hover:bg-blue-50/50 transition-colors group">
                <td className="py-3 px-4 text-center"><input type="checkbox" className="rounded border-gray-300" /></td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img src={vehicle.image} alt="car" className="w-16 h-10 object-cover rounded bg-gray-100" />
                    <div>
                      <div 
                        className="text-blue-600 font-medium cursor-pointer hover:underline"
                        onClick={() => onOpenDetail(vehicle)}
                      >
                        {vehicle.plate}
                      </div>
                      <div className="text-xs text-gray-500">{vehicle.vin}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-800 flex items-center gap-2">
                    {vehicle.model}
                    <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded font-semibold">{vehicle.category}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{vehicle.store}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3 text-gray-500 text-xs">
                    <span className="flex items-center gap-1"><UserIcon /> {vehicle.seats}</span>
                    <span className="flex items-center gap-1"><DoorIcon /> {vehicle.doors}</span>
                    <span className="flex items-center gap-1"><BagIcon /> {vehicle.bags}</span>
                    <Snowflake size={12} className="text-blue-400" />
                    <Wifi size={12} className="text-green-500" />
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-col gap-1 items-start">
                    <StatusBadge status={vehicle.status} />
                    <span className="px-2 py-0.5 bg-green-50 text-green-600 text-xs rounded border border-green-100">{vehicle.subStatus}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-800">{vehicle.mileage}</div>
                  <div className="text-xs text-gray-500">{vehicle.fuel}</div>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={14} /></button>
                    <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                    <button className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded"><MoreHorizontal size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="p-4 border-t border-gray-100 flex justify-between items-center text-gray-500 text-xs">
        <div>共 5 条，第 1 / 1 页</div>
        <div className="flex items-center gap-2">
          <button className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">&lt;</button>
          <button className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white rounded">1</button>
          <button className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">&gt;</button>
          <select className="ml-2 border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none">
            <option>每页 20 条</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function FilterTab({ label, count, active }: { label: string, count?: number, active?: boolean }) {
  return (
    <button className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${active ? 'bg-blue-100 text-blue-700' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
      {label} {count !== undefined && <span className="ml-1 opacity-60">{count}</span>}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    '正常': 'bg-green-100 text-green-700',
    '租赁中': 'bg-blue-100 text-blue-700',
    '保养': 'bg-orange-100 text-orange-700'
  };
  return (
    <span className={`px-2 py-0.5 text-xs rounded ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
}

// Simple SVG icons for table
const UserIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const DoorIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg>;
const BagIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>;
