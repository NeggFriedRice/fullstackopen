const Notification = ({notif}) => {

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

    if (notif === null) {
        return null
    }

    return (
        <div style={notifStyle}>
            {notif}
        </div>
    )
}

export default Notification