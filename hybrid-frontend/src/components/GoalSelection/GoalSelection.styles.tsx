import { makeStyles } from '@material-ui/core/styles';

export const ELEVATION = 3;

export const useStyles = makeStyles<{}, { isSelected?: boolean }>({
  container: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textTransform: 'uppercase',
  },
  goalBox: {
    padding: '2rem',
    textAlign: 'center',
    cursor: (props) => (props.isSelected ? 'default' : 'pointer'),
    margin: '0 10px',
  },
  selectButton: {
    width: '100%',
  },
});
