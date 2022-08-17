// ** React Imports
import { useState } from 'react'

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// ** Styled Component Import
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'

// ** Third Party Imports
import { EditorState } from 'draft-js'

// ** Component Import
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

const Editor = () => {
  // ** State
  const [value, setValue] = useState(EditorState.createEmpty())

  return (
    <EditorWrapper>
      <ReactDraftWysiwyg editorState={value} onEditorStateChange={data => setValue(data)} />
    </EditorWrapper>
  )
}

export default Editor
