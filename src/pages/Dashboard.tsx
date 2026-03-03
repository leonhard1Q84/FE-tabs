import React from 'react';
import { Users, Car, DollarSign, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">工作台概览</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="今日订单" value="128" icon={<Activity />} trend="+12.5%" isUp />
        <StatCard title="在租车辆" value="342" icon={<Car />} trend="+5.2%" isUp />
        <StatCard title="可用库存" value="86" icon={<Users />} trend="-2.4%" isUp={false} />
        <StatCard title="今日收入" value="¥45,231" icon={<DollarSign />} trend="+18.2%" isUp />
      </div>

      {/* Charts & Lists Placeholder */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">收入趋势</h3>
          <div className="flex-1 flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            图表区域 (Chart Placeholder)
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">待办事项</h3>
          <div className="flex-1 space-y-3 overflow-auto pr-2">
            <TodoItem title="车辆保养提醒 (沪A·12345)" time="10:30 AM" type="warning" />
            <TodoItem title="客户还车确认 (张先生)" time="11:15 AM" type="info" />
            <TodoItem title="新车入库审批 (5辆)" time="14:00 PM" type="success" />
            <TodoItem title="违章处理 (粤B·88888)" time="16:30 PM" type="error" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, isUp }: { title: string, value: string, icon: React.ReactNode, trend: string, isUp: boolean }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          {React.cloneElement(icon as React.ReactElement, { size: 20 })}
        </div>
        <div className={`flex items-center text-sm font-medium ${isUp ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
          {isUp ? <ArrowUpRight size={16} className="ml-1" /> : <ArrowDownRight size={16} className="ml-1" />}
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-sm text-gray-500">{title}</div>
      </div>
    </div>
  );
}

function TodoItem({ title, time, type }: { title: string, time: string, type: 'warning' | 'info' | 'success' | 'error' }) {
  const colors = {
    warning: 'bg-orange-100 text-orange-600',
    info: 'bg-blue-100 text-blue-600',
    success: 'bg-green-100 text-green-600',
    error: 'bg-red-100 text-red-600'
  };
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${colors[type].split(' ')[0]}`}></div>
        <span className="text-sm font-medium text-gray-700">{title}</span>
      </div>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  );
}
