import { graphql, useStaticQuery } from 'gatsby';

const images = graphql`
  query CoachImage {
    coachPortrait: file(relativePath: { eq: "coachPortrait.png" }) {
      childImageSharp {
        fluid(maxWidth: 100, maxHeight: 153, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    coachIcon: file(relativePath: { eq: "coachIcon.png" }) {
      childImageSharp {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;

const useCoachImages = () => useStaticQuery(images);

export default useCoachImages;
