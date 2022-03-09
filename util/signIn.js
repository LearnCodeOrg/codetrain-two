import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// opens google sign in popup
export default async function signIn(setupUser) {
  // sign user in
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
  // get user doc
  const db = getFirestore();
  const uid = auth.currentUser.uid;
  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);
  // if no user doc, trigger setup
  if (!userDoc.exists()) setupUser();
}
