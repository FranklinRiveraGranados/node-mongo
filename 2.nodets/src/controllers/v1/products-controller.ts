import { Request, Response } from 'express';
//import Prouducts from "../../db/schemas/product"
import Products from '../../db/schemas/product';
import { Types } from "mongoose"

//import { products, Product } from '../../data/products';

export const getProducts = async (req: Request, res: Response): Promise<void> => {


  const itemsPerPage: number = 20;
  const page: number = parseInt(req.query.page as string);
  const start = (page - 1) * itemsPerPage;
  const total: number = await Products.count({user: req.session.userId});
  //const end: number = page * itemsPerPage;
  
  const products = await Products.find({
    user: req.session.userId,
  }).skip(start).limit(itemsPerPage)

  res.send({
    page: page,
    per_page: itemsPerPage,
    total: total,
    total_pages: Math.ceil(total / itemsPerPage),
    data: products,
  });
};

export const getProductById = async (req: Request, res: Response): Promise <void> => {
  try{
    const { productId } = req.params;

    if(!Types.ObjectId.isValid(productId)){
      throw { code: 400, message: "Invalid id"}
    }
  
    //aca nos retorna todos los datos del usuario
    //const product = await Products.findById(productId).populate('user') // populate nos regresa tambien datos del usuario
    
    //aca le decimos que no queremos que nos retorne el password del usuario
    //const product = await Products.findById(productId).populate({
    const product = await Products.findOne({
      _id: productId,
      user: req.session.userId,
    }).populate({
      path: 'user',
      select: {
        password: 0,
        __v: 0
      }
    })

    if (product) {
      res.send({ data: product });
    } else {
      res.status(404).send({});
    }
  }catch(error:any){
    console.log(error)
    const statusCode:number = error.code || 500

    res.status(statusCode).send(error.message) //no funciona el e.message
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try{
    const { userId } = req.session
    
    //anterior
    //const { name, year, description, price, user } = req.body;
    const { name, year, description, price } = req.body;

    if(!Types.ObjectId.isValid(userId)){
      throw { code: 400, message: "Invalid id"}
    }
    
    const product = await Products.create({
      name,
      year,
      description,
      price,
      user: userId, 
    })

    res.send(product)
  }catch(error: any){
    console.log(error)
    const statusCode:number = error.code || 500

    res.status(statusCode).send(error.message) //no funciona el e.message
  }
};

export const updateProduct = async (req: Request, res: Response): Promise <void> => {
  try{
    const id: string =  req.params.productId

    //if(!Types.ObjectId.isValid(id)){
      //throw { code: 400, message: "Invalid id"}
    //}

    const { name, year, description, price } = req.body

    //const updateProduct = await Products.findByIdAndUpdate(id, {
    //para que solo el usuario que creo el producto pueda actualizarlo
    const updateProduct = await Products.findOneAndUpdate({
      _id: id,
      user: req.session.userId,
    }, {  
      name, 
      year, 
      description, 
      price, 
      user: req.session.userId
    })

    if (updateProduct) {
      res.send({ data: "Ok" });
    } else {
      res.status(404).send({});
    }
  }catch(error: any){
    console.log(error)
    const statusCode:number = error.code || 500

    res.status(statusCode).send(error.message) //no funciona el e.message
  }
};

export const partialUpdateProduct = async (req: Request, res: Response): Promise <void> => {
  try{
    const productId = req.params.productId

    //if(!Types.ObjectId.isValid(productId)){
      //throw { code: 400, message: "Invalid id"}
    //}

    const { name, year, description, price } = req.body;
    
    //const product = await Products.findByIdAndUpdate(productId)
    const product = await Products.findOne({
      _id: productId,
      user: req.session.userId
    })
  
    if (product) {
      product.name = name || product.name
      product.year = year || product.year
      product.price = price || product.price
      product.description = description || product.description
      //product.user = user || product.user
  
      await product.save()
  
      res.send({ data: product });
    } else {
      res.status(404).send({});
    }
  }catch(error: any){
    console.log(error)
    const statusCode:number = error.code || 500

    res.status(statusCode).send(error.message) //no funciona el e.message
  }
};

export const updateProductAndNotify = async (req: Request, res: Response): Promise <void> => {
  try{
    const productId = req.params.productId;

    if(!Types.ObjectId.isValid(productId)){
      throw { code: 400, message: "Invalid id"}
    }

    const { client, data } = req.body;
    //const { name, year, description, price, user}= data;
    const { name, year, description, price }= data;

    //if(!Types.ObjectId.isValid(user)){
      //throw { code: 400, message: "Invalid id"}
    //}
    
    //const product = await Products.findById(productId)
    const product = await Products.findOne({
      _id: productId,
      user: req.session.userId
    })

    if (product) {
      product.name = name || product.name
      product.year = year || product.year
      product.price = price || product.price
      product.description = description || product.description
      //product.user = user || product.user

      await product.save()
  
      res.send({ data: product, message: `Email sent to ${client}` });
    } else {
      res.status(404).send({});
    }
  }catch(error: any){
    console.log(error)
    const statusCode:number = error.code || 500

    res.status(statusCode).send(error.message) //no funciona el e.message
  }
};

export const deleteProductById = async (req: Request, res: Response): Promise <void> => {
  try{
    const productId: string = req.params.productId

    //if(!Types.ObjectId.isValid(productId)){
      //throw { code: 400, message: "Invalid id"}
    //}

    //const deleted = await Products.deleteOne({_id: productId})
    const deleted = await Products.deleteOne({
      _id: productId,
      user: req.session.userId
    })
    
    if (deleted.deletedCount > 0) {
      res.send({});
    } else {
      res.status(404).send({});
    }
  }catch(error: any){
    console.log(error)
    const statusCode:number = error.code || 500

    res.status(statusCode).send(error.message) //no funciona el e.message
  }
};
