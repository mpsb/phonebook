import axios from 'axios';

const addContact = (serverUrl, personObject, change, onChangeFunction, notificationFunction, notificationTypeFunction) => {
    axios.post(serverUrl, personObject).then(() => {
        onChangeFunction(!change);
        notificationTypeFunction('success');
        notificationFunction(`Added ${personObject.name}.`);
        setTimeout(() => {
          notificationFunction(null);
        }, 3000);
      }).catch(error => {
        notificationTypeFunction('error');
        notificationFunction(error);
        setTimeout(() => {
          notificationFunction(null);
        }, 3000);
      });
}

export default addContact;