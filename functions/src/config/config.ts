const {
    dbHost,
    dbUser,
    dbPass,
    dbName,
    dbPort
 } = process.env

export const config = {
    db:{
        host: dbHost,
        user: dbUser,
        password: dbPass,
        database: dbName,
        port: dbPort
    }
}