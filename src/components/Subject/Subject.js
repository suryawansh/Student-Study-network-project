import React, {useEffect, useState} from 'react';
import {Modal, ModalDialog, ModalTitle, ModalBody, ModalFooter, Button} from 'react-bootstrap';
import './Subject.css';

const Subject = (props) => {

    const [show, setShow] = useState(false);
    const [stream, setStream] = useState("");
    const [subject, setSubject] = useState("");
    const [streams, setStreams] = useState([]);    
    const [subjects, setSubjects] = useState({});
    const handleShow = () => {setShow(true)}
    const handleHide = () => {setShow(false)}

    const handleSelectedStreamChange = async(e) => {             
        setStream(e.target.value);
    }

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    }

    const getStreams = async()=> {
        const res = await fetch('http://localhost:8080/note/streams');
        const data = await res.json();
        console.log(data)
        setStreams(data.data);
    }

    const getSubjects = async()=> {
        const res = await fetch('http://localhost:8080/subject');
        const data = await res.json();
        console.log(data);
        setSubjects(data.data);
    }

    const handleAddSubject = async(e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:8080/subject', {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({stream_id: stream, subject:subject})
        })        
        const data = await res.json();
        console.log(data);
        handleHide();
    }

    useEffect(() =>{
        getStreams();
        getSubjects();
    }, [])

    return (<>
        <Modal show={show} centered>
            <ModalDialog>
                <ModalTitle>
                    Add Subject
                </ModalTitle>
            </ModalDialog>

            <ModalBody>
                <form>
                <select onChange={handleSelectedStreamChange} className="d-block p-2 my-2 w-100" >
                    <option>Select By Stream</option>
                    {streams.map((stream) => <option value={stream.id}>{stream.name}</option>)}
                </select>
                    <input type="text" value={subject} onChange={handleSubjectChange} placeholder="Enter Subject" className="w-100 my-2 p-2" />                    
                </form>
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleHide} variant="danger">Cancel</Button>
                <Button onClick={handleAddSubject} type="submit">Add Subject</Button>
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
            <Button onClick={handleShow} variant="warning" style={{position:"fixed", right:0, bottom:0}} className="m-4">Add Subject</Button>
            
            {
                Object.keys(subjects).map((key) =>(
                    <div>
                        <h4 className="m-2">{key}</h4>
                        <hr />
                        {subjects[key].map(subject=>(
                            <p className="subject">{subject}</p>
                        ))}
                    </div>
                ))
            }
            
        </section>
    </>)
}

export default Subject;