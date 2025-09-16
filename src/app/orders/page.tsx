import { getOrders } from '@/lib/order';
import { Order } from '@/interfaces/order.interface';

export default async function OrdersPage() {
  const orders: Order[] = await getOrders();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-8">
        {Array.isArray(orders) && orders.map((order) => (
          <div key={order._id} className="border rounded-md p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">Order #{order._id.substring(0, 8)}</h2>
                <p className="text-sm text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${order.totalOrderPrice}</p>
                <p className={`text-sm ${order.isPaid ? 'text-green-500' : 'text-red-500'}`}>
                  {order.isPaid ? 'Paid' : 'Not Paid'}
                </p>
              </div>
            </div>
            <div>
              {order.cartItems.map((item) => (
                <div key={item.product._id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p>{item.product.title}</p>
                    <p className="text-sm text-gray-600">Qty: {item.count}</p>
                  </div>
                  <p>${item.price * item.count}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
