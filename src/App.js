import React, { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import axios from 'axios';
import addContact from './services/addContact';
import deleteContact from './services/deleteContact';
import updateContact from './services/updateContact';
import './App.css';

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ nameFilter, setNameFilter ] = useState('')
  const [ changePersons, setChangePersons ] = useState(false);
  const [ notification, setNotification ] = useState(null);
  const [ notificationType, setNotificationType ] = useState(null);

  const personsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(nameFilter));

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value);

    if (nameFilter === '') {
      setShowAll(true);
    }
    else{
      setShowAll(false);
    }
  }


  const AddName = (event) => {
    event.preventDefault();

    const nameCheck = persons.map((person) => newName === person.name);

    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
    }

    if(nameCheck.includes(true)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons.filter(person => {
          return person.name === newName
        })[0].id;

        console.log(id)

        updateContact(`http://localhost:3001/api/persons/${id}`, personObject, changePersons, setChangePersons, setNotification, setNotificationType);
      }
      return;
    }

    else {
      // post new contact to server
      addContact('http://localhost:3001/api/persons', personObject, changePersons, setChangePersons, setNotification, setNotificationType);

      setPersons(persons.concat(personObject));
      console.log(persons);
    }
  }

  const deleteNumber = (event) => {
    event.preventDefault();
    console.log(persons);
    console.log(event.target.value)
    
    const nameToBeDeleted = persons.filter( person => person.id===Number(event.target.value))[0].name;

    if(window.confirm(`Delete ${nameToBeDeleted}?`)) {
      setPersons(persons.slice(event.target.value-1, 1));
      
      deleteContact(`http://localhost:3001/api/persons/${event.target.value}`, changePersons, setChangePersons, setNotification, setNotificationType, nameToBeDeleted);
    }
    else {
      console.log('Canceled delete.');
    }
  }

  useEffect(() => {
    const eventHandler = response => {
      setPersons(response.data);
    }

    const promise = axios.get("http://localhost:3001/api/persons");

    promise.then(eventHandler);
  }, [changePersons]);

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
      <Filter changeFunction={handleFilterChange}/>
      <h2>Add new entry:</h2>
      <PersonForm onNameChangeFunction={handleNameChange} onNumberChangeFunction={handleNumberChange} onSubmitFunction={AddName}/>
      <h2>Numbers</h2>
      <Persons personsArray={personsToShow} onSubmitFunction={deleteNumber}/>
    </div>
  )
}

export default App