import { Request, Response, response } from 'express';
//import { Types } from "mongoose"
import bcrypt from "bcrypt"
import { mongo, Types } from "mongoose"

import Users from '../../db/schemas/user';
import Products from '../../db/schemas/product';
//import { User } from '../../data/users';
import jwt from "jsonwebtoken"

export const getUsers = async (req: Request, res: Response): Promise <void> => {
  //const users = await Users.find().select("_id email") //con el select decimos que campos queremos que nos retone
  //pero podemos decirle que no queremos que nos retorne
  const users = await Users.find().select({ password: 0, __v: 0})
  res.send(users)
};

export const getUserById = async (req: Request, res: Response): Promise <void> => {
  try{
    const { userId } = req.params;

    if(!Types.ObjectId.isValid(userId)){
      throw { code: 400, message: "Invalid id"}
    }

    //Users.findById(Types.ObjectId(userId)) para cuando se haga filtrado por ids
    const user = await Users.findById(userId).select({ password: 0, __v: 0})

    if(user){
      res.send(user)
    }else{
      res.status(404).send({})
    }
  }catch(error: any){
    console.log(error)
    const statusCode:number = error.code || 500

    res.status(statusCode).send(error.message) //no funciona el e.message
  }
};

export const deleteById = async (req: Request, res: Response): Promise <void> => {
  try{
    const { userId } = req.params

    if(!Types.ObjectId.isValid(userId)){
      throw { code: 400, message: "Invalid id"}
    }

    const userDelete = await Users.findByIdAndDelete(userId)

    if(userDelete){
      await Products.deleteMany({user: userDelete._id })
      res.send("ok")
    }else{
      res.status(404).send({})
    }

  }catch(error: any){
    console.log(error)
    const statusCode:number = error.code || 500

    res.status(statusCode).send(error.message) //no funciona el e.message
  }

}


export const createUser = async (req: Request, res: Response): Promise <void> => {
  try{
    const {email, first_name, last_name, avatar, password} = req.body

    const hash: string = await bcrypt.hash(password, 15) //longitud del hash que se desea generar

    const newUser = await Users.create({
      email, 
      first_name, 
      last_name, 
      avatar,
      password: hash,
    })

    res.send(newUser)
  }catch(err){
    if(err instanceof mongo.MongoError){
      res.status(400).send({ 
        code: err.code, 
        message: err.code === 11000 ? "Duplicated value" : "Error"
      })
      return 
    }
    res.status(500).send(err)
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try{
    const { email, password } = req.body

    const user = await Users.findOne({ email })

    if(!user){
      throw { code: 404, message: "User not found" }
    }

    const isOk:boolean = await bcrypt.compare(password, user.password)

    if(!isOk){
      throw { code: 401, message: "Invalid password"}
    }

    const expiresIn = 60 * 60

    //generamos token
    const token = jwt.sign({ 
                            userId: user._id, 
                            email: user.email }, 
                            process.env.JWT_SECRET!,
                            {
                              expiresIn: expiresIn,
                            })

    res.send({token, expiresIn })

  }catch(error: any){
    console.log(error)
    const statusCode:number = error.code || 500

    res.status(statusCode).send(error.message) //no funciona el e.message
  }
}
