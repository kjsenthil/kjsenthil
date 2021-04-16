/* custom atoms */
import Button, { ButtonProps } from './Button';

export { default as Icon } from './Icon';

export type { ButtonProps };

export { Button };

export { default as Spacer } from './Spacer';

/* material-ui atoms */
export {
  AppBar,
  Box,
  Card,
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
  Typography,
  Paper,
  Select,
  Slider,
  TextField,
  Toolbar,
} from '@material-ui/core';

// At some point we might need to create an Icon wrapper as an atom
// that dynamically imports each icon by a given name like <Icon name"menu" />
export { default as MenuIcon } from '@material-ui/icons/Menu';
export { default as CheckCircleIcon } from '@material-ui/icons/CheckCircle';
