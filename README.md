# Goal

This project is made to find country based on latitude/longitude data without making API calls.
Based on Polygons found in [an outdated/unmaintained project](https://github.com/totemstech/country-reverse-geocoding) .

*Dataset is not 100% accurate, known failure cases exist, especially near borders. But it should be enough for most needs.*

*Feel free to PR or request Polygons updated.*

## Installation

    yarn add easy-reverse-geocoding
    OR
    npm i easy-reverse-geocoding

## How to use ?


    import { getCountry } from  'easy-reverse-geocoding';
    import { getUsState } from  'easy-reverse-geocoding';
    import { PlaceSearchResult } from  'easy-reverse-geocoding';
    
    function searchUsState(lat:number,long:number):PlaceSearchResult|null{
	    return getUsState(lat,long);
    }
    function searchCountry(lat:number,long:number):PlaceSearchResult|null{
	    return getCountry(lat,long);
    }
    console.log(searchCountry(48.8566,2.3522)); // France
    console.log(searchUsState(40.7128,-74.006)); // New York
