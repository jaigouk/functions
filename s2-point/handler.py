import pywraps2 as s2
import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

MIN_LEVEL = int(os.getenv("MIN_LEVEL"))
MAX_LEVEL = int(os.getenv("MAX_LEVEL"))
MAX_CELLS = int(os.getenv("MAX_CELLS"))

def cover_rect(lat1, long1, lat2, long2):
    # create a rect in s2
    region_rect = s2.S2LatLngRect(
        s2.S2LatLng.FromDegrees(lat1, long1),
        s2.S2LatLng.FromDegrees(lat2, long2))

    # # ask s2 to create a cover of this rect
    coverer = s2.S2RegionCoverer()
    coverer.set_min_level(MIN_LEVEL)
    coverer.set_max_level(MAX_LEVEL)
    coverer.set_max_cells(60)
    covering = coverer.GetCovering(region_rect)
    # print([c.ToToken() for c in covering])

    return covering
