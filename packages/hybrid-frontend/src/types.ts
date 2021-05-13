export interface ChildImage {
  childImageSharp: {
    fluid: {
      aspectRatio: number;
      src: string;
      srcSet: string;
      sizes: string;
    };
  };
}
