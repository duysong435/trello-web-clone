import { BlockTypeSelect, BoldItalicUnderlineToggles, CreateLink, InsertImage, InsertTable, ListsToggle, MDXEditor, UndoRedo, headingsPlugin, imagePlugin, linkDialogPlugin, listsPlugin, markdownShortcutPlugin, quotePlugin, tablePlugin, toolbarPlugin } from '@mdxeditor/editor'

import '@mdxeditor/editor/style.css'
import { Fragment, useRef, useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

async function imageUploadHandler(image) {
  const formData = new FormData()
  formData.append('image', image)
  // send the file to your server and return
  // the URL of the uploaded image in the response
  const response = await fetch('/uploads/new', {
    method: 'POST',
    body: formData
  })
  const json = await response.json()
  return json.url
}

function MarkdownEditor({ data, edit, updateCard, handleEdit }) {
  const mdxEditorRef = useRef(null)
  // const [edit, setEdit] = useState(false)
  console.log(mdxEditorRef.current?.getMarkdown())

  const handleUpdateCard = () => {
    updateCard(mdxEditorRef.current?.getMarkdown())
  }

  const cancelMarkDown = () => {
    mdxEditorRef.current?.setMarkdown(data)
    handleEdit()
  }

  return (
    <Box>
      <Box sx={{
        backgroundColor: 'white',
        mt: 1,
        borderRadius: 2,
        overflowY: 'scroll',
        maxHeight: 400
      }}>
        <MDXEditor
          readOnly={edit}
          ref={mdxEditorRef}
          // onChange={console.log}
          autoFocus
          markdown={data}
          plugins={[
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <BlockTypeSelect />
                  <CreateLink />
                  <InsertImage />
                  <InsertTable />
                  <ListsToggle />
                </>
              )
            }),
            headingsPlugin(),
            linkDialogPlugin(),
            imagePlugin({
              mageUploadHandler: () => {
                return Promise.resolve('https://picsum.photos/200/300')
              },
              imageAutocompleteSuggestions: ['https://picsum.photos/200/300', 'https://picsum.photos/200'],
              imageUploadHandler
            }),
            tablePlugin(),
            listsPlugin(),
            quotePlugin(),
            markdownShortcutPlugin()
          ]} />
      </Box>
      <Box sx={{ display: edit ? 'none' : 'block' }}>
        <Button variant="contained" color="primary" onClick={handleUpdateCard}>
          Save
        </Button>
        <Button variant="text" color="primary" onClick={cancelMarkDown}>
          Cancel
        </Button>
      </Box>
    </Box>
  )
}

export default MarkdownEditor
