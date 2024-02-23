// Board details

import Container from '@mui/material/Container'

import AppBar from '~/components/AppBar/AppBoard'
import BoardBar from './BoardsBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'


function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardid = '65d85bf59413865fa34cd6cb'
    fetchBoardDetailsAPI(boardid).then((board) => {
      setBoard(board)
    })
  }, [])
  console.log(board)
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={mockData?.board} />
      <BoardContent board={mockData?.board} />
    </Container>
  )
}

export default Board
