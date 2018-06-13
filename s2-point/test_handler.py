import unittest
from handler import *

class HandlerTests(unittest.TestCase):
    def test_cover_rect(self):
        expected = 109193
        # number of cellid
        got = len(cover_rect(3, 4, 34, 32))
        self.assertEqual(got, expected)
