import axios from 'axios';

const deleteContact = (requestUrl, change, onChangeFunction, notificationFunction, notificationTypeFunction, nameToBeDeleted) => {
    axios.delete(requestUrl).then(() => {
        onChangeFunction(!change);
        notificationTypeFunction('success');
        notificationFunction(`${nameToBeDeleted} is deleted successfully.`)
        setTimeout(() => {
          notificationFunction(null);
        }, 3000);
      }).catch(error => {
        notificationTypeFunction('error');
        notificationFunction(`Information of ${nameToBeDeleted} has already been removed from the server.`);
        setTimeout(() => {
          notificationFunction(null);
        }, 3000);
      });
}

export default deleteContact;