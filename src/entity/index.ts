import { createConnection, Connection } from "typeorm";

const ormConnection: Promise<Connection> = createConnection();

export default ormConnection;
