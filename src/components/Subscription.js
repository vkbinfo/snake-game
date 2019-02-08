

import firebase from '../config/firebase';

class Subscription {
    constructor(callback){
        this.callback = callback
        firebase.database().ref('games/123').on('value',(data) => this.callback(data.val()))
    }
    sendData = (gameData) => {
        firebase.database().ref('games/123').update(gameData)
    }

}



export default Subscription;