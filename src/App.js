import React, { useRef, useState } from 'react';

import './App.css';

import { Button, Form, InputGroup, FormControl, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';


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
            {user ? <p className={'pHeader'}>{user.displayName}'s FIFO Agenda</p> : null}
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
          <h1 id='h1-signIn'>
              Your FIFO agenda
          </h1>
        <Button variant="outline-light" className="sign-in" onClick={signInWithGoogle}>Sign in with Google</Button>
      </>
  )
}

function SignOut() {
  return auth.currentUser && (
      <Button variant="outline-light" className="sign-out" onClick={() => auth.signOut()}>Sign Out</Button>
  )
}


function Agendas(){
  const [user] = useAuthState(auth);
  const agendaRef = firestore.collection('users').doc(user.uid).collection('agenda');
  const query = agendaRef.orderBy('createdAt').limit(50);
  const [agenda] = useCollectionData(query, { idField: 'id' });
  const [nameAgenda, setNameAgenda] = useState('');

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <a
          href=""
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
      >
        {children}
        &#x25bc;
      </a>
  ));

  const CustomMenu = React.forwardRef(
      ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
              <FormControl
                  autoFocus
                  className="mx-3 my-2 w-auto"
                  placeholder="Type to filter..."
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
              />
              <ul >
                {React.Children.toArray(children).filter(
                    (child) =>
                        !value || child.props.agenda.name.toLowerCase().startsWith(value),

                )}
              </ul>
            </div>
        );
      },
  );


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

        <Dropdown>
          <Dropdown.Toggle drop='left' as={CustomToggle} id="dropdown-custom-components">
            Your agendas
          </Dropdown.Toggle>

          <Dropdown.Menu as={CustomMenu}>
            {agenda && agenda.map(ele => <ListAgenda  key={ele.id} agenda={ele} />)}
          </Dropdown.Menu>
        </Dropdown>

        <form  onSubmit={addAgenda}>
          <InputGroup>
            <FormControl

                className={"form-control"}
                value={nameAgenda}
                onChange={(e) => setNameAgenda(e.target.value)}
                placeholder="Create a new agenda"
            />
            <InputGroup.Append>
              <Button type="submit"   variant="outline-light"  disabled={!nameAgenda}>+</Button>
            </InputGroup.Append>
          </InputGroup>
        </form>

      </div>)
}

function Agenda(){

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
  const query = todoRef.orderBy('createdAt');
  const [todo] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');
  const [levelValue, setLevelValue] = useState(false);



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

  }

  return (<div className={'tasks'}>

        <h1>{nameA}</h1>
        <form id='forma' onSubmit={addObj}>
          <InputGroup>
            <FormControl
                className={'formTasks'}
                onSubmit={addObj}
                placeholder={"Add a task to "+nameA}
                id={'formTodo'}
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}

            />

            <InputGroup.Append>

              <p className="onoff">
                <input onChange={(e) => setLevelValue(!levelValue)} type="checkbox"  id="checkboxID"/>
                <label htmlFor="checkboxID"></label>
              </p>

              <Button  variant="outline-light" type="submit" disabled={!formValue}>ADD</Button>
            </InputGroup.Append>
          </InputGroup>
        </form>
        <main>
          {todo && todo.map(ele => <ChatMessage imp={true} key={ele.id} todo={ele} />)}
          {todo && todo.map(ele => <ChatMessage imp={false} key={ele.id} todo={ele} />)}
        </main>
      </div>
  )
}

function ChatMessage(props) {
  const { text, level, id, createdAt } = props.todo;
  const {imp} = props
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
  if (level == imp){
    return (<>
      <div id={'todoElem'+level}>
        <div id='datep'>
          {createdAt ? createdAt.toDate().toDateString() : null}
        </div>

        <p id='todoP'>
          {level ? <div id='ppp'>⚠ <strong> {text} </strong> ⚠</div> : <div id='ppp'>{text}</div>}
        </p>

        <OverlayTrigger

            placement='right'
            overlay={
              <Tooltip id={`tooltip`}>
                click to <strong>delete</strong>.
              </Tooltip>
            }
        >
          <Button className='todoB'  variant="outline-danger" size="sm" onClick={removeObj}>✗</Button>

        </OverlayTrigger>

      </div>

    </>)
  }else{
    return (<></>)
  }
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
      <Dropdown.Item name = {name} className={'Agendas'}>

        <OverlayTrigger
            key='left'
            placement='left'
            overlay={
              <Tooltip id={`tooltip`}>
                click to <strong>select</strong>.
              </Tooltip>
            }
        >
          <p id='agendaP' onClick={() => {firestore.collection('users').doc(user.uid).set({currentAgenda:name}).then(() => {window.location.reload()})} } >
            <div id='aaa'>{name}</div>
          </p>

        </OverlayTrigger>

        <OverlayTrigger

            placement='right'
            overlay={
              <Tooltip id={`tooltip`}>
                click to <strong>delete</strong>.
              </Tooltip>
            }
        >
          <Button  variant="outline-danger" onClick={removeObj}>✗
          </Button>

        </OverlayTrigger>

      </Dropdown.Item>
  )
}
export default App;
