export interface OrderItem {
  name: string;
  entrees: { name: string; quantity: number }[];
  sides: string[];
  drink: string;
  appetizer: string;
  quantity: number;
  price: number;
  cartItemId: number;
}
