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
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzMGQ3NTA1NTlhMjlhMDc4MTJlMGIxIn0sImlhdCI6MTcxNDU1OTQ1NX0.fZLUEYuvqoCqzCYDXaCXgKVpuPFajVc1SzoVcxm6aRY",
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzMGQ3NTA1NTlhMjlhMDc4MTJlMGIxIn0sImlhdCI6MTcxNDU1OTQ1NX0.fZLUEYuvqoCqzCYDXaCXgKVpuPFajVc1SzoVcxm6aRY",
      },
      body: JSON.stringify(title,description,tag), 
    });
    const json = await response.json();

    console.log("adding a new Note");
    const note= {
      "_id": "663291c8336b1kd267b770c87a",
      "user": "6630d750559a29a07812e0b1",
      "title": title,
      "description": description,
      "tag": "tag",
      "date": "2024-05-01T19:02:32.216Z",
      "__v": 0
    }
    setnotes(notes.concat(note));
  }
  //Edit a Note
  const editNote = async (id,title,description,tag) =>{
    //Api Call
    
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzMGQ3NTA1NTlhMjlhMDc4MTJlMGIxIn0sImlhdCI6MTcxNDU1OTQ1NX0.fZLUEYuvqoCqzCYDXaCXgKVpuPFajVc1SzoVcxm6aRY",
        },
        body: JSON.stringify(title,description,tag), 
      });
      const json = await response.json();
    
    //Logic to edit in Client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id===id) {
        element.title=title;
        element.description=description;
        element.tag=tag;
      }
    }
    
  }
  //Delete a Note
  const deleteNote = (id) =>{
    console.log("Deleting the note with this Id " + id);
    const newNotes = notes.filter((note)=>{return note._id!==id});
    setnotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getNotes}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
