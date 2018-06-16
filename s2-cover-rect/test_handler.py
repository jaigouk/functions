import unittest
import json
from io import StringIO

from handler import cover_rect

class HandlerTests(unittest.TestCase):
    def test_cover_rect(self):
        expected = 109193
        io = StringIO(cover_rect(3, 4, 34, 32))
        got = json.load(io)
        self.assertEqual(got["total"], expected)
