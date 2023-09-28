import { Request, Response } from 'express';
import Prouducts from "../../db/schemas/product"
import Products from '../../db/schemas/product';

//import { products, Product } from '../../data/products';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  const itemsPerPage: number = 3;
  const page: number = parseInt(req.query.page as string);
  const start = (page - 1) * itemsPerPage;
  const total: number = await Products.count();
  const end: number = page * itemsPerPage;
  
  const products = await Products.find().skip(start).limit(itemsPerPage)

  res.send({
    page: page,
    per_page: itemsPerPage,
    total: total,
    total_pages: Math.ceil(total / itemsPerPage),
    data: products,
  });
};
/*
export const getProductById = (req: Request, res: Response): void => {
  const { productId } = req.params;
  const index: number = products.findIndex(
    (item) => item.id === parseInt(productId)
  );
  if (index !== -1) {
    res.send({ data: products[index] });
  } else {
    res.status(404).send({});
  }
};
*/
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, year, description, price, user } = req.body;
  const product = await Products.create({
    name,
    year,
    description,
    price,
    user,
  })

  res.send(product)
};
/*
export const updateProduct = (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.productId);
  const { name, year, color, pantone_value }: Product = req.body;
  const index: number = products.findIndex((item) => item.id === id);
  if (index !== -1) {
    products[index] = {
      id,
      name,
      year,
      color,
      pantone_value,
    };
    res.send({ data: products[index] });
  } else {
    res.status(404).send({});
  }
};

export const partialUpdateProduct = (req: Request, res: Response): void => {
  const productId: number = parseInt(req.params.productId);
  const { id, name, year, color, pantone_value }: Product = req.body;
  const index: number = products.findIndex((item) => item.id === productId);
  if (index !== -1) {
    const product = products[index];

    products[index] = {
      id: id || product.id,
      name: name || product.name,
      year: year || product.year,
      color: color || product.color,
      pantone_value: pantone_value || product.pantone_value,
    };

    res.send({ data: products[index] });
  } else {
    res.status(404).send({});
  }
};

export const updateProductAndNotify = (req: Request, res: Response): void => {
  const productId: number = parseInt(req.params.productId);
  const { client, data } = req.body;
  const { id, name, year, color, pantone_value }: Product = data;
  const index: number = products.findIndex((item) => item.id == productId);
  if (index !== -1) {
    const product = products[index];

    products[index] = {
      id: id || product.id,
      name: name || product.name,
      year: year || product.year,
      color: color || product.color,
      pantone_value: pantone_value || product.pantone_value,
    };

    res.send({ data: products[index], message: `Email sent to ${client}` });
  } else {
    res.status(404).send({});
  }
};

export const deleteProductById = (req: Request, res: Response): void => {
  const productId: number = parseInt(req.params.productId);
  const index: number = products.findIndex((item) => item.id === productId);
  if (index !== -1) {
    products.splice(index, 1);
    res.send({});
  } else {
    res.status(404).send({});
  }
};*/
