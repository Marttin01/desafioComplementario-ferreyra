import { Router } from "express";
import { cartsModel } from "../dao/models/cartsModel.js";
import { productsModel } from "../dao/models/productsModel.js";

export const cartsRouter = Router()
// cartsRouter.use(express.json())

cartsRouter.get('/', async (req,res) =>{
    const carts = await cartsModel.find()
    res.send({result:"succes",payload:carts})
})

cartsRouter.get('/:cid', async(req,res) => {
    let exist = await cartsModel.findById({_id:req.params.cid})
    if(!exist){
        return res.send({status:"error", error:"Carrito no encontrado"})
    }
    res.send({result:"succes", payload:exist})
})

cartsRouter.post('/', async(req,res) => {
    let cart = await cartsModel.create({
        ...req.body
    })
    res.send({result:"succes", payload:cart})
})

cartsRouter.post('/:cid/product/:pid', async(req,res) => {
    try {
        let cart = await cartsModel.findById({_id:req.params.cid})
        if(!cart){
            return res.send({result:'error',error:'carrito no encontrado'})
        }
        
        let product = await productsModel.findById({_id:req.params.pid})
        if(!product){
            return res.send({result:'error', error:'producto no encontrado'})
        }

        let productCart = cart.products.findIndex(p => p.product._id.toString() === req.params.pid.toString())
        
        console.log(productCart)
        // // console.log(product)

        if(productCart === -1) {
            cart.products.push({product:product, quantity:1}) 
            
        }else {
            cart.products[productCart].quantity++
            console.log(cart.products[productCart].quantity)
        }

         
        let result = await cartsModel.updateOne({_id:req.params.cid}, cart) 
        res.send({result:'succes', payload:result})
        
        
    } catch (error) {
        res.status(400).json({error:'Producto o carrito no encontrado'})    
    }
})

cartsRouter.delete('/:cid', async(req,res) => {
    let cart = await cartsModel.deleteOne({_id:req.params.cid})
    res.send({result:"succes", payload:cart})
})
