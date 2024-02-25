import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'

function ListColumns({ columns }) {
  const [openNewColumnForm, setopenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setopenNewColumnForm(!openNewColumnForm)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.error('Please enter cloumn title!')
      return
    }

    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
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
        {
          columns?.map((column) => <Column key={column?._id} column={column} />)
        }
        {/* Add new clomun */}
        {
          !openNewColumnForm ?
            <Box
              onClick={toggleOpenNewColumnForm}
              sx={{
                minWidth: '250px',
                maxWidth: '250px',
                bgcolor: '#ffffff3d',
                mx: 2,
                borderRadius: '6px',
                height: 'fit-content'
              }}>
              <Button
                sx={{
                  color: 'white',
                  width: '100%',
                  justifyContent: 'flex-start',
                  pl: 2.5,
                  py: 1
                }}
                startIcon={<NoteAddIcon />}>Add new colmun</Button>
            </Box>
            :
            <Box sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}>
              <TextField
                label="Enter column title"
                type="text"
                size='small'
                variant='outlined'
                autoFocus
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                sx={{
                  minWidth: 120, maxWidth: 250,
                  '& label': { color: 'white' },
                  '& input': { color: 'white' },
                  '& label.Mui-focused': { color: 'white' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' }
                  }
                }}
              />
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Button variant='contained' color='success' size='small'
                  onClick={addNewColumn}
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                  }}
                >Add Column</Button>
                <CloseIcon fontSize='small'
                  sx={{
                    color: 'white', cursor: 'pointer',
                    '&:hover': { color: (theme) => theme.palette.warning.light }
                  }}
                  onClick={toggleOpenNewColumnForm}
                />
              </Box>
            </Box>
        }

      </Box>
    </SortableContext>
  )
}

export default ListColumns