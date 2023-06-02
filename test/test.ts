import { getCountry, getUsState } from "../src/index";
import { describe, it } from "node:test";
import assert from "node:assert";

const countriesDataset = require("./countries-dataset.json");
const usStatesDataset = require("./us-states-dataset.json");

describe("Countries", () => {
  it("should work when using known working values dataset", () => {
    assert.ok(testPlaces(countriesDataset, getCountry));
  });
});

describe("US states", () => {
  it("should work when using known working values dataset", () => {
    assert.ok(testPlaces(usStatesDataset, getUsState));
  });
});

function testPlaces(dataset, func) {
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
      errors.map(
        (error) => "\nExpected " + error.expected + " to equal " + error.actual
      )
    );
  }
  return true;
}
