/* custom atoms */
import Button, { ButtonProps } from './Button';
import ChartIndicator, { ChartIndicatorProps } from './ChartIndicator';
import LinearProgress, { LinearProgressProps } from './LinearProgress';
import ProgressBar, { ProgressBarProps } from './ProgressBar';
import Typography, { TypographyProps } from './Typography';
import TextField, {
  FormattedTextFieldControlledProps,
  FormattedTextFieldUncontrolledProps,
  TextFieldProps,
} from './TextField';
import { TooltipProps } from './Tooltip';
import { SpacerProps } from './Spacer/Spacer';
import { IconProps } from './Icon';
import { TabsProps, TabProps } from './Tabs';

export { Button, LinearProgress, TextField, Typography, ChartIndicator, ProgressBar };

export type {
  ButtonProps,
  ChartIndicatorProps,
  LinearProgressProps,
  TypographyProps,
  TextFieldProps,
  FormattedTextFieldControlledProps,
  FormattedTextFieldUncontrolledProps,
  TooltipProps,
  IconProps,
  SpacerProps,
  ProgressBarProps,
  TabsProps,
  TabProps,
};

export { default as Spacer } from './Spacer';
export { Divider } from './Spacer';
export { default as Icon } from './Icon';
export { default as Switcher } from './Switcher';
export { default as Radio } from './Radio';
export { default as Checkbox } from './Checkbox';
export { default as Slider } from './Slider';
export { default as Tooltip } from './Tooltip';
export { default as Link } from './Link';
export { FormattedTextFieldControlled, FormattedTextFieldUncontrolled } from './TextField';
export { Tabs, Tab } from './Tabs';

/* material-ui atoms */
export {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  AppBar,
  Box,
  Card,
  colors,
  CardActionArea,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Hidden,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Menu,
  MenuItem,
  RadioGroup,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Paper,
  Select,
  Toolbar,
  Drawer,
  SwipeableDrawer,
  useTheme,
  makeStyles,
  createStyles,
  ThemeProvider,
  useMediaQuery,
} from '@material-ui/core';

/* material-ui atoms - types */
export type { BoxProps, CardProps, Theme, ToolbarProps } from '@material-ui/core';

// At some point we might need to create an Icon wrapper as an atom
// that dynamically imports each icon by a given name like <Icon name"menu" />
export { default as MenuIcon } from '@material-ui/icons/Menu';
export { default as CheckCircleIcon } from '@material-ui/icons/CheckCircle';
