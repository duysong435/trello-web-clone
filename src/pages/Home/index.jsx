import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { useConfirm } from 'material-ui-confirm';

import AddCardIcon from '@mui/icons-material/AddCard';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import AppBar from '~/components/AppBar/AppBoard';
import DashboardHome from './Dashboard/Dashboard';
import { useEffect } from 'react';
import { signInWithGoogle } from '~/redux/authSlice';

export default function HomePage() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <DashboardHome />
    </Container>
  );
}
