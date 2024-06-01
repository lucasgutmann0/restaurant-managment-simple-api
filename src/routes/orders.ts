import express from "express";
import OrderController from "@controllers/order";

// define router to group variables
const orderRouter = express.Router();

// define routes
orderRouter.get('/', OrderController.getAll);
orderRouter.get('/name/:name', OrderController.getOneName);
orderRouter.get('/:id', OrderController.getOne);
orderRouter.post('/', OrderController.createOne);

export default orderRouter;
