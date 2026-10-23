from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


from database import engine, DbSession, Base
import models

Base.metadata.create_all(bind=engine)

app= FastAPI()

class Supplier(BaseModel):
  company_name: str
  phone_number: str

class Product(BaseModel):
  in_stock: int
  sold: int
  unit_price: int


origins= [
  'http://localhost/5173',

]
app.add_middleware(
  CORSMiddleware,
  allow_credentials=True,
  allow_origins=origins,
  allow_headers=['*'],
  allow_methods=['*']

)

# supplier endpoints

# add supplier
@app.post('/suppliers')
def add_supplier(supplier: Supplier, db: DbSession):
  db_supplier= models.Supplier(
    company_name= supplier.company_name,
    phone_number= supplier.phone_number
  )
  if db_supplier:
    raise HTTPException(status_code=400, detail='Supplier already exists')

  db.add(db_supplier)
  db.commit()
  db.refresh(db_supplier)

  return db_supplier

# get all suppliers
@app.get('/suppliers')
def get_suppliers(db: DbSession):
  suppliers= db.query(models.Supplier).all()

  if not suppliers:
    raise HTTPException(status_code=404, detail='No supplier found')
  
  return suppliers
  

# update supplier
@app.put('/suppliers/{supplier_id}')
def update_supplier(supplier_id: int, supplier: Supplier, db: DbSession):
  db_supplier= db.query(models.Supplier).filter(models.Supplier.id == supplier_id).first()

  if not db_supplier:
    raise HTTPException(status_code=404, detail='Supplier not found')

  db_supplier.company_name= supplier.company_name
  db_supplier.phone_number= supplier.phone_number

  db.commit()
  db.refresh(db_supplier)

  return db_supplier
  

# delete supplier
@app.delete('/suppliers/{supplier_id}')
def delete_supplier(supplier_id: int, db: DbSession):
  db_supplier= db.query(models.Supplier).filter(models.Supplier.id == supplier_id).first()

  if not db_supplier:
    raise HTTPException(status_code=404, detail='Supplier not found')

  db.delete(db_supplier)
  db.commit()

  return {"message": "Supplier deleted successfully"}


# products endpoints
@app.post('/products')
def add_product(product: Product, db: DbSession):
  db_product= models.Product(
    in_stock= product.in_stock,
    sold= product.sold,
    unit_price= product.unit_price
  )
  if db_product:
    raise HTTPException(status_code=400, detail='Product already exists')

  db.add(db_product)
  db.commit()
  db.refresh(db_product)

  return db_product

# get all products
@app.get('/products')
def get_products(db: DbSession):
  products= db.query(models.Product).all()

  if not products:
    raise HTTPException(status_code=404, detail='No products found')
  
  return products
  

# update product
@app.put('/products/{product_id}')
def update_product(product_id: int, product: Product, db: DbSession):
  db_product= db.query(models.Product).filter(models.Product.id == product_id).first()

  if not db_product:
    raise HTTPException(status_code=404, detail='Product not found')

  db_product.in_stock= product.in_stock
  db_product.sold= product.sold
  db_product.unit_price= product.unit_price

  db.commit()
  db.refresh(db_product)

  return db_product
  

# delete product
@app.delete('/products/{product_id}')
def delete_product(product_id: int, db: DbSession):
  db_product= db.query(models.Product).filter(models.Product.id == product_id).first

  if not db_product:
    raise HTTPException(status_code=404, detail='Product not found')

  db.delete(db_product)
  db.commit()

  return {"message": "Product deleted successfully"}