const Notification = ({notif, error}) => {

    const notifStyle = {
        color: 'green',
        backgroundColor: 'lightgrey',
        fontSize: 16,
        borderColor: 'green',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    const errorStyle = {
        color: 'red',
        backgroundColor: 'lightgrey',
        fontSize: 16,
        borderColor: 'red',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (notif === null) {
        return null
    }

    return (
        <div style={error ? errorStyle : notifStyle}>
            {notif}
        </div>
    )
}

export default Notification