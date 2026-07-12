import Order from "../models/order.model.js";
import Shop from "../models/shop.model.js";

export const placeOrder = async (req, res) => {
    try {
        const { cartItem, paymentMethod, deliveryAddress, totalAmount } = req.body;
        if (!cartItem || !cartItem.length) {
            return res.status(400).json({ message: "Cart cannot be empty" });
        }
        if (!deliveryAddress.text || !deliveryAddress.latitude || !deliveryAddress.longitude) {
            return res.status(400).json({ message: "Delivery address is required" });
        }
        const groupItemsByShop = {};

        cartItem.forEach((item) => {
            const shopId = item.shop;
            if (!groupItemsByShop[shopId]) {
                groupItemsByShop[shopId] = [];
            }
            groupItemsByShop[shopId].push(item);
        })

        const shopOrders = await Promise.all(Object.keys(groupItemsByShop).map(async (shopId) => {
            const shop = await Shop.findById(shopId).populate("owner");
            if (!shop) {
                throw new Error(`Shop with id ${shopId} not found`);
            }
            const items = groupItemsByShop[shopId];
            const subtotal = items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);

            return {
                shop: shop._id,
                owner: shop.owner._id,
                subtotal,
                shopOrderItems: items.map((item) => ({
                    item: item.id,
                    price: item.price,
                    quantity: item.quantity,
                    name: item.name,
                })),
            }
        }))

        const newOrder = await Order.create({
            user: req.userId,
            paymentMethod,
            deliveryAddress,
            totalAmount,
            shopOrder: shopOrders
        });

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            orderId: newOrder
        })

    } catch (error) {
        res.status(500).json({ message: "Error placing order" });
    }
}


export const getMyOrders = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (user.role == "user") {
            const orders = await Order.find({ user: req.userId }).populate("shopOrder.shop", "name")
                .populate("shopOrder.owner", "name email mobile")
                .populate("shopOrder.shopOrderItems.item", "name image price")

            return res.status(200).json({
                success: true,
                data: orders
            });
        } else if (user.role == "owner") {
            const shopOrders = await Order.find({ "shopOrder.owner": req.userId })
            .sort({ createdAt: -1 })
            .populate("user")
            .populate("shopOrder.shopOrderItems.item", "name image price")

        return res.status(200).json({
            success: true,
            data: shopOrders
        });
        }

    } catch (error) {
        res.status(500).json({ message: "Error fetching orders" });
    }
}


