import React, { useRef, useState } from 'react';
import './App.css';
import { FormControl, FormCheck } from 'react-bootstrap';
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
        <div className={'topHeader'}>
          {user ? <p className={'pHeader'}>{user.displayName}'s Fifo Agenda</p> : null}
          {user ? <SignOut className={'sHeader'}></SignOut> : null}

        </div>

        {user ? <Agendas className={'botHeader'} /> : null}

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
  <div className={'botHeader'}>
    <div className={'listAgendas'}>{agenda && agenda.map(ele => <ListAgenda  key={ele.id} agenda={ele} />)}</div>

    <form className={FormControl} onSubmit={addAgenda}>
      <input  className={"form-control"} value={nameAgenda} onChange={(e) => setNameAgenda(e.target.value)} placeholder="Name of the new agenda" />
      <button type="submit"  disabled={!nameAgenda}>+</button>
    </form>


  </div>)
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

  return (<div className={'tasks'}>
        <span ref={dummy}></span>
    <form className={'formTasks'} onSubmit={addObj}>

      <input  className={FormControl} id={'formTodo'} value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="add something to the agenda" />
      <input  type='checkbox'  className={FormCheck} onChange={(e) => setLevelValue(e.target.value)} />
      <button type="submit" disabled={!formValue}>+</button>

    </form>

      <main>
        {todo && todo.map(ele => <ChatMessage key={ele.id} todo={ele} />)}
      </main>
  </div>
  )
}

function ChatMessage(props) {
  const { text, level, id } = props.todo;
  const [user] = useAuthState(auth);
  const todoRef = firestore.collection('users').doc(user.uid).collection(nameA).doc(id);
  const removeObj = async (e) => {
    e.preventDefault();

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
  const agendaRef = firestore.collection('users').doc(user.uid).collection('agenda').doc(id);

  const removeObj = async (e) => {
    e.preventDefault();

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
    <div className={'Agendas'}>

        <p onClick={() => {firestore.collection('users').doc(user.uid).set({currentAgenda:name}).then(() => {window.location.reload()})} } >
          {name}
         </p>

      <button onClick={removeObj}>
        x
      </button>
    </div>
      )
}
export default App;
