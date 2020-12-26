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
import {useEffect} from "react/cjs/react.production.min";

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
  const [user] = useAuthState(auth);
  const agendaRef = firestore.collection('users').doc(user.uid).collection('agenda');
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
  return (
  <>
    <form onSubmit={addAgenda}>
      <input value={nameAgenda} onChange={(e) => setNameAgenda(e.target.value)} placeholder="Name of the new agenda" />
      <button type="submit"  disabled={!nameAgenda}>+</button>
    </form>

    {agenda && agenda.map(ele => <ListAgenda  key={ele.id} agenda={ele} />)}
  </>)
}

function Agenda(){
  const dummy = useRef();
  const [user] = useAuthState(auth);

  const getCA = () => {firestore.collection('users').doc(user.uid).get().then((doc) => {
    if (doc.exists)
    nameA = doc.data()['currentAgenda'];
  })}
  getCA();

  const addMain = () => {firestore.collection('users').doc(user.uid).collection('agenda').doc('_main_').get().then((doc) => {
    if (!doc.exists){
      const addd = () => {
        firestore.collection('users').doc(user.uid).collection('agenda').doc('_main_').set({name:'_main_',createdAt: firebase.firestore.FieldValue.serverTimestamp()});
      }
      addd();
    }
  })}
  addMain()

  const todoRef = firestore.collection('users').doc(user.uid).collection(nameA);
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
  const [user] = useAuthState(auth);

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
  return (
    <>
      <p onClick={() => {firestore.collection('users').doc(user.uid).set({currentAgenda:name}).then(() => {window.location.reload()})} } >
        {name}
       </p>

      <button onClick={removeObj}>
        x
      </button>
    </>
      )
}
export default App;
