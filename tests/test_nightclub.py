import unittest
import json
from test_utils import *


class TestExample(unittest.TestCase):
    base_url = 'http://localhost:5000'


    def test_list_nightclubs(self):
        expected = 4 #number of rows
        actual = get_rest_call(self, 'http://localhost:5000/NightClub')
        self.assertEqual(expected, len(actual))