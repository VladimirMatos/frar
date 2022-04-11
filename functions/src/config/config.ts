const {
    DBHOST,
    DBUSER,
    DBPASS,
    DBNAME,
    DBPORT
 } = process.env

export const config = {
    db:{
        host: DBHOST,
        user: DBUSER,
        password: DBPASS,
        database: DBNAME,
        port: DBPORT
    }
}