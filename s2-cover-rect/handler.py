import pywraps2 as s2
import requests, json, os, sys
from os.path import join, dirname
from dotenv import load_dotenv
from io import StringIO
import logging
log = logging.getLogger(__name__)
out_hdlr = logging.StreamHandler(sys.stdout)
out_hdlr.setFormatter(logging.Formatter('%(asctime)s %(message)s'))
out_hdlr.setLevel(logging.INFO)
log.addHandler(out_hdlr)
log.setLevel(logging.INFO)

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

MIN_LEVEL = int(os.getenv("MIN_LEVEL"))
MAX_LEVEL = int(os.getenv("MAX_LEVEL"))
MAX_CELLS = int(os.getenv("MAX_CELLS"))

def handle(req):
    log.info('Started s2-cover-rect with ' + req)
    try:
        payload = json.loads(req.rstrip())
    except:
        log.error("bad json request" + req)
        return sys.exit("bad json request\n")

    try:
        payload["coordinates"]
    except:
        log.error("coordinates can't be blank" + req)
        return sys.exit("coordinates can't be blank\n")

    if payload["coordinates"] == "":
        log.error("coordinates can't be blank" + req)
        return sys.exit("coordinates can't be blank\n")

    coords = payload["coordinates"].split(",")
    if len(coords) != 4:
        log.error("need 4 numbers" + req)
        return sys.exit("need 4 numbers\n")

    lat1, long1, lat2, long2 = coords
    res = cover_rect(float(lat1), float(long1), float(lat2), float(long2))
    log.info("successful")
    return res


def cover_rect(lat1, long1, lat2, long2):
    # create a rect in !!!!!
    region_rect = s2.S2LatLngRect(
        s2.S2LatLng.FromDegrees(lat1, long1),
        s2.S2LatLng.FromDegrees(lat2, long2))

    # ask s2 to create a cover of this rect
    coverer = s2.S2RegionCoverer()
    coverer.set_min_level(MIN_LEVEL)
    coverer.set_max_level(MAX_LEVEL)
    coverer.set_max_cells(60)
    covering = coverer.GetCovering(region_rect)
    res = [c.ToToken() for c in covering]
    return json.dumps({"total": len(res), "cellIDs": res})
