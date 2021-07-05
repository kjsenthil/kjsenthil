import { getAllFeaturesTransformer } from "./index";
import { FeatureToggle } from "../shared-code/types";

describe('Application Config transformer tests', () => {

  const singleFeatureAppConfig = `{
    "items": [
      {
        "etag": "testEtag",
        "key": "testFeature1",
        "label": "testLabel",
        "content_type": "testApplicationType",
        "value": "{\\"id\\":\\"test-feature\\",\\"description\\":\\"\\",\\"enabled\\":false,\\"conditions\\":{\\"client_filters\\":[]}}",
        "last_modified": "2021-01-01 00:00:00",
        "locked": false,
        "tags": ["testTag"]
      }]
  }`;
  const singleFeatureTransformed = new FeatureToggle("test-feature", "", false)

  const multiFeatureAppConfig = `{
    "items": [
      {
        "etag": "testEtag",
        "key": "testFeature1",
        "label": "testLabel",
        "content_type": "testApplicationType",
        "value": "{\\"id\\":\\"test-feature\\",\\"description\\":\\"\\",\\"enabled\\":false,\\"conditions\\":{\\"client_filters\\":[]}}",
        "last_modified": "2021-01-01 00:00:00",
        "locked": false,
        "tags": ["testTag"]
      },
      {
        "etag": "testEtag2",
        "key": "testFeature2",
        "label": "testLabel2",
        "content_type": "testApplicationType2",
        "value": "{\\"id\\":\\"test-feature2\\",\\"description\\":\\"\\",\\"enabled\\":true,\\"conditions\\":{\\"client_filters\\":[]}}",
        "last_modified": "2021-01-01 00:00:00",
        "locked": false,
        "tags": ["testTag2"]
      }
    ]
  }`;
  const multiFeatureTransformed = [
    new FeatureToggle('test-feature', '', false),
    new FeatureToggle('test-feature2', '', true)
  ]

  test('JSON transformer can translate app config json with single feature accurately', () => {
    const actual = getAllFeaturesTransformer(singleFeatureAppConfig)
    expect(actual).toEqual([singleFeatureTransformed])
  });

  test('JSON transformer can translate app config json with multiple features accurately', () => {
    const actual = getAllFeaturesTransformer(multiFeatureAppConfig)
    expect(actual).toEqual(multiFeatureTransformed)
  });
});
