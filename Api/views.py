from flask import abort, redirect, render_template, url_for
from flask import jsonify
from flask import request

from Api import app
from .models import TodoList, TodoListSchema, db

todo_item_schema = TodoListSchema()
todo_list_schema = TodoListSchema(many=True)

@app.route('/')
def index():
    return render_template('index.html')


@app.route("/todo/api", methods=["POST"])
def add_item():

    if 'title' in request.form and 'desc' in request.form:
        title = request.form['title']
        desc = request.form['desc']
        todo_item = TodoList(title, desc)
        db.session.add(todo_item) 
        db.session.commit()
        result = todo_item_schema.dump(todo_item)
        return jsonify(result)
    return jsonify({'status':'OK'})


@app.route("/todo/api", methods=["GET"])
def get_todo_list():
    """endpoint to show all todo items"""
    result = TodoList.query.all()
    result = todo_list_schema.dump(result)
    return jsonify(result)


@app.route("/todo/api/<int:id>", methods=["GET"])
def get_todo_item(id):
    row = TodoList.query.filter_by(id=id).first()
    result = todo_item_schema.dump(row)
    return jsonify(result)
    
    # return abort(404)

@app.route("/todo/api/<id>", methods=["DELETE"])
def delete(id):

    row = TodoList.query.filter_by(id=id).first()

    db.session.delete(row)
    db.session.commit()
    # result = todo_item_schema.dump(row)
    return redirect(url_for('get_todo_list'))

@app.route("/todo/api/<id>", methods=["PUT"])
def Update(id):
    if 'title' in request.form and 'desc' in request.form:

        row = TodoList.query.filter_by(id=id).first()
        title = request.form['title']
        desc = request.form['desc']
        row.title = title
        row.desc = desc
        db.session.add(row) 
        db.session.commit()
        return redirect('/')
    row = TodoList.query.filter_by(id=id).first()
    return render_template('update.html',row=row )
