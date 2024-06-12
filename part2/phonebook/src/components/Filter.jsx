import Input from './Input'

const Filter = ({handleSearchPerson, searchPerson}) => {
    return (
        <Input fieldLabel="filter shown with a" onChange={handleSearchPerson} value={searchPerson}/>
    )
}

export default Filter