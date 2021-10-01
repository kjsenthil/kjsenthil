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

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
