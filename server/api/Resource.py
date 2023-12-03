from flask_restful import Resource

from flask_restful import request
from flask_restful import reqparse
import json
from .swen_344_db_utils import *

class NightClub(Resource):
    def get(self):
    # NOTE: No need to replicate code; use the util function!
       result = exec_get_all("SELECT * FROM NightClub")
       return result
       
    def delete(self,id):
        sql = "DELETE from users WHERE id = %s "
        result2 = exec_commit(sql, (id,))

    def put(self):
        parser =reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('genre', type=str)
        parser.add_argument('location',type = str)
        parser.add_argument('occupancy',type = str)
        parser.add_argument('yellowThreshold',type = str)
        parser.add_argument('max',type = str)
        parser.add_argument('id',type = str)

        args = parser.parse_args()
        name = args['name']
        genre = args['genre']
        location = args['location']
        occupancy = int(args['occupany'])
        yellowThreshold = int(args['yellowThreshold'])
        max = int(args['max'])
        id = int(args['id'])

        sql = """ UPDATE NightClub SET name = %s, genre = %s, location = %s, occupancy = %s, yellowThreshold = %s, max = %s WHERE id = %s
        """       
        result = exec_insert_returning(sql, (name,genre,location,occupancy,yellowThreshold,max,id,))
        return result




       
