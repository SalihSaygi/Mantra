// import { nanoid } from 'nanoid'
import {
  // getStoredNotes,
  // getStoredOptions,
  setStoredCategories,
  setStoredEditor,
  setStoredNotes,
  setStoredURL,
  // setStoredOptions,
} from '../utils/storage'

chrome.runtime.onInstalled.addListener(() => {
  console.log('aloo')
  // const exampleNotes = {
  //   id: "4745474",
  //   title: "Example Note",
  //   content: "",
  //   category: "Example"
  // }
  // const exampleCategory = {
  //   title: "Example",
  // }
  // const exampleEditor = {
  //   id: "4745474",
  //   time: 23456745,
  //   blocks: [{
  //     type: "header",
  //     data: {
  //       text: 'Example Note',
  //       level: 1
  //     }

  //   }]
  // }
  setStoredNotes([])
  setStoredCategories([])
  setStoredEditor([])
  setStoredURL([])
    console.log('aloo2')
})

// chrome.contextMenus.onClicked.addListener((event) => {
//   let id = nanoid()
//   const newNote = {
//     title: `Unnamed-${id}`,
//     content: event.selectionText,
//     category: 'Draft'

//   }
//   getStoredNotes().then((notes) => {
//     setStoredNotes([...notes, newNote])
//   })
// })
