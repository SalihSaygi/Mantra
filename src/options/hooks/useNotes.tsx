import React, { useState } from 'react'
import { addExceptionRule, addRedirectRule } from '../../utils/rules'
import { getStoredNotes, Note, setStoredNotes, setStoredOptions, setStoredURL } from '../../utils/storage'
import { blockedURL } from '../../utils/storage'

const useAddNote = (note: Note) => {
  const [stateNotes, setStateNotes] = useState<Note[]>()
  setStoredNotes([note]).then(() => {
      setStateNotes(p => [
        ...p,
        note
      ])
    })
  return stateNotes
}

const useDeleteNote = (noteTitle: string) => {
  const [stateNotes, setStateNotes] = useState<Note[]>()
  getStoredNotes().then((notes) => {
    const newNotes = notes.filter(note => note.title !== noteTitle)
    setStoredNotes(newNotes).then(() => {
        setStateNotes(newNotes)
      })
  })

  return stateNotes
}


//not done yet
const useEditNote = (noteTitle: string, newNote: Note) => {
  const [stateNotes, setStateNotes] = useState<Note[]>()
  getStoredNotes().then((notes) => {
    const noteIndex = notes.findIndex((note => note.title === noteTitle))
    notes[noteIndex] = newNote
    setStoredNotes(notes).then(() => {
        setStateNotes(notes)
      })
  })

  return stateNotes
}

export { useAddNote, useDeleteNote, useEditNote }