import Order from "@models/order";
import { type Response, type Request } from "express";
import { ObjectId } from "mongodb";

export class OrderController {
  static async getBasedOnName(name: string) {
    // retrieve order based on ID
    let order = await Order.findOne({ name: name }).exec();

    // check if order data is correct
    if (order !== null) {
      return null;
    }

    // return order
    return order;
  }

  static async getAll(_: Request, res: Response) {
    // get all orders
    let orders = await Order.find();

    // return orders
    return res.status(200).json(orders);
  }

  static async createOne(req: Request, res: Response) {
    // get request body with data
    let reqBody = req.body;

    // create instance of order
    let order = new Order(reqBody);

    // check if body format is correct
    if (!order.name) {
      return res.status(401).json({
        document: order,
        is_stored: false,
      });
    }

    // activate order
    order.active = true;

    // save order into DB
    order.save();

    // return response with success status and request body
    return res.status(201).json({
      document: order,
      is_stored: true,
    });
  }

  static async getOne(req: Request, res: Response) {
    // get id from url
    const { id } = req.params;

    // build id
    const idObject = new ObjectId(id);

    // get one order from DB
    const order = await Order.findOne({ _id: idObject });

    // check if order was found
    if (!order) {
      return res.status(404).json({ error: "Order wasn't found" });
    }

    // return data
    return res.status(200).json(order);
  }

  static async getOneName(req: Request, res: Response) {
    // get id from url
    const { name } = req.params;

    // get one order from DB
    const order = await OrderController.getBasedOnName(name);

    // check if order was found
    if (!order) {
      return res.status(404).json({ error: "Order wasn't found" });
    }

    // return data
    return res.status(200).json(order);
  }
}

export default OrderController;
