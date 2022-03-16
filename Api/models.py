
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
# from flask_sqlalchemy import SQLAlchemy

from Api import app

db = SQLAlchemy(app)
ma = Marshmallow(app)


class TodoList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80))
    desc = db.Column(db.String(120))

    def __init__(self, title, desc):
        self.title = title
        self.desc = desc


class TodoListSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'desc')
        # model = TodoList

with app.app_context():
    db.create_all()


