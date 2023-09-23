import { Request, Response, response } from 'express';
//import { Types } from "mongoose"
import bcrypt from "bcrypt"
import { mongo } from "mongoose"

import Users from '../../db/schemas/user';

export const getUsers = async (req: Request, res: Response): Promise <void> => {
  //const users = await Users.find().select("_id email") //con el select decimos que campos queremos que nos retone
  //pero podemos decirle que no queremos que nos retorne
  const users = await Users.find().select({ password: 0, __v: 0})
  res.send(users)
};

export const getUserById = async (req: Request, res: Response): Promise <void> => {
  const { userId } = req.params;

  //Users.findById(Types.ObjectId(userId)) para cuando se haga filtrado por ids
  const user = await Users.findById(userId).select({ password: 0, __v: 0})

  if(user){
    res.send(user)
  }else{
    res.status(404).send({})
  }
};


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