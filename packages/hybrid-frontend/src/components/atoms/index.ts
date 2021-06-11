/* custom atoms */
import Button, { ButtonProps } from './Button';
import ChartIndicator, { ChartIndicatorProps } from './ChartIndicator';
import Typography, { TypographyProps } from './Typography';
import TextField, {
  FormattedTextFieldControlledProps,
  FormattedTextFieldUncontrolledProps,
  TextFieldProps,
} from './TextField';

export { Button, TextField, Typography, ChartIndicator };

export type {
  ButtonProps,
  ChartIndicatorProps,
  TypographyProps,
  TextFieldProps,
  FormattedTextFieldControlledProps,
  FormattedTextFieldUncontrolledProps,
};

export { default as Spacer } from './Spacer';
export { Divider } from './Spacer';
export { default as Icon } from './Icon';
export { default as Switcher } from './Switcher';
export { default as Radio } from './Radio';
export { default as Checkbox } from './Checkbox';
export { default as Slider } from './Slider';
export { default as Tooltip } from './Tooltip';
export { default as ProgressBar } from './ProgressBar';
export { default as Link } from './Link';
export { FormattedTextFieldControlled, FormattedTextFieldUncontrolled } from './TextField';

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
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Menu,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Paper,
  Select,
  Toolbar,
  useTheme,
  makeStyles,
  createStyles,
  ThemeProvider,
  useMediaQuery,
} from '@material-ui/core';

/* material-ui atoms - types */
export type { Theme } from '@material-ui/core';

// At some point we might need to create an Icon wrapper as an atom
// that dynamically imports each icon by a given name like <Icon name"menu" />
export { default as MenuIcon } from '@material-ui/icons/Menu';
export { default as CheckCircleIcon } from '@material-ui/icons/CheckCircle';
