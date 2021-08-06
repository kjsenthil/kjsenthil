import { TransformedFeatureItem } from "../types";

const getAllFeaturesTransformer = (data: string): TransformedFeatureItem[] => {
  const featureToggles: TransformedFeatureItem[] = [];

  const dataAsJson = JSON.parse(data);
  dataAsJson.items.forEach((featureToggle) => {
    const toggleDetails =
      typeof featureToggle.value === "string"
        ? JSON.parse(featureToggle.value)
        : featureToggle.value;

    const userFilter =
      toggleDetails?.conditions?.client_filters.find(
        (filterItem) => filterItem.name === "Microsoft.Targeting"
      ) || null;

    featureToggles.push({
      id: toggleDetails?.id || "",
      description: toggleDetails?.description || "",
      enabled: toggleDetails?.enabled || false,
      users: userFilter?.parameters?.Audience?.Users || [],
      groups: userFilter?.parameters?.Audience?.Groups || [],
    });
  });
  return featureToggles;
};

export default getAllFeaturesTransformer;
