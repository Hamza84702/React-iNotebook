import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initial = []
  //Call addNote api
  const [notes, setnotes] = useState(initial)
  async function getNotes(){
    //Api Call
    
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
      });
      const json = await response.json();
      setnotes(json);
      // console.log(json);
    
  }

  //Add a Note
  const addNote = async (title,description,tag) =>{
    // api Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}), 
    });
    const note = await response.json();
    
    setnotes(notes.concat(note));
  }
  //Edit a Note
  const editNote = async (id,title,description,tag) =>{
    //Api Call
    
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({title,description,tag}), 
      });
      const json = await response.json();
      console.log(json);
    
    //Logic to edit in Client
      let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id===id) {
        newNotes[index].title=title;
        newNotes[index].description=description;
        newNotes[index].tag=tag;
        break;
      }
    }
    setnotes(newNotes); 
  }

  //Delete a Note
  const deleteNote = async (id) =>{
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json)

    console.log("Deleting the note with this Id " + id);
    const newNotes = notes.filter((note)=>{return note._id!==id});
    setnotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getNotes}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
