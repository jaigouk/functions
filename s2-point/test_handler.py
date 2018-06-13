import unittest
from handler import *

class HandlerTests(unittest.TestCase):
  def test_hello(self):
    expected = -1
    got = add(3, 4)
    self.assertEqual(got, expected)