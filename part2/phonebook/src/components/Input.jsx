const Input = ({ fieldLabel, onChange, value}) => {
    return (
        <div style={{display: 'flex'}}>
            <p>{fieldLabel}: </p><input onChange={onChange} value={value}></input>
        </div>
    )
}

export default Input