import React, { useRef, useState } from "react";
import "./Chat.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import SendIcon from "@mui/icons-material/Send";

firebase.initializeApp({
  apiKey: "AIzaSyCclhjtmMR06z3mczyuaXyIVsThi35Lss0",
  authDomain: "i2e-app-e92f0.firebaseapp.com",
  databaseURL: "https://i2e-app-e92f0-default-rtdb.firebaseio.com",
  projectId: "i2e-app-e92f0",
  storageBucket: "i2e-app-e92f0.appspot.com",
  messagingSenderId: "86031308411",
  appId: "1:86031308411:web:4b0c3c2c54dc080ee074de",
  measurementId: "G-RFN018KD3N",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function ChatTime() {
  const [user] = useAuthState(auth);

  return (
    <div className="ChatBox">
      <header>
        <span role="img" aria-label="chat">
          💬
        </span>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main className="ChatRoom">
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form className="ChatForm" onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Enter your message...."
        />

        <button type="submit" disabled={!formValue}>
          <SendIcon />
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          alt="user icon"
          className="userPhoto"
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p className="chatText">{text}</p>
      </div>
    </>
  );
}

export default ChatTime;
