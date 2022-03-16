import os

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://sql6476543:vmGVNm8xcF@sql6.freemysqlhosting.net/sql6476543'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

from Api import models
from Api import views
