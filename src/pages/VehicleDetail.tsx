import React from 'react';
import { mockVehicles } from '../mockData';
import { ArrowLeft, Edit, Calendar, MapPin, Wrench } from 'lucide-react';

export function VehicleDetail({ vehicleId }: { vehicleId: string }) {
  const vehicle = mockVehicles.find(v => v.id === vehicleId);

  if (!vehicle) {
    return <div className="p-8 text-center text-gray-500">车辆未找到</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gradient-to-r from-blue-50 to-white">
        <div className="flex gap-6">
          <img src={vehicle.image} alt={vehicle.model} className="w-40 h-28 object-cover rounded-lg shadow-sm border border-gray-200" />
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{vehicle.plate}</h2>
              <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">{vehicle.status}</span>
              <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">{vehicle.subStatus}</span>
            </div>
            <p className="text-gray-500 mb-4">{vehicle.model} • {vehicle.category} • {vehicle.vin}</p>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-gray-600">
                <MapPin size={16} className="text-gray-400" />
                {vehicle.store}
              </div>
              <div className="flex items-center gap-1.5 text-gray-600">
                <Calendar size={16} className="text-gray-400" />
                入库时间: 2023-05-12
              </div>
            </div>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm">
          <Edit size={16} /> 编辑资料
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="grid grid-cols-3 gap-6">
          {/* Basic Info */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                基本信息
              </h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <InfoItem label="车牌号" value={vehicle.plate} />
                <InfoItem label="车架号 (VIN)" value={vehicle.vin} />
                <InfoItem label="品牌车型" value={vehicle.model} />
                <InfoItem label="车辆组别" value={vehicle.category} />
                <InfoItem label="座位数" value={`${vehicle.seats} 座`} />
                <InfoItem label="车门数" value={`${vehicle.doors} 门`} />
                <InfoItem label="行李数" value={`${vehicle.bags} 件`} />
                <InfoItem label="燃油类型" value="汽油" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                行驶数据
              </h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <InfoItem label="当前里程" value={vehicle.mileage} highlight />
                <InfoItem label="当前油量" value={vehicle.fuel} highlight />
                <InfoItem label="上次保养里程" value="120,000 km" />
                <InfoItem label="下次保养里程" value="130,000 km" />
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">快捷操作</h3>
              <div className="space-y-3">
                <button className="w-full py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium">生成维保工单</button>
                <button className="w-full py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium">车辆调拨</button>
                <button className="w-full py-2.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-all font-medium">下架车辆</button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">最近动态</h3>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                <TimelineItem date="2023-10-24 14:30" title="车辆还车" desc="成田机场店 - 正常还车" />
                <TimelineItem date="2023-10-20 09:00" title="车辆出租" desc="成田机场店 - 租期4天" />
                <TimelineItem date="2023-09-15 10:00" title="常规保养" desc="更换机油、机滤" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-gray-500">{label}</span>
      <span className={`text-sm ${highlight ? 'font-semibold text-blue-600 text-base' : 'text-gray-900 font-medium'}`}>{value}</span>
    </div>
  );
}

function TimelineItem({ date, title, desc }: { date: string, title: string, desc: string }) {
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
      <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-white bg-blue-500 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] pl-4 md:pl-0 md:group-odd:pr-4 md:group-even:pl-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 mb-0.5">{date}</span>
          <span className="text-sm font-medium text-gray-800">{title}</span>
          <span className="text-xs text-gray-500">{desc}</span>
        </div>
      </div>
    </div>
  );
}
