import { graphql, useStaticQuery } from 'gatsby';
import { AllAssets } from '../types';

const query = graphql`
  query Funds {
    allAsset {
      nodes {
        riskModel: taamodel
        sedol
        equityProportion
      }
    }
  }
`;

const useAllAssets = () => useStaticQuery<AllAssets>(query);

export default useAllAssets;
