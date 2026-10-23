from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware


from database import engine, DbSession, Base


app= FastAPI()

Base.metadata.create_all(bind=engine)

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
