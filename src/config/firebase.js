import firebase from 'firebase/app';
import 'firebase/database';

var config = {
  apiKey: 'AIzaSyDHc6PhbqEItbk77txPLxft3XGKvfrO9EQ',
  authDomain: 'rattle-battle.firebaseapp.com',
  databaseURL: 'https://rattle-battle.firebaseio.com',
  projectId: 'rattle-battle',
  storageBucket: 'rattle-battle.appspot.com',
  messagingSenderId: '58058416373'
};

firebase.initializeApp(config);
export default firebase;
