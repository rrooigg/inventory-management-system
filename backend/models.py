from sqlalchemy import Column, ForeignKey, Integer, String
from database import Base

class Supplier(Base):
  __tablename__= 'suppliers'

  id= Column(Integer, primary_key=True)
  company_name= Column(String, nullable=False, index=True)
  phone_number= Column(String, nullable=False)

class Product(Base):
  __tablename__= 'products'

  id= Column(Integer, primary_key=True)
  name= Column(String, index=True)
  in_stock= Column(Integer, nullable=False)
  sold= Column(Integer, nullable=False)
  unit_price= Column(Integer, nullable=False)
  supplier= Column(Integer, ForeignKey("suppliers.id"), index=True)