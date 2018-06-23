import unittest
import json
from handler import cover_rect
from handler import handle


class HandlerTests(unittest.TestCase):
    def test_cover_rect(self):
        expected = 109193
        got = cover_rect(3, 4, 34, 32)
        self.assertEqual(got["total"], expected)

    def test_handle(self):
        expected = 109193
        req = '{"coordinates": "3, 4, 34, 32"}'
        res = json.loads(handle(req))
        self.assertEqual(res["total"], expected)

    def test_handle_failure_for_short_coords(self):
        req = '{"coordinates": "4, 34, 32"}'
        with self.assertRaises(SystemExit) as cm:
            handle(req)
        the_exception = cm.exception
        print(the_exception.code)
        self.assertEqual(the_exception.code, 'need 4 numbers\n')

    def test_handle_failure_for_bad_req_structure(self):
        req = '{"nums": "4, 4", "point2": "34, 32"}'
        with self.assertRaises(SystemExit) as cm2:
            handle(req)
        the_exception = cm2.exception
        print(the_exception.code)
        self.assertEqual(the_exception.code, "coordinates can't be blank\n")
