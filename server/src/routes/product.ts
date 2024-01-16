import {Router, Request, Response} from 'express'
import {ProductModel} from '../models/product'
import {UserModel} from "../models/user";
import {ProductErrors, UserErrors} from "../errors";
import {verifyToken} from "./user";
import {Schema} from "mongoose";
import {ObjectId} from "mongoose";

const router = Router();

router.get("/", verifyToken, async (_, res: Response) => {        // retrieve all products
    try {
        const products = await ProductModel.find({})    // retrieve everything
        return res.json({products})
    } catch (err) {
        res.status(400).json({type: err})
    }
})

router.post("/checkout", verifyToken, async (req: Request, res: Response) => {
    const {customerID, cartItems} = req.body;
    try {
        const user = await UserModel.findById(customerID);
        const productIDs = Object.keys(cartItems);
        const products = await ProductModel.find({_id: {$in: productIDs}}) // search entries in DB which has such IDs
        if (!user) {
            return res.status(400).json({type: UserErrors.NO_USER_FOUND})
        }
        if (products.length !== productIDs.length) {
            return res.status(400).json({type: ProductErrors.NO_PRODUCTS_FOUND})
        }
        let totalPrice = 0;
        for (const item in cartItems) {
            const product = products.find((product) => String(product._id) === item);
            if (!product) {
                return res.status(400).json({type: ProductErrors.NO_PRODUCTS_FOUND})
            }
            if (product.stockQuantity < cartItems[item]) {
                return res.status(400).json({type: ProductErrors.NOT_ENOUGH_PRODUCTS})
            }
            totalPrice +=cartItems[item] * product.price
        }

        if (totalPrice > user.availableMoney) {
            return res.status(400).json({type: UserErrors.NOT_ENOUGH_MONEY})
        }

        user.availableMoney -= totalPrice;
        user.purchasedItems.push(...productIDs)
        await user.save()

        for (const item in cartItems) {
            await ProductModel.updateMany(
                {_id: {$in: item}},
                {$inc: {stockQuantity: -(cartItems[item])}})
        }
        res.json({purchasedItems: user.purchasedItems})
    } catch (err) {
        res.status(400).json({err})
    }
})

router.get('/purchased/:userID', verifyToken, async (req: Request, res:Response)=>{
    const {userID} = req.params;
    try {
        const user = await UserModel.findById(userID);
        if (!user){
            return res.status(400).json({type: UserErrors.NO_USER_FOUND})
        }
        const purchasedItemsID = user.purchasedItems.filter((value, index, array) => array.indexOf(value) === index);
        console.log(purchasedItemsID)
        // @ts-ignore
        const purchasedProduct = await ProductModel.find({_id: {$in:user.purchasedItems}})
        return res.json({purchased: purchasedProduct})
    }catch (err){
        res.status(500).json({err})
    }
})


export {router as productRouter}