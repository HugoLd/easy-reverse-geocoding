import { getCountry, getUsState } from "easy-reverse-geocoding";
import countriesDataset from "./countries-dataset.json" assert { type: "json" };
import usStatesDataset from "./us-states-dataset.json" assert { type: "json" };

function testPlaces(testName, dataset, func) {
  const errors = dataset
    .map((testingValue) => {
      return {
        expected: testingValue.countryCode,
        actual: func(testingValue.latitude, testingValue.longitude)?.code,
      };
    })
    .map((res) => {
      return res;
    })
    .filter((resultValue) => resultValue.expected !== resultValue.actual);
  if (errors.length) {
    throw new Error(
      testName +
        errors.map(
          (error) =>
            "\nExpected " + error.expected + " to equal " + error.actual
        )
    );
  }
}

testPlaces("Testing countries ", countriesDataset, getCountry);
testPlaces("Testing US states ", usStatesDataset, getUsState);
