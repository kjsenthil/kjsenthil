// eslint-disable-next-line import/no-extraneous-dependencies
import { screen } from '@tsw/test-util';

const isMostSpecificNodeContainingText = (textMatch: string | RegExp) => (content, node) => {
  const hasText = (elem: Element) => {
    if (elem.textContent) {
      if (typeof textMatch === 'string') {
        return elem.textContent === textMatch;
      }
      return textMatch.test(elem.textContent);
    }
    return false;
  };
  const nodeHasText = hasText(node as Element);
  const childrenDontHaveText = Array.from(node?.children || []).every(
    (child) => !hasText(child as Element)
  );
  return nodeHasText && childrenDontHaveText;
};

export function getByTextContent(textMatch: string | RegExp): HTMLElement {
  return screen.getByText(isMostSpecificNodeContainingText(textMatch));
}

export async function findByTextContent(textMatch: string | RegExp): Promise<HTMLElement> {
  return screen.findByText(isMostSpecificNodeContainingText(textMatch));
}

export function queryAllByTextContent(textMatch: string | RegExp): HTMLElement[] {
  return screen.queryAllByText(isMostSpecificNodeContainingText(textMatch));
}
