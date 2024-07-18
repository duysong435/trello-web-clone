import Box from '@mui/material/Box'
import DashboardSideBar from './DashboardSideBar/DashboardSideBar'
import DashboardAll from './DashboardAll/DashboardAll'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllForUser } from '~/redux/trelloSlice'
export default function DashboardHome() {
  const dispatch = useDispatch()

  const boards = useSelector((state) => state.trello.boards)
  const workspaces = useSelector((state) => state.trello.workspace)
  const joinedWorkspaces = workspaces.map((workspace) => {
    return {
      ...workspace,
      boards: boards.filter((board) => board.workspaceId === workspace.id),
    }
  })

  console.log(joinedWorkspaces)
  useEffect(() => {
    // console.log(workspaces)
    dispatch(getAllForUser())
  }, [])
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '4fr 8fr',
        gap: 5,
        marginTop: 6,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <DashboardSideBar />
      </Box>
      <Box>
        {joinedWorkspaces.map((items) => (
          <DashboardAll boards={items.boards} title={items.title} key={items._id} id={items._id} />
        ))}
      </Box>
    </Box>
  )
}
