/* custom atoms */
import Button, { ButtonProps } from './Button';

export { default as Icon } from './Icon';

export type { ButtonProps };

export { Button };

export { default as Spacer } from './Spacer';
export { Divider } from './Spacer';
export { default as Switcher } from './Switcher';
export { default as Radio } from './Radio';
export { default as Checkbox } from './Checkbox';
export { default as Typography } from './Typography';
export { default as Slider } from './Slider';
export { default as ProgressBar } from './ProgressBar';
export { default as ChartIndicator } from './ChartIndicator';

/* material-ui atoms */
export {
  AppBar,
  Box,
  Card,
  colors,
  CircularProgress,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Paper,
  Select,
  TextField,
  Toolbar,
  useTheme,
  makeStyles,
  createStyles,
  ThemeProvider,
} from '@material-ui/core';

/* material-ui atoms - types */
export type { Theme } from '@material-ui/core';

// At some point we might need to create an Icon wrapper as an atom
// that dynamically imports each icon by a given name like <Icon name"menu" />
export { default as MenuIcon } from '@material-ui/icons/Menu';
export { default as CheckCircleIcon } from '@material-ui/icons/CheckCircle';
