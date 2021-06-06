const Persons = ({personsArray, onSubmitFunction}) => {
        return (
            <div>
                {personsArray.map(person => <div key={person.name+String(person.id)}>{person.name} {person.number} <button value={person.id} type="submit" onClick={onSubmitFunction}>delete</button></div>)}
            </div>
        );
    
}

export default Persons;