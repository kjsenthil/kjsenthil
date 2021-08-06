import getAllFeaturesTransformer from "./getAllFeaturesTransformer";
import { TransformedFeatureItem } from "../types";

describe("getAllFeaturesTransformer tests", () => {
  test("JSON transformer can translate app config json with single feature and user filter accurately", () => {
    const userIdFeatureAppConfig = `{
      "items": [
        {
          "value": {
            "id": "test-feature",
            "description": "test-feature desc",
            "enabled": false,
            "conditions": {
              "client_filters": [
                {
                  "name": "Microsoft.Targeting",
                  "parameters": {
                    "Audience": {
                      "Users": [
                        "userId",
                        "userTest"
                      ],
                      "Groups": [],
                      "DefaultRolloutPercentage": "100"
                    }
                  }
                }
              ]
            }
          }
        }
      ]
    }`;

    const userIdFeatureTransFormed: TransformedFeatureItem[] = [
      {
        id: "test-feature",
        description: "test-feature desc",
        enabled: false,
        users: ["userId", "userTest"],
        groups: [],
      },
    ];

    const actual = getAllFeaturesTransformer(userIdFeatureAppConfig);
    expect(actual).toEqual(userIdFeatureTransFormed);
  });

  test("JSON transformer can translate app config json with single feature accurately", () => {
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
    const singleFeatureTransformed: TransformedFeatureItem[] = [
      {
        id: "test-feature",
        description: "",
        enabled: false,
        users: [],
        groups: [],
      },
    ];

    const actual = getAllFeaturesTransformer(singleFeatureAppConfig);
    expect(actual).toEqual(singleFeatureTransformed);
  });

  test("JSON transformer can translate app config json with multiple features accurately", () => {
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
    const multiFeatureTransformed: TransformedFeatureItem[] = [
      {
        id: "test-feature",
        description: "",
        enabled: false,
        users: [],
        groups: [],
      },
      {
        id: "test-feature2",
        description: "",
        enabled: true,
        users: [],
        groups: [],
      },
    ];

    const actual = getAllFeaturesTransformer(multiFeatureAppConfig);
    expect(actual).toEqual(multiFeatureTransformed);
  });
});
