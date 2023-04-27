const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    flexCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgContainer: {
        flex: 1
    },
    font: {
        fontSize: 25
    },
    whiteFont: { color: 'white' },
    header: {
        flexDirection: "row",
        height: 50,
        width: '100%',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'white'
    },
    btnIcon: {
        width: 25,
        height: 25
    },
    input: {
        width: '80%',
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'lightgrey',
        fontSize: 20
    },
    loginButton: {
        width: '80%',
        backgroundColor: '#569DAA',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center'
    },
    registerButton: {
        width: '80%',
        backgroundColor: "#577D86",
        borderRadius: 5,
        padding: 10,
        alignItems: 'center'
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    footer: {
        flexDirection: "row",
        height: 50,
        width: '100%',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center'
    },
});