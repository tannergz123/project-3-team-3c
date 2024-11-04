export interface OrderItem {
  name: string;
  entrees: { name: string; quantity: number }[];
  sides: string[];
  quantity: number;
}
