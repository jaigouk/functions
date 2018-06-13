import pywraps2 as s2

def cover_rect(lat1, long1, lat2, long2):
    # create a rect in s2
    region_rect = s2.S2LatLngRect(
        s2.S2LatLng.FromDegrees(lat1, long1),
        s2.S2LatLng.FromDegrees(lat2, long2))

    # # ask s2 to create a cover of this rect
    coverer = s2.S2RegionCoverer()
    coverer.set_min_level(10)
    coverer.set_max_level(30)
    coverer.set_max_cells(60)
    covering = coverer.GetCovering(region_rect)
    # print([c.ToToken() for c in covering])

    return covering
