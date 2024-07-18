import { Box } from '@mui/material'
import DetailWorkspace from './DetailWorkspace/DetailWorkspace'
import Divider from '@mui/material/Divider'
import DashboardAll from '~/pages/Home/Dashboard/DashboardAll/DashboardAll'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getAllBoardForWorkspace } from '~/apis'
import { getAllForUser } from '~/redux/trelloSlice'
const WorkspaceContent = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  // const [boards, setBoards] = useState()
  const boards = useSelector((state) => state.trello.boards)
  const boardsForWp = boards.filter((items) => {
    return items.workspaceId === id
  })
  // const workspace = Object.groupBy(boards, (workspace) => workspace.workspaceId)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await getAllBoardForWorkspace(id)
  //       console.log(res)
  //       setBoards(res)
  //     } catch (error) {
  //       // console.error('Error fetching data:', error)
  //     }
  //   }
  //   fetchData()
  //   dispatch(getAllForUser())
  // }, [id, dispatch])
  return (
    <Box sx={{ marginX: 'auto', width: '100%', padding: '32px' }}>
      <Box>
        <DetailWorkspace />
      </Box>
      <Divider variant="middle" />
      <DashboardAll boards={boardsForWp} id={id} />
    </Box>
  )
}

export default WorkspaceContent
