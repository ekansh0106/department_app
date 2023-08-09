#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created on Tue Apr 12, 2022 11:30:34

@author: ekansh
"""

# Standard Library
import datetime
from datetime import date
import json
from flask import send_file
from flask import request, jsonify
from flask_httpauth import HTTPBasicAuth
from flask import Blueprint,render_template,redirect,url_for,session
from werkzeug.security import generate_password_hash, check_password_hash


# User Defined Library
from .models import App
from .extensions import db


api_blueprint = Blueprint('main', __name__)
auth = HTTPBasicAuth()

departments = [{"deptA":[{"username": "deptA","password": "deptA"}],
         "deptB":[{"username": "deptB","password": "deptB"}],
         "deptC":[{"username": "deptC","password": "deptC"}]}]

users = {
    "deptA": generate_password_hash("deptA"),
    "deptB": generate_password_hash("deptB"),
    "deptC": generate_password_hash("deptC"),
}

@auth.verify_password
def verify_password(username, password):
    if username in users and \
                        check_password_hash(users.get(username), password):
                    return username


# this api endpoint can only be accessed if request has content-type as json
@api_blueprint.route("/login/", methods=["POST","GET"])
# @auth.login_required
def login():
    data = request.json
    for i in [cred for i in departments for k,v in i.items() if data["select"]==k for cred in v]:
        if data["username"]== i["username"]:
            if data["password"]==i["password"]:
                print("data",{'username': data["username"], 'password': data["password"], 'dept': data["select"]})
                return {'username': data["username"], 'password': data["password"], 'dept': data["select"]}
            else:
                return {"error":"Incorrect password"}
    else:
        return {"error":"Incorrect username"}
        
        
@api_blueprint.route("/devices/", methods=["POST","GET"])
@auth.login_required
def get_devices():
    add_device = request.json
    if add_device:
        params = add_device['content']
        if App.query.filter_by(device_name=params['device_name']).first() is not None:
            return jsonify({"error":"Device name exists"})
        else:
            device = App(device_name=params['device_name'],device_type=params['device_type'],
                    total_cycles=params['total_cycles'],cycles_left=params['cycles_left'])
            db.session.add(device)
            db.session.commit()
    data=App.query.all()
    return jsonify({"success":data})


@api_blueprint.route("/del-devices/", methods=["POST","GET"])
@auth.login_required
def delete_devices():
    del_device = request.json
    if del_device:
        params = del_device['content']
        for param in params:
            device = App.query.filter_by(device_name=param['device_name']).first()
            db.session.delete(device)
            db.session.commit()
    data=App.query.all()
    return jsonify({"success":data})

@api_blueprint.route("/devices-B/", methods=["POST","GET"])
@auth.login_required
def get_devicesB():
    
    data=App.query.filter_by(current_location="B").all()
    return jsonify({"success":data})

@api_blueprint.route("/forward-devices/", methods=["POST","GET"])
@auth.login_required
def forward_devices():
    forward =request.json
    if forward:
        params = forward['content']
        for param in params:
            device = App.query.filter_by(device_name=param).first()
            device.current_location="C"
            db.session.commit()
    data=App.query.filter_by(current_location="B").all()
    return jsonify({"success":data})

@api_blueprint.route("/devices-C/", methods=["POST","GET"])
@auth.login_required
def get_devicesC():
    data=App.query.filter_by(current_location="C").all()
    return jsonify({"success":data})

@api_blueprint.route("/clear-devices/", methods=["POST","GET"])
@auth.login_required
def clear_devices():
    forward =request.json
    if forward:
        params = forward['content']
        for param in params:
            device = App.query.filter_by(device_name=param).first()
            device.current_location="B"
            device.cycles_left=device.cycles_left-1
            db.session.commit()
    data=App.query.filter_by(current_location="C").all()
    return jsonify({"success":data})