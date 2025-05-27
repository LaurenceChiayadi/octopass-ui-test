/// <reference types="vite/client" />

interface ISuccessResponse<T> {
  results: T[];
  total?: number;
}

interface ICustomer {
  id: string;
  companyName: string;
  contactName: string;
  contactTitle: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  fax: string;
}

interface ICustomerDetail {
  customer: ICustomer;
  orders: IOrder[];
}

interface IOrderInfo {
  id: number;
  customerId: string;
  employeeId: number;
  orderDate: string;
  requiredDate: string;
  shippedDate: string;
  shipVia: number;
  freight: number;
  shipName: string;
  shipAddress: string;
  shipCity: string;
  shipPostalCode: string;
  shipCountry: string;
}

interface IOrderDetail {
  orderId: string;
  productId: string;
  unitPrice: string;
  quantity: number;
  discount: string;
}

interface IOrder {
  order: IOrderInfo;
  orderDetails?: IOrderDetail[];
}

interface IAPIParams {
  pagination?: PaginationState;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}
