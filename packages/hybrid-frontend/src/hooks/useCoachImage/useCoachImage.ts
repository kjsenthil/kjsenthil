import { graphql, useStaticQuery } from 'gatsby';

const images = graphql`
  query CoachImage {
    coach: file(relativePath: { eq: "coach.png" }) {
      childImageSharp {
        fixed(width: 100, height: 153) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    }
  }
`;
const useCoachImage = () => useStaticQuery(images);

export default useCoachImage;
