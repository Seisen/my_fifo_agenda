import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDOlBBKrw6M2_PqvDlDXMJjJqr9OBF99xk",
  authDomain: "fifoagenda.firebaseapp.com",
  databaseURL: "https://fifoagenda-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fifoagenda",
  storageBucket: "fifoagenda.appspot.com",
  messagingSenderId: "402510800265",
  appId: "1:402510800265:web:ee875372ec76f565776d58",
  measurementId: "G-NWXREE2YEL"
})

const auth = firebase.auth();

const firestore = firebase.firestore();
const analytics = firebase.analytics();
var nameA = '_main_';



function App() {

  const [user] = useAuthState(auth);


  return (
    <div className="App">
      <header>

        <SignOut></SignOut>

        {user ? <Agendas /> : null}


      </header>

      <section>

        {user ? <Agenda /> : <SignIn />}

      </section>
    </div>
  );
}



function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
      <>
        <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      </>
  )

}
function SignOut() {
  return auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function Agendas(){


  const agendaRef = firestore.collection('agenda');
  const query = agendaRef.orderBy('createdAt').limit(4);
  const [agenda] = useCollectionData(query, { idField: 'id' });
  const [nameAgenda, setNameAgenda] = useState('');


  const addAgenda = async (e) => {

    e.preventDefault();


    await agendaRef.add({
      name:nameAgenda,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    setNameAgenda('');
  }
  return (<>


    <form onSubmit={addAgenda}>
      <input value={nameAgenda} onChange={(e) => setNameAgenda(e.target.value)} placeholder="Name of the new agenda" />
      <button type="submit"  disabled={!nameAgenda}>+</button>
    </form>

    {agenda && agenda.map(ele => <ListAgenda  key={ele.id} agenda={ele} />)}
  </>)

}

function Agenda(){


  const dummy = useRef();
  const todoRef = firestore.collection(nameA);
  const query = todoRef.orderBy('createdAt').limit(25);

  const [todo] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');
  const [levelValue, setLevelValue] = useState('');


  const addObj = async (e) => {

    e.preventDefault();
    const { uid,photoURL } = auth.currentUser;

    await todoRef.add({
      text: formValue,
      level: levelValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
        <span ref={dummy}></span>
    <form onSubmit={addObj}>

      <input id={'formTodo'} value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="add something to the agenda" />
      <input type='checkbox'  onChange={(e) => setLevelValue(e.target.value)} />
      <button type="submit" disabled={!formValue}>+</button>

    </form>

      <main>

        {todo && todo.map(ele => <ChatMessage key={ele.id} todo={ele} />)}

      </main>
  </>
  )
}

function ChatMessage(props) {
  const { text, level, id } = props.todo;

  const removeObj = async (e) => {
    e.preventDefault();

    const todoRef = firestore.collection('todo').doc(id);

    await confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => todoRef.delete()
        },
        {
          label: 'No'
        }
      ]
    });

  }

  return (<>
    <div className='todoElem'>

      <p className={level}>{text}</p>
      <button onClick={removeObj}>-</button>
    </div>

  </>)
}

function ListAgenda(props) {
  const { name, id } = props.agenda;
  const update = () =>{document.getElementById('formTodo').value = "My value";}

  const removeObj = async (e) => {
    e.preventDefault();

    const agendaRef = firestore.collection('agenda').doc(id);

    await confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => agendaRef.delete()
        },
        {
          label: 'No'
        }
      ]
    });
  }


  return (<p onClick={() => {nameA = name; window.location.reload() } } > {name} <button onClick={removeObj}>x</button></p>
      )
}


export default App;
