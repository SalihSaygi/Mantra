import { Typography, Container, Box } from '@material-ui/core';
import { default as React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EditorComponent from './Editor';
import { Editor, Note } from '../../utils/storage';

function Editor() {
  console.log('render');
  const [noteData, setNoteData] = useState<Array<Note>>();
  const [editorData, setEditorData] = useState<Array<Editor>>();
  const [viewEditorData, setViewEditorData] = useState<Editor>();
  const [isFirst, setIsFirst] = useState<Boolean>(true)

  useEffect(() => {
    console.log(noteData, "noteData in Editor");
    if (noteData) {
          console.log(noteData, "noteData in Editor2");

      async function localSetNotes() {
        chrome.storage.local.set({"notes": noteData})
      }
      localSetNotes().then(() => {
                console.log('localSetNotes Done')
      })
    }
  }, [noteData]);

  useEffect(() => {
    console.log(editorData, "editorData in Editor");
    if (editorData) {
          console.log(editorData, "editorData in Editor2");
      async function localSetEditor() {
        chrome.storage.local.set({"editor": editorData})
      }
      localSetEditor().then(() => {
        console.log('localSetEditor Done')
        if(isFirst) {
          setViewEditorData(editorData[0])
        } else if(!isFirst) {
          setViewEditorData(editorData[editorData.length - 1])
        }
      })
    }
  }, [editorData]);

  return (
    <React.Fragment>
      <Container
        style={{ backgroundColor: '#d4ecff', minHeight: '100vh' }}
        maxWidth="xl"
      >
        <Box p={5}>
          <Box
            mt={2}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #cccccc',
            }}
          >
            <EditorComponent noteData={noteData} editorData={editorData} setNoteData={setNoteData} setEditorData={setEditorData} viewEditorData={viewEditorData}  setViewEditorData={setViewEditorData} setIsFirst={setIsFirst} />
          </Box>
        </Box>

        <Link to="/notes">Notes</Link>
      </Container>
    </React.Fragment>
  );
}

export default Editor;
