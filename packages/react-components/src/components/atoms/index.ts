/* custom atoms */
import Button, { ButtonProps } from './Button';
import ChartDotIndicator, { ChartDotIndicatorProps } from './ChartDotIndicator';
import ChartIndicator, { ChartIndicatorProps } from './ChartIndicator';
import ChartOuterBorder, { ChartOuterBorderProps } from './ChartOuterBorder';
import LinearProgress, { LinearProgressProps } from './LinearProgress';
import ProgressBar, { ProgressBarProps } from './ProgressBar';
import Typography, { TypographyProps, typographyCss } from './Typography';
import TextField, {
  FormattedTextFieldControlledProps,
  FormattedTextFieldUncontrolledProps,
  TextFieldProps,
} from './TextField';
import { TooltipProps } from './Tooltip';
import { SpacerProps } from './Spacer/Spacer';
import { IconProps } from './Icon';
import { PillProps } from './Button/Pill/Pill';
import { LinkProps } from './Link';
import { SliderProps } from './Slider';

export {
  Button,
  LinearProgress,
  TextField,
  Typography,
  ChartDotIndicator,
  ChartIndicator,
  ChartOuterBorder,
  ProgressBar,
  typographyCss,
};

export type {
  ButtonProps,
  ChartDotIndicatorProps,
  ChartIndicatorProps,
  ChartOuterBorderProps,
  FormattedTextFieldControlledProps,
  FormattedTextFieldUncontrolledProps,
  IconProps,
  LinearProgressProps,
  LinkProps,
  PillProps,
  ProgressBarProps,
  SpacerProps,
  TextFieldProps,
  TooltipProps,
  TypographyProps,
  SliderProps,
};

export { default as Pill } from './Button/Pill';
export { default as Spacer } from './Spacer';
export { Divider } from './Spacer';
export { default as Icon } from './Icon';
export { default as Switcher } from './Switcher';
export { default as Radio } from './Radio';
export { default as Checkbox } from './Checkbox';
export { default as Slider } from './Slider';
export { default as Tooltip } from './Tooltip';
export { default as Link } from './Link';
export { default as NumberedProgress } from './NumberedProgress';
export { FormattedTextFieldControlled, FormattedTextFieldUncontrolled } from './TextField';

/* material-ui atoms */
export {
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  AppBar,
  Box,
  ButtonBase,
  Card,
  colors,
  CardActionArea,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Grid,
  Hidden,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
  InputLabel,
  FormControl,
  Menu,
  MenuItem,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Paper,
  Select,
  Tab,
  Tabs,
  Toolbar,
  Drawer,
  SwipeableDrawer,
  useTheme,
  makeStyles,
  createStyles,
  ThemeProvider,
  useMediaQuery,
} from '@material-ui/core';

export { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

/* material-ui atoms - types */
export type {
  BoxProps,
  ButtonBaseProps,
  CardProps,
  DialogProps,
  FormControlProps,
  Theme,
  TabProps,
  TabsProps,
  ToolbarProps,
} from '@material-ui/core';

export type { ToggleButtonProps, ToggleButtonGroupProps } from '@material-ui/lab';

// At some point we might need to create an Icon wrapper as an atom
// that dynamically imports each icon by a given name like <Icon name"menu" />
export { default as ClearIcon } from '@material-ui/icons/Clear';
export { default as MenuIcon } from '@material-ui/icons/Menu';
export { default as CheckCircleIcon } from '@material-ui/icons/CheckCircle';
