import { getAuth } from 'firebase/auth';
// attempts to create user with given username
export default async function createUser(username) {
  const auth = getAuth();
  // verify username
  if (!username) {
    alert("Please enter a username.");
    return;
  }
  // verify username chars
  if (!/^[A-Za-z0-9_]+$/.test(username)) {
    alert("Username can only contain alphanumeric characters and underscore.");
    return;
  }
  // verify username length
  if (username.length < 2 || username.length > 16) {
    alert("Username must be between 2 and 16 characters.");
    return;
  }
  // verify username availability
  const usersRef = collection(db, 'users');
  const usernameLower = username.toLowerCase();
  const userQuery = query(usersRef, where('usernameLower', '==', usernameLower));
  const usernameQuery = await getDocs(userQuery);
  if (usernameQuery.docs.length) {
    alert("Username is taken. Please try another.");
    return;
  }
}
