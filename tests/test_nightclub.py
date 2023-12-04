import unittest
import json
from test_utils import *


class TestExample(unittest.TestCase):
    base_url = 'http://localhost:5000'


    def test_list_nightclubs1(self): #called after testing delete 
        expected = 3 #number of rows
        actual = get_rest_call(self, 'http://localhost:5000/NightClub') 
        self.assertEqual(expected, len(actual))

    def test_edit_club2(self):
        name = "Club Curry"
        genre = "punk"
        location = "Space"
        yellowThreshold = 90
        max = 110
        id = 1 
        data = dict(name=name, genre = genre,location = location, yellowThreshold = yellowThreshold, max = max, id= id)
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        result = put_rest_call(self,'http://localhost:5000'+'/NightClub', jdata, hdr )
        expected = 'Club Curry'
        self.assertEqual(expected, result)

    def test_delete(self):
        id = '2'
        delete = delete_rest_call(self,'http://localhost:5000/Delete/2' )
        expected = 3 #number of rows
        actual = get_rest_call(self, 'http://localhost:5000/NightClub')
        self.assertEqual(expected, len(actual))

    def test_increment_occupancy(self):
        id = 1
        data = dict(id=id)
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        result = put_rest_call(self,'http://localhost:5000'+'/increment', jdata, hdr )
        self.assertEqual(1, result)

    def test_decrement_occupancy(self):
        id = 3
        data = dict(id=id)
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        result = put_rest_call(self,'http://localhost:5000'+'/increment', jdata, hdr )
        result = put_rest_call(self,'http://localhost:5000'+'/decrement', jdata, hdr )
        self.assertEqual(0, result)


