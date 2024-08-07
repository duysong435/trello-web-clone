import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { generatePlaceholderCard } from '~/utils/formatters'

import {
  DndContext,
  PointerSensor,
  // MouseSensor,
  // TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  // rectIntersection,
  pointerWithin,
  getFirstCollision,
  // closestCenter
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLib/DndkitSensors'
import { arrayMove } from '@dnd-kit/sortable'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cloneDeep, isEmpty } from 'lodash'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPES = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
}

function BoardContent({
  board,
  createNewColumn,
  createNewCard,
  moveColumns,
  moveCardInTheSameColumn,
  moveCardToDifferentColumn,
  deleteColumnDetails,
}) {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  })

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  })
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumn] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  // Điểm va chạm cuối cùng trươc đó (xử lý thuật toán phát hiện va chạm )
  const lastOverId = useRef(null)

  useEffect(() => {
    // Column đã được sắp xếp ở component cha cao nhất ( boards/ _id.js)
    setOrderedColumn(board.columns)
  }, [board])

  // Tìm một cái column theo cardId
  const findColumnByCardId = (cardId) => {
    // Đoạn này cần lưu ý, nên dùng c.cards thay vì dùng c.cardOrderIds bởi vì ở bước handleDragOver chúng sẽ
    // làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới.
    return orderedColumns.find((column) => column?.cards?.map((card) => card._id)?.includes(cardId))
  }

  // Khởi tạo Function Cập nhâth lại state trong trường hợp di chuyển  Card giữa các Column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData,
    triggerFrom,
  ) => {
    setOrderedColumn((prevColumns) => {
      // Tìm vị trí (index) của cái overCard trong column đích ( nơi mà  activeCard sắp được thả)
      const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)

      // Login tinh toán "cardIndex mới" (trên hoặc dưới của overCard) lấy chuẩn ra từ code của thư viện
      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      // Clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return  - cập nhật lại OrderedColumnState mới
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id)

      // nextActiveColumn:column cũ
      if (nextActiveColumn) {
        // Xoá card ở cái column active (cũng có thể hiểu là column cũ, cái lúc mà kéo card ra khỏi nó để sang column khác)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId,
        )

        // Thêm placeholder Card nếu column rỗng: Bị kéo hết Card  đi không còn cái nào nữa
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        // Cật nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id)
      }
      // nextOverColumn:column mới
      if (nextOverColumn) {
        // Kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa, nếu có thì cần xoá nó trước
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId,
        )

        // phải cập nhật lại chuẩn dữ liệu columnId trong card trong khi kéo card giữa 2 column khác nhau
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id,
        }
        // Tiếp theo là thêm cái card đang kéo vào overColumn theo vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData,
        )

        // Xoá cái placeholder Card đi nếu nó đang tồn tại
        nextOverColumn.cards = nextOverColumn.cards.filter((card) => !card.FE_PlaceholaderCard)

        // Cật nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id)
      }
      // Nếu function này được gọi từ handleDragEnd nghĩa là lúc kéo thả xong, lúc này mới xử llys gọi API 1 lần
      if (triggerFrom === 'handleDragEnd') {
        //  Phải dùng tới activeDragItemData.columnId hoặc tốt nhất là oldColumnWhenDraggingCard._id ( set vào state từ bước handleDragStart) chứ không phải activeDatatrong scope handleDragEnd này vì sau khi đi qua onDragOver và tới đây là state của card đã bị cập nhật
        moveCardToDifferentColumn(
          activeDraggingCardId,
          oldColumnWhenDraggingCard._id,
          nextOverColumn._id,
          nextColumns,
        )
      }
      // console.log('nextColumns', nextColumns)
      return nextColumns
    })
  }
  const handleDragStart = (event) => {
    // console.log('handleDragStart::', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPES.CARD
        : ACTIVE_DRAG_ITEM_TYPES.COLUMN,
    )
    setActiveDragItemData(event?.active?.data?.current)

    // Nếu là kéo card thì mới thực hiện những hành động set giá trị oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  //  Trigger trong qua trinh keo (drag) mot phan tu
  const handleDragOver = (event) => {
    // Không làm gì nếu đang kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPES.COLUMN) return

    // console.log('handle drag over :', event)
    // Còn nếu kéo card thì xử lý thêm để có thể kéo qua lại giữa các Columns
    const { active, over } = event

    // Cần đảm bảo nếu không tồn tại active hoặc over (khi kéo ra khỏi phạm vi contaier ) thì không làm gì (tránh crash trang web)
    if (!active || !over) return

    //  activeDraggingCard: là cái card đang được kéo
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active
    // overCard: là cái card đang được tương tác trên hoặc dưới so với card đang được kéo ở trên
    const { id: overCardId } = over

    // Tìm 2 columns theo CardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    //  Nêus không tồn tại 1 trong 2 columns thì không làm gì hết, tránh crash trang web
    if (!activeColumn || !overColumn) return

    // Xử lý login ở đây chỉ khi kéo card qua 2 column khác nhau, còn nếu card trong chính column
    // ban đầu của nó thì không làm gì
    // Vi dây đang là đoạn xử lý lúc kéo (handleDragOver), còn xử lý lúc kéo xxong xuôi thì nó lại là vẫn đề
    // khác ở (handleDragEnd)
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        'handleDragOver',
      )
    }
  }

  const handleDragEnd = (event) => {
    // console.log('handle drag end::', event)
    const { active, over } = event
    // Cần đảm bảo nếu không tồn tại active hoặc over (khi kéo ra khỏi phạm vi contaier ) thì không làm gì (tránh crash trang web)
    if (!active || !over) return

    // Xử lý kéo thả Cards
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPES.CARD) {
      //  activeDraggingCard: là cái card đang được kéo
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active
      // overCard: là cái card đang được tương tác trên hoặc dưới so với card đang được kéo ở trên
      const { id: overCardId } = over

      // Tìm 2 columns theo CardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      //  Nêus không tồn tại 1 trong 2 columns thì không làm gì hết, tránh crash trang web
      if (!activeColumn || !overColumn) return

      // hành động kéo card qua 2 column khác nhau
      // phải dùng tới activeDagItemData.columnId hoặc oldColumnWhenDraggingCard ( set vào state từ bước handleDragStart) chứ không phải activeData
      // trong scope handleDragEnd này vì sau khi đi qua onDragOver tới đây là state của card đã bị cập nhật 1 lần rồi

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
          'handleDragEnd',
        )
      } else {
        // hành động kéo thả card trong cùng 1 column

        // lấy vị trí cữ (từ thằng oldColumnWhenDraggingCard)
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId,
        )
        // Lấy vị trí mới (từ thằng overColumn)
        const newIndex = overColumn?.cards?.findIndex((c) => c._id === overCardId)

        // Dùng araymove vì kéo card trong một cái column thu=ì tương tự với logiv kéo column trong một cái board content
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newIndex)
        const dndOrderedCardIds = dndOrderedCards.map((card) => card._id)
        // console.log('safssaffasfssfasfsafdndOrderedCards', dndOrderedCards)

        // Vẫn gọi update state ở đây để tránh delay hoặc Flickering giao diện lúc kéo thả cần phải chờ gọi API(small trick)
        setOrderedColumn((prevColumns) => {
          // Clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return  - cập nhật lại OrderedColumnState mới
          const nextColumns = cloneDeep(prevColumns)

          // Tìm tới column mà chúng ta đang thả đang thả
          const targetColumn = nextColumns.find((c) => c._id === overColumn._id)

          // cập nhật lại 2 giá trị mới là card  và cardOrderIds trong cái targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCardIds
          // console.log(targetColumn)

          // trả về giá trị state mưới (chuẩn vị trí)
          return nextColumns
        })

        moveCardInTheSameColumn(dndOrderedCards, dndOrderedCardIds, oldColumnWhenDraggingCard._id)
      }
    }

    // Xử lý kéo thả columns trong boardContent
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPES.COLUMN) {
      // console.log('Hành động kéo thả tạm thời của Column')

      if (active.id !== over.id) {
        // lấy vị trí cữ (từ thằng active)
        const oldColumnIndex = orderedColumns.findIndex((c) => c._id === active.id)
        // Lấy vị trí mới (từ thằng over)
        const newColumnIndex = orderedColumns.findIndex((c) => c._id === over.id)

        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        // console.log(dndOrderedColumnsIds)
        // console.log(dndOrderedColumns)

        //  Vẫn gọi update State ở đây để tránh delay hoặc Flickẻing giao diện lúc kéo thả cần phải chờ API (small trick)
        setOrderedColumn(dndOrderedColumns)
        moveColumns(dndOrderedColumns)
      }
    }

    //  Những dữ liệu sau khi kéo thả này luôn phải đưa về giá tị null mặc định ban đầu
    setActiveDragItemData(null)
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setOldColumnWhenDraggingCard(null)
  }

  const customDropAmimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  }

  // Chúng ta sẽ custom lại chiến lược / thuật toán phát hiện va chạm tối ưu cho việc kéo thả card giữa nhiều columns
  // args = arguments = các đối, tham số
  const collisionDetectionStrategy = useCallback(
    (args) => {
      //Trường hợp kéo column thì dùng thuật toán closestCorners là chuẩn nhất
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPES.COLUMN) {
        return closestCorners({ ...args })
      }

      //Tìm các điểm giao nhau, va chạm - intersection với con trỏ
      const pointerIntersection = pointerWithin(args)
      // console.log('pointerIntersection', pointerIntersection)
      if (!pointerIntersection?.length) return
      // Thuật toán phát hiện va chạm sẽ trả về một mảng các va chạm ở đây
      // const intersections = !!pointerIntersection?.length
      //   ? pointerIntersection
      //   : rectIntersection(args)

      // Tìm overId đầu tiên trong đám pointerIntersection ở trên
      let overId = getFirstCollision(pointerIntersection, 'id')
      // console.log('overId', overId)
      if (overId) {
        // Néu cái  over nó là column thì sễ tìm tới cardId gần nhất bên trong khu vực va chạm đó dựa vào thuật toán phát hiện va chạm closestCenter hoặc closestCorners đều được. Tuy nhiên ở đây dùng closestCorners mình dùng thấy mượt hơn
        const checkColumn = orderedColumns.find((column) => column._id === overId)
        if (checkColumn) {
          // console.log('over ID before', overId)
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter((container) => {
              return container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id)
            }),
          })[0]?.id
          // console.log('over id after:::', overId)
        }
        lastOverId.current = overId
        return [{ id: overId }]
      }

      // Nếu overId là null thì trả về mảng rỗng - bug crash trang
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType],
  )

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      // Thuật toán phát hiện va chạm ( nếu không có nó thì card với cover lớn hơn sẽ không kéo qua Column được vì lúc
      // này nó đăng bị conflict giữa card và column), chúng ta sẽ dùng closestCorners thay vì closestCenter
      // Update: nếu chỉ dùng closestCorners nó sẽ co bug flickering + sai lệch dữ liệu
      // collisionDetection={closestCorners}

      // Tự custom nâng câo thuật toán phát hiện va chạm
      collisionDetection={collisionDetectionStrategy}
      sensors={sensors}
    >
      <Box
        sx={{
          // backgroundColor: 'primary.main',
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          p: '10px 0',
        }}
      >
        <ListColumns
          columns={orderedColumns}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          deleteColumnDetails={deleteColumnDetails}
        />
        <DragOverlay dropAnimation={customDropAmimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPES.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPES.CARD && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
