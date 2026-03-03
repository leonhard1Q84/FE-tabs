export interface Vehicle {
  id: string;
  plate: string;
  vin: string;
  model: string;
  category: string;
  store: string;
  seats: number;
  doors: number;
  bags: number;
  status: '正常' | '租赁中' | '保养';
  subStatus: '上架' | '备用';
  mileage: string;
  fuel: string;
  image: string;
}

export interface TabData {
  id: string;
  title: string;
  type: 'dashboard' | 'list' | 'detail';
  vehicleId?: string;
  closable: boolean;
}
