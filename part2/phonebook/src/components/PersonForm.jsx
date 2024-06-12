import Input from './Input'

const PersonForm = ({handleSubmit, handleInputChange, handleNumberChange, newName, newNumber}) => {
    return (
        <form onSubmit={handleSubmit}>
        <h1>Add new</h1>
        <Input fieldLabel="name" onChange={handleInputChange} value={newName} />
        <Input fieldLabel="number" onChange={handleNumberChange} value={newNumber}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm