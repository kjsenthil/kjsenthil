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

/**
 * https://styled-components.com/docs/basics#styling-any-component
 */
export interface StyleableComponent {
  className?: string;
}
