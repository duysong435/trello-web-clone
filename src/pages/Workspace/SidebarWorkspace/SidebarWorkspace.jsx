import Box from '@mui/material/Box'
import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { SvgIcon } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import AddIcon from '@mui/icons-material/Add'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import Avatar from '@mui/material/Avatar'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ListSubheader from '@mui/material/ListSubheader'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import TableChartIcon from '@mui/icons-material/TableChart'
const drawerWidth = 260
const CustomListItemButton = styled(ListItemButton)({
  height: '32px',
  padding: '0 0 0 16px'
})
const CustomListItemIcon = styled(ListItemIcon)({
  minWidth: '32px', // Đảm bảo kích thước icon container
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  //   ...theme.mixins.toolbar,
  justifyContent: 'space-between'
}))

const CustomAddIcon = styled(AddIcon)(({ theme }) => ({
  marginRight: '3px',
  padding: '3px',
  color: theme.palette.action.active,
  '&:hover': {
    backgroundColor: '#d6d6d6',
    borderRadius: '3px'
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

export default function SidebarWorkspace() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  return (
    <Box sx={{ display: 'flex', position: 'relative', height: '100%' }}>
      <Box sx={{ display: open ? 'none' : 'block', backgroundColor: '#d6d6d6', width: '16px', height: '100%', position: 'relative' }}>
        <IconButton aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2, ...(open && { display: 'none' }) }}>
          <KeyboardArrowRightIcon color="action" sx={{ backgroundColor: '#d6d6d6', borderRadius: '50%', border: '1px solid #b1b4b9', marginLeft: '6px', marginTop: '6px' }} />
        </IconButton>
      </Box>
      <Drawer
        sx={{
          display: open ? 'block' : 'none',
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            position: 'relative',
            width: drawerWidth,
            boxSizing: 'border-box',
            height: '100%'
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar variant="rounded" sx={{ margin: '12px 8px' }}>
              <SvgIcon component={TrelloIcon}></SvgIcon>
            </Avatar>
            <Box>
              <Typography variant="subtitle2">Trello Workspace</Typography>
              <Typography variant="caption">Free</Typography>
            </Box>
          </Box>
          <IconButton onClick={handleDrawerClose}>{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <CustomListItemButton>
              <CustomListItemIcon>
                <SvgIcon component={TrelloIcon} sx={{ fontSize: '16px' }} />
              </CustomListItemIcon>
              <ListItemText primary={'Board'} />
            </CustomListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <CustomListItemButton>
              <CustomListItemIcon>
                <PermIdentityOutlinedIcon sx={{ fontSize: '16px' }} />
              </CustomListItemIcon>
              <ListItemText primary={'Member'} />
              <CustomAddIcon />
            </CustomListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <CustomListItemButton>
              <CustomListItemIcon>
                <SettingsOutlinedIcon sx={{ fontSize: '16px' }} />
              </CustomListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" sx={{ fontWeight: '500' }}>
                    Workspace setting
                  </Typography>
                }
              />
            </CustomListItemButton>
          </ListItem>
        </List>
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader" sx={{ color: 'rgba(0, 0, 0, 0.85)', fontWeight: '500' }}>
              Workspace views
            </ListSubheader>
          }
        >
          <ListItem disablePadding>
            <CustomListItemButton>
              <CustomListItemIcon>
                <TableChartIcon sx={{ fontSize: '16px' }} />
              </CustomListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    Table
                  </Typography>
                }
              />
            </CustomListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <CustomListItemButton>
              <CustomListItemIcon>
                <CalendarMonthIcon sx={{ fontSize: '16px' }} />
              </CustomListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    Calendar
                  </Typography>
                }
              />
            </CustomListItemButton>
          </ListItem>
        </List>
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader" sx={{ color: 'rgba(0, 0, 0, 0.85)', fontWeight: '500' }}>
              Your Board
            </ListSubheader>
          }
        ></List>
      </Drawer>
      {/* <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
          Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Odio morbi quis
          commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
          proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
          ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare
          suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
          senectus et. Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere
          sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Main> */}
    </Box>
  )
}
