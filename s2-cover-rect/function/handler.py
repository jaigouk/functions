import pywraps2 as s2
import json, os, sys
from os.path import join, dirname

from io import StringIO

def handle(req):
    try:
        payload = json.loads(req.rstrip())
    except:
        return sys.exit("bad json request\n")

    try:
        payload["coordinates"]
    except:
        return sys.exit("coordinates can't be blank\n")

    if payload["coordinates"] == "":
        return sys.exit("coordinates can't be blank\n")

    coords = payload["coordinates"].split(",")
    if len(coords) != 4:
        return sys.exit("need 4 numbers\n")

    lat1, long1, lat2, long2 = coords
    res = cover_rect(float(lat1), float(long1), float(lat2), float(long2))
    return json.dumps(res)


def cover_rect(lat1, long1, lat2, long2):
    # create a rect in !!!!!
    region_rect = s2.S2LatLngRect(
        s2.S2LatLng.FromDegrees(lat1, long1),
        s2.S2LatLng.FromDegrees(lat2, long2))

    # ask s2 to create a cover of this rect
    coverer = s2.S2RegionCoverer()
    coverer.set_min_level(10)
    coverer.set_max_level(30)
    coverer.set_max_cells(60)
    covering = coverer.GetCovering(region_rect)
    res = [c.ToToken() for c in covering]

    return {"total": len(res), "cellIDs": res}