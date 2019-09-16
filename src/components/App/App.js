// Import Modules
import React, { useState, useEffect } from 'react';
import firebase from 'firebase'

// Import Components
import FileUpload from '../UploadFile'

// Import Styles
import './App.css';

function App() {
  const [isLoging, setLogin] = useState(false)
  const [user, setUser] = useState(null)
  const [uploadValue, setUpload] = useState(0)
  const [files, setFile] = useState([])

  function handleIn() {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(result))
      .catch(err => console.log(err))
     setLogin(true)
  }

  function handleOut() {
    firebase.auth().signOut()
      .then(result => console.log(result))
      .catch(err => console.log(err))
    setLogin(false)
  }

  function handleUpload(ev) {
    const file = ev.target.files[0]
    const storeRef = firebase.storage().ref()
    const taks = storeRef.child(`/photos/${file.name}`).put(file)

    taks.on('state_changed', snapshot => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setUpload(percentage)
    }, err => {
        console.log(`error: ${err}`)
    }, () => {
        setUpload(100)
        taks.snapshot.ref.getDownloadURL()
        .then(downloadURL => {
          const record = {
            displayName: user.displayName,
            imagen: downloadURL,
            photoURL: user.photoURL
          }
          const dbRef = firebase.database().ref('photos')
          const newPhoto = dbRef.push()
          newPhoto.set(record)
        });
    })
}

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })
    firebase.database().ref('photos').on('child_added', snapshot => {
      setFile(files => files.concat(snapshot.val()))
    })
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Firebase
        </p>
      </header>
      <main>
        <section>
          {
            !isLoging 
            ?  
              <button onClick={handleIn}>Login con Google</button>
            :
              <div>
                {user && <img style={{ width: '240px'}} src={user.photoURL} alt={user.displayName} />} 
                <br/>
                <button onClick={handleOut}>Salir</button>
                <FileUpload uploadValue={uploadValue} handleUpload={handleUpload}/>
                {
                  files.map((file, index) =>
                  <div key={index}>
                    <img  style={{width:'240px'}} src={file.imagen} alt='fichero'/>
                    <br/>
                    <p>
                      <img style={{width:'40px'}} src={file.photoURL} alt={file.displayName} />
                      <span>{file.displayName}</span>
                    </p>
                    <br/>
                  </div>
                  ).reverse()
                }
              </div> 
          }
        </section>
      </main>
    </div>
  );
}

export default App;
