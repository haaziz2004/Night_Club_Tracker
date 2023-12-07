from flask import abort
from flask_restful import Resource

from flask_restful import request
from flask_restful import reqparse
import json
from .swen_344_db_utils import *

class NightClub(Resource):
    def get(self):
    # NOTE: No need to replicate code; use the util function!
       result = exec_get_all("SELECT * FROM NightClub ORDER BY id")
       return result
       
    def delete(self,id):
        sql = "DELETE from users WHERE id = %s "
        result2 = exec_commit(sql, (id,))

    def put(self):
        parser =reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('genre', type=str)
        parser.add_argument('location',type = str)
        parser.add_argument('yellowThreshold',type = str)
        parser.add_argument('max',type = str)
        parser.add_argument('id',type = str)

        args = parser.parse_args()
        name = args['name']
        genre = args['genre']
        location = args['location']
        yellowThreshold = int(args['yellowThreshold'])
        max = int(args['max'])
        id = int(args['id'])

        sql = """UPDATE NightClub SET name = %s, genre = %s, location = %s, yellowThreshold = %s, max = %s WHERE id = %s RETURNING name
        """       
        result = exec_insert_returning(sql, (name,genre,location,yellowThreshold,max,id,))
        return result
    
    def post(self):
        parser =reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('genre', type=str)
        parser.add_argument('location',type = str)
        parser.add_argument('yellowThreshold',type = int)
        parser.add_argument('max',type = int)

        args = parser.parse_args()
        name = args['name']
        genre = args['genre']
        location = args['location']
        yellowThreshold = int(args['yellowThreshold'])
        max = int(args['max'])

        sql = """INSERT into NightClub (name, genre, location, occupancy, yellowThreshold, max ) VALUES (%s,%s,%s,%s,%s,%s) RETURNING name""" 
        result = exec_insert_returning(sql, (name,genre,location,0,yellowThreshold,max,))
        return result    
    
class DeleteClub(Resource):
    def delete(self, id):
        sql = "DELETE from NightClub WHERE id = %s "
        result2 = exec_commit(sql, (id,))

class incrementOccupancy(Resource):
    def put(self):
        parser =reqparse.RequestParser()
        parser.add_argument('id', type=int)
        args = parser.parse_args()
        id = int(args['id'])
        sql = "SELECT occupancy FROM NightClub WHERE id = %s "
        current = exec_get_all(sql,(id,))
        new = int(current[0][0]) + 1
        sql = "SELECT max FROM NightClub WHERE id = %s "
        max = exec_get_all(sql,(id,))
        maxCap = int(max[0][0]) 

        if (new <= maxCap ):
            sql2 = """ UPDATE NightClub SET occupancy = %s WHERE id = %s RETURNING occupancy"""
            result = exec_insert_returning(sql2,(new,id,))
            return result
        else:
            abort(404)
        
class decrementOccupancy(Resource):
    def put(self):
        parser =reqparse.RequestParser()
        parser.add_argument('id', type=int)
        args = parser.parse_args()
        id = int(args['id'])
        sql = "SELECT occupancy FROM NightClub WHERE id = %s "
        current = exec_get_all(sql,(id,))
        new = int(current[0][0]) - 1
        if (new >= 0):
            sql2 = """ UPDATE NightClub SET occupancy = %s WHERE id = %s RETURNING occupancy"""
            result = exec_insert_returning(sql2,(new,id,))
            return result
        else:
            abort(404)




       
