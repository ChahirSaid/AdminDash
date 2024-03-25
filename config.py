import os


class Config:
    SECRET_KEY = 'SuperAdmin'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///admindash.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
