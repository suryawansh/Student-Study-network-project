import React, {useEffect, useState} from 'react';
import {Modal, ModalTitle, ModalBody, ModalFooter, Button, ModalDialog} from 'react-bootstrap';
import Note from './Note/Note';

import './Notes.css';

const Notes = (props) => {
    let i = 0;
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState();
    const [stream, setStream] = useState("");
    const [streams, setStreams] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedStreams, setSelectedStreams] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedStream, setSelectedStream] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [notes, setNotes] = useState([]);

    const handleShow = () => {setShow(true)}
    const handleHide = () => {setShow(false)}

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleFileChange = (e) =>{
        setFile(e.target.files[0]);        
    }

    const handleStreamChange = async(e) => {  
        if(e.target.value==0){
            getNotes();
            return;
        }

        const res = await fetch('http://localhost:8080/note/subjects?stream_id='+e.target.value);
        const data = await res.json();
        setStream(e.target.value);
        setSubjects(data.data);
        getNotes(e.target.value);
    }

    const handleSubjectChange = async(e) => {  
        getNotes(stream, e.target.value);
    }

    const handleSelectedStreamChange = async(e) => {  
        console.log(e.target.value)  ;
        const res = await fetch('http://localhost:8080/note/subjects?stream_id='+e.target.value);
        const data = await res.json();
        setSelectedSubjects(data.data);
        setSelectedStream(e.target.value);
    }

    const handleSelectedSubjectChange = async(e) => {
        setSelectedSubject(e.target.value);
    }

    const getStreams = async()=> {
        const res = await fetch('http://localhost:8080/note/streams');
        const data = await res.json();
        console.log(data)
        setStreams(data.data);
        setSelectedStreams(data.data);
    }

    const handleAddNote = (e) =>{        
        setShow(false);
        if(file){
            const formData = new FormData();
            formData.append('stream_id', selectedStream);
            formData.append('subject_id', selectedSubject);
            formData.append('id', localStorage.getItem('email'));
            formData.append('file', file);
            console.log(formData);
            fetch('http://localhost:8080/note', {
                method:"POST",
                
                body:formData
                
            }).then(res=> res.json()).catch(err=>console.log(err))
            .then(body=>{
                console.log(body)
            }).catch(err=>console.log(err));
        }
    }
    
    const getNotes = async (stream_id,subject_id) => {
        
        let url =`http://localhost:8080/note`;
        if(stream_id){
            url+="?stream_id="+stream_id;
        }
        if(subject_id){
            url+="&subject_id="+subject_id;
        }
        console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setNotes(data.data);
    }

    useEffect(()=> {
        getStreams();
        getNotes();
    }, [])

    return (

        <div>
            <Modal show={show} centered>
                <ModalDialog>
                    <ModalTitle>
                        Add Notes
                    </ModalTitle>
                </ModalDialog>

                <ModalBody>
                    <form>
                        {/* <input type="text" value={title} onChange={handleTitleChange} placeholder="Enter Subject" className="w-100 my-2 p-2" /> */}
                        <select onChange={handleSelectedStreamChange} className="d-block p-2 my-2 w-100" >
                            <option value="0">Select By Stream</option>
                            {selectedStreams.map((stream) => <option value={stream.id}>{stream.name}</option>)}
                        </select>
                        <select onChange={handleSelectedSubjectChange} className="d-block p-2 my-3 w-100">
                            <option value="0">Select By Subject</option>
                            {selectedSubjects.map((subject) => <option value={subject.id}>{subject.name}</option>)}
                        </select>
                        <input type="file" name="file" onChange={handleFileChange} className="w-100 m-2" />
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleHide} variant="danger">Cancel</Button>
                    <Button onClick={handleAddNote} type="submit">Add Note</Button>
                </ModalFooter>
            </Modal>
            <header class="header">
                <nav class="nav">
                    <a>Home</a>
                    <ul>
                    <li><a onClick={() => { props.setPage("Home") }}>Memes</a></li>
                    <li><a onClick={() => { props.setPage("Notes") }}>Notes</a></li>
                    <li><a onClick={() => { props.setPage("Subject") }}>Subjects</a></li>
                    <li><a onClick={() => { localStorage.removeItem('email'); props.handleLogin(false); }}>Log Out</a></li>
                    </ul>
                </nav>
            </header>
            <section>
            <Button onClick={handleShow} variant="warning" style={{position:"fixed", right:0, bottom:0}} className="m-4">Add Note</Button>
                <div class="note-selection">
                    <p>Notes</p>
                    <div class="selection">
                        <select onChange={handleStreamChange} placeholder="Select By Streams">
                            <option value="0">Select By Streams</option>
                            {streams.map((stream) => <option value={stream.id}>{stream.name}</option>)}
                        </select>
                        <select onChange={handleSubjectChange}>
                            <option>Select By Subject</option>
                            {subjects.map((subject) => <option value={subject.id}>{subject.name}</option>)}
                        </select>
                    </div>
                </div>
                <hr />
                
                <div class="notes">            
                            
                    {notes.map((note, index) =>                    
                        <Note caption={note.caption} name={note.name} postedOn={note.posted_on} note={note.note_url} />
                    )}
                    
                </div>
                
            </section>
        </div>
    )
}

export default Notes;