// eslint-disable-next-line import/prefer-default-export
export interface GoalSelectionTile {
  name: string;
  iconSrc: string;

  disabled?: boolean;

  // If provided, will wrap the tile around a Gatsby link, allowing navigation
  // on click
  href?: string;
}
