import getFeaturesByIdTransformer from "./getFeaturesByIdTransformer";
import { TransformedFeatureItem } from "../types";

describe("getFeaturesByIdTransformer tests", () => {
  const allFeaturesMockData = [
    {
      id: "test-feature",
      description: "test-feature desc",
      enabled: false,
      users: ["contactId", "contactTest", "userid"],
      groups: [],
    },
    {
      id: "test-feature-2",
      description: "",
      enabled: false,
      users: ["userid"],
      groups: [
        {
          Name: "groupid",
          RolloutPercentage: 100,
        },
      ],
    },
  ];
  test("getFeaturesByIdTransformer transformer can filter by an user ID from a list of returned features data", () => {
    const mockOutputByFeaturesByUserId: TransformedFeatureItem[] = [
      {
        id: "test-feature",
        description: "test-feature desc",
        enabled: false,
      },
    ];

    const actual = getFeaturesByIdTransformer(allFeaturesMockData, "contactId");
    expect(actual).toEqual(mockOutputByFeaturesByUserId);
  });

  test("getFeaturesByIdTransformer transformer can filter by an group ID from a list of returned features data", () => {
    const mockOutputByFeaturesByGroupId: TransformedFeatureItem[] = [
      {
        id: "test-feature-2",
        description: "",
        enabled: false,
      },
    ];

    const actual = getFeaturesByIdTransformer(allFeaturesMockData, "groupid");
    expect(actual).toEqual(mockOutputByFeaturesByGroupId);
  });
});
