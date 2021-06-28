import { graphql, useStaticQuery } from 'gatsby';

const images = graphql`
  query AssetsImages {
    lifePlan: file(relativePath: { eq: "lifePlan.png" }) {
      childImageSharp {
        fluid(maxHeight: 525, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;
const useGoalImages = () => useStaticQuery(images);

export default useGoalImages;
