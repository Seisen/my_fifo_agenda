import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';


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


function App() {
  const [user] = useAuthState(auth);



  return (
    <div className="App">
      <header>
        <SignOut></SignOut>

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

function Agenda(){
  const dummy = useRef();
  const todoRef = firestore.collection('todo');
  const query = todoRef.orderBy('createdAt').limit(25);

  const [todo] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');
  const [levelValue, setLevelValue] = useState('');
  const cpt_lvl = "0";



  const addObj = async (e) => {

    e.preventDefault();
    const { uid,photoURL } = auth.currentUser;

    await todoRef.add({
      text: formValue,
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

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="add something to the agenda" />

      <button type="submit" disabled={!formValue}>+</button>

    </form>
      <button value={cpt_lvl} onClick={(e) => setFormValue(e.target.value)}>{levelValue}</button>
      <main>

        {todo && todo.map(ele => <ChatMessage key={ele.id} todo={ele} />)}



      </main>
  </>
  )
}
function ChatMessage(props) {
  const { text } = props.todo;

  return (<>
    <div className='todoElem'>

      <p>{text}</p>
    </div>
  </>)
}


export default App;
