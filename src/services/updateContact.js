import axios from 'axios';

const updateContact = (serverUrl, personObject, change, onChangeFunction, notificationFunction, notificationTypeFunction) => {
    axios.put(serverUrl, personObject).then(() => {
        onChangeFunction(!change);
        notificationTypeFunction('success');
        notificationFunction(`${personObject.name} was updated successfully.`);
        setTimeout(() => {
          notificationFunction(null);
        }, 3000);
      }).catch(error => {
        notificationTypeFunction('error');
        notificationFunction(`Information of ${personObject.name} has already been removed from the server.`);
        console.log(error);
        setTimeout(() => {
          notificationFunction(null);
        }, 3000);
      });
}

export default updateContact;