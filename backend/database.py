from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base

from fastapi import Depends
from typing import Annotated

import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL= os.getenv('DATABASE_URL')

engine= create_engine(DATABASE_URL)

SessionLocal= sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base= declarative_base()

def get_db():
  db= SessionLocal()
  try:
    yield db # delivers session to route
  finally:
    db.close() # closes db when connection ends

DbSession= Annotated[Session, Depends(get_db)]