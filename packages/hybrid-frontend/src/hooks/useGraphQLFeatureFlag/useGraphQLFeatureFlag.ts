/* eslint-disable no-console */
import { graphql, useStaticQuery } from 'gatsby';
import { FeatureFlagItem } from '../../services/featureToggle';

interface QueryData {
  allFlagsJson: {
    nodes: Array<FeatureFlagItem>;
  };
}

const query = graphql`
  query FeatureFlags {
    allFlagsJson {
      nodes {
        name
        isEnabled
      }
    }
  }
`;

/**
 * Return whether a feature is enabled or not.
 */
export default function useGraphQLFeatureFlag(name: string): boolean {
  const data = useStaticQuery<QueryData>(query);

  if (!data) {
    console.error(
      '`useGraphQLFeatureFlag` could not retrieve any data from `useStaticQuery`. All feature flags are disabled. Make sure Gatsby has been setup correctly and a feature flag JSON file is available.'
    );

    return false;
  }

  const featureFlag = data.allFlagsJson.nodes.find((feature) => feature.name === name);

  if (featureFlag === undefined) {
    console.warn(
      `\`useGraphQLFeatureFlag\` could not find feature flag with name "${name}". Features involving this feature flag will be disabled.`
    );

    return false;
  }

  return featureFlag.isEnabled;
}
