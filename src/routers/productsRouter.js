import { Router } from "express";
import { productsModel } from "../dao/models/productsModel.js";

export const productsRouter = Router()
// productsRouter.use(express.json())

productsRouter.get('/', async (req,res) => {
    try {
        let products = await productsModel.find()
        res.send({result:'succes', payload:products})  
    } catch (error) {
        res.status(400).json({error:'No hay productos'})
    }
})

productsRouter.get('/:pid', async (req,res) => {
    try {
        let product = await productsModel.findById({_id:req.params.pid})
        res.send({result:'succes', payload:product})
    } catch (error) {
        res.status(404).json({error:'No encontrado'})
    }
})

productsRouter.post('/', async (req,res) => {
    try {
        let exist = await productsModel.findOne({title:req.body.title})
        if(exist) {
            return res.send({result:'error', error:'producto repetido'})
        }
        let product = await productsModel.create({...req.body})
        res.send({result:'succes', payload:product})
    } catch (error) {
        res.status(400).json({error:'Error al agregarlo'})
    }
})

productsRouter.put('/:pid', async (req,res) => {
    try {
        if(!req.body.title || !req.body.description || !req.body.quantity || !req.body.price){
            return res.send({result:'error', error:'campos incompletos'})
        }
        let result = await productsModel.updateOne({_id:req.params.pid}, req.body)
        res.send({result:'succes', payload:result})
    } catch (error) {
        res.status(404),json({error:'Producto no encontrado'})
    }
})

productsRouter.delete('/:pid', async (req,res) => {
    try {
        let cart = await productsModel.deleteOne({_id:req.params.pid})
        res.send({result:"succes", payload:cart})
    } catch (error) {
        res.status(404), json({error:'Producto no encontrado'})
    }
})