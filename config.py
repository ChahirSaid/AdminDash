import os


class Config:
    SECRET_KEY = 'SuperAdmin'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///school.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
