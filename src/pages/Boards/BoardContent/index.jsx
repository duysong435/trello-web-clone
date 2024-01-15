import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

import { useState } from 'react'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import GroupIcon from '@mui/icons-material/Group'
import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{
      // backgroundColor: 'primary.main',
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      p: '10px 0'
    }}>
      <Box sx={{
        bgcolor: 'inherit',
        display: 'flex',
        width: '100%',
        height: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {/* Box column */}
        <Box sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          {/* Box column header*/}
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography
              fontSize={'1rem'}
              variant='h6'
              sx={{
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>Column Title</Typography>
            <Box>
              <Tooltip title='More options'>
                <ExpandMoreIcon
                  sx={{
                    color: 'text.primary', cursor: 'pointer'
                  }}
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu-colmun-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />
              </Tooltip>
              <Menu
                id="basic-menu-colmun-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Box column list card */}
          <Box sx={{
            p: '0 5px',
            m: '0 5px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(
            ${theme.trello.boardContentHeight} -
            ${theme.spacing(5)} -
            ${COLUMN_HEADER_HEIGHT} -
            ${COLUMN_FOOTER_HEIGHT}
            )`,
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ced0da'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#dfc2cf'
            }
          }}>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://avatars.githubusercontent.com/u/93369803?v=4"
                title="green iguana"
              />
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography >
                  Mern Stack
                </Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }} >
                <Button size="small" startIcon={<GroupIcon />}>20</Button>
                <Button size="small" startIcon={<CommentIcon />}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon />}>20</Button>
              </CardActions>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'

            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography >
                  Mern Stack
                </Typography>

              </CardContent>

            </Card><Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'

            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography >
                  Mern Stack
                </Typography>

              </CardContent>

            </Card><Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'

            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography >
                  Mern Stack
                </Typography>

              </CardContent>

            </Card><Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'

            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography >
                  Mern Stack
                </Typography>

              </CardContent>

            </Card><Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'

            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography >
                  Mern Stack
                </Typography>

              </CardContent>

            </Card><Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'

            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography >
                  Mern Stack
                </Typography>

              </CardContent>

            </Card><Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'

            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography >
                  Mern Stack
                </Typography>

              </CardContent>

            </Card><Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'

            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography >
                  Mern Stack
                </Typography>

              </CardContent>

            </Card><Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'

            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography >
                  Mern Stack
                </Typography>

              </CardContent>

            </Card><Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'

            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography >
                  Mern Stack
                </Typography>

              </CardContent>

            </Card><Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'

            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography >
                  Mern Stack
                </Typography>

              </CardContent>

            </Card><Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'

            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography >
                  Mern Stack
                </Typography>

              </CardContent>

            </Card><Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'

            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography >
                  Mern Stack
                </Typography>

              </CardContent>

            </Card><Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'

            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography >
                  Mern Stack
                </Typography>

              </CardContent>

            </Card><Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'

            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography >
                  Mern Stack
                </Typography>

              </CardContent>

            </Card><Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'

            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography >
                  Mern Stack
                </Typography>

              </CardContent>

            </Card>
          </Box>
          {/* Box column footer*/}
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title='Drag to move' >
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
        <Box sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          {/* Box column header*/}
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography
              fontSize={'1rem'}
              variant='h6'
              sx={{
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>Column Title</Typography>
            <Box>
              <Tooltip title='More options'>
                <ExpandMoreIcon
                  sx={{
                    color: 'text.primary', cursor: 'pointer'
                  }}
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu-colmun-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />
              </Tooltip>
              <Menu
                id="basic-menu-colmun-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Box column list card */}
          <Box sx={{
            p: '0 5px',
            m: '0 5px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(
            ${theme.trello.boardContentHeight} -
            ${theme.spacing(5)} -
            ${COLUMN_HEADER_HEIGHT} -
            ${COLUMN_FOOTER_HEIGHT}
            )`,
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ced0da'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#dfc2cf'
            }
          }}>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://avatars.githubusercontent.com/u/93369803?v=4"
                title="green iguana"
              />
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography >
                  Mern Stack
                </Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }} >
                <Button size="small" startIcon={<GroupIcon />}>20</Button>
                <Button size="small" startIcon={<CommentIcon />}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon />}>20</Button>
              </CardActions>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'

            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography >
                  Mern Stack
                </Typography>

              </CardContent>

            </Card>
          </Box>
          {/* Box column footer*/}
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title='Drag to move' >
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
      </Box>

    </Box>
  )
}

export default BoardContent