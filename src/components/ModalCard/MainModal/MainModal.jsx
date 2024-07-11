import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CommentIcon from '@mui/icons-material/Comment'
import SubjectIcon from '@mui/icons-material/Subject'
import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors'
import MarkdownEditor from '~/components/MarkdownEditor/MarkdownEditor'
import { useDispatch } from 'react-redux'
import { updateCard } from '~/redux/trelloSlice'


function MainModal({ card }) {
  const [openMDDescription, setopenMDDescription] = React.useState(true)
  const [openMDComment, setopenMDComment] = React.useState(true)
  const [edit, setEdit] = React.useState(true)
  const dispatch = useDispatch()

  const handleEdit = (data) => {
    if (data !== undefined) {
      setEdit(data)
    } else {
      setEdit(!edit)
    }
  }

  const markdown = `
  `

  const onUpdateCard = (data) => {
    const data2 = { ...card, description: data }
    data2.cardId = data2._id
    delete data2._id
    delete data2.createdAt
    delete data2.updatedAt
    delete data2._destroy
    delete data2.cards
    dispatch(updateCard(data2))
  }

  return (
    <Box sx={{ m: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <SubjectIcon sx={{ fontSize: '30px' }} />
          <Typography sx={{ fontSize: '20px', fontWeight: 600 }} component={'h3'} variant='h3'>
            Description
          </Typography>
        </Box>

        <Button
          onClick={() => {
            handleEdit()
          }}
          sx={{
            backgroundColor: '#E1E3E7',
            color: '#172B4D',
            ':hover': {
              backgroundColor: '#D0D4DA'
            }
          }}
        >
          Edit
        </Button>
      </Box>
      {
        openMDDescription && !card.description ? <Box
          onClick={() => {
            setopenMDDescription(false)
            handleEdit(false)
          }}
          sx={{
            backgroundColor: '#E1E3E7',
            color: '#172B4D',
            width: '93%',
            height: '64px',
            display: 'block',
            borderRadius: 2,
            p: 1,
            ml: 5,
            mt: 1,
            ':hover': {
              backgroundColor: '#D0D4DA',
              cursor: 'pointer'
            }
          }}>
          Add a more detailed description..
        </Box>
          :
          <MarkdownEditor
            data={card?.description}
            onEdit={handleEdit}
            edit={edit}
            updateCard={onUpdateCard}
            handleEdit={handleEdit}
          />
      }


      <Box sx={{ mt: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <CommentIcon sx={{ fontSize: '30px' }} />
            <Typography sx={{ fontSize: '20px', fontWeight: 600 }} component={'h3'} variant='h3'>
              Activity
            </Typography>
          </Box>
          <Button sx={{ backgroundColor: '#E1E3E7', color: '#172B4D', ':hover': { backgroundColor: '#D0D4DA' } }}>Show details</Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <Avatar sx={{ bgcolor: deepOrange[500], scale: '0.9' }}>N</Avatar>
        {
          openMDComment ?
            <Box
              onClick={() => { setopenMDComment(false) }}
              sx={{
                backgroundColor: 'white',
                color: '#172B4D',
                width: '100%',
                display: 'block',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                borderRadius: 2,
                p: 1,
                ':hover': {
                  backgroundColor: '#F7F8F9',
                  cursor: 'pointer'
                }
              }}>
              Write a comment..
            </Box>
            :
            <MarkdownEditor data={markdown} />
        }
      </Box>
    </Box >
  )
}

export default MainModal
