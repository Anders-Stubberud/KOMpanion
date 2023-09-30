 function decodePolyline(polyline: string) {
    const coordinates = [];
    let index = 0;
    let lat = 0;
    let lng = 0;
  
    while (index < polyline.length) {
      let shift = 0;
      let result = 0;
      let byte;
  
      do {
        byte = polyline.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
  
      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;
  
      shift = 0;
      result = 0;
  
      do {
        byte = polyline.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
  
      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;
  
      coordinates.push([lng * 1e-5, lat * 1e-5]);
    }
  
    return coordinates;
}

export default decodePolyline;