// Based on : https://github.com/totemstech/country-reverse-geocoding
import countries from "./countries.json";
import usStates from "./us-states.json";
import { PlaceSearchResult } from "./place-search-result";

/**
 * Get country information from coordinates
 * @param lat number latitude
 * @param lng number longitude
 * @return information about a country, null if not in a country
 */
export function getCountry(lat: number, lng: number): PlaceSearchResult | null {
  return getPlace(lat, lng, countries);
}

/**
 * Get US State information from coordinates
 * @param lat number latitude
 * @param lng number longitude
 * @return information about a US state, null if not in a state
 */
export function getUsState(lat: number, lng: number): PlaceSearchResult | null {
  return getPlace(lat, lng, usStates);
}

/**
 * Find in which place is contained the point
 *
 * @param lat the latitude
 * @param lng the longitude
 * @param dataset list of places that can contain the point
 * @return the place properties
 */
function getPlace(
  lat: number,
  lng: number,
  dataset: Place[]
): PlaceSearchResult | null {
  const point = [lng, lat];
  let i = 0;
  let found = false;
  do {
    const country = dataset[i];
    if (country.geometry.type === "Polygon") {
      found = findPointInPolygon(
        country.geometry.coordinates[0] as number[][],
        point
      );
    } else if (country.geometry.type === "MultiPolygon") {
      let j = 0;
      do {
        found = findPointInPolygon(
          country.geometry.coordinates[j][0] as number[][],
          point
        );
        j++;
      } while (j < country.geometry.coordinates.length && !found);
    }
    i++;
  } while (i < dataset.length && !found);

  if (found) {
    return {
      code: dataset[i - 1].id,
      name: dataset[i - 1].properties.name,
    };
  } else {
    return null;
  }
}

/**
 * Checks if a point is contained in a polygon
 * (based on the Jordan curve theorem), for more info:
 * http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
 * @param polygon array a series of the polygon's coordinates
 * @param point object representing the point's coordinates
 * @return boolean true if the point lies within the polygon, false otherwise
 */
function findPointInPolygon(polygon: number[][], point: number[]): boolean {
  let c = false;
  let i = 0;
  let j = 0;

  for (i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    if (
      polygon[i][1] > point[1] != polygon[j][1] > point[1] &&
      point[0] <
        ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1])) /
          (polygon[j][1] - polygon[i][1]) +
          polygon[i][0]
    ) {
      c = !c;
    }
  }
  return c;
}
