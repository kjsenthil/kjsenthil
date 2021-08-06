import { FilterGroupItem, TransformedFeatureItem } from "../types";

const getFeaturesByIdTransformer = (
  data: TransformedFeatureItem[],
  id: string
): TransformedFeatureItem[] => {
  const featuresById =
    data?.filter(
      (featuresItem: TransformedFeatureItem) =>
        featuresItem?.users?.includes(id) ||
        featuresItem?.groups?.some(
          (groupItem: FilterGroupItem) => groupItem.Name === id
        ) ||
        false
    ) || [];

  const featuresByIdExcludingUsersGroups =
    featuresById?.map((featuresByIdItem: TransformedFeatureItem) => {
      const { users, groups, ...restOfProps } = featuresByIdItem;

      return restOfProps;
    }) || [];

  return featuresByIdExcludingUsersGroups;
};

export default getFeaturesByIdTransformer;
