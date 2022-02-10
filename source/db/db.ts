import { LowSync, JSONFileSync } from 'lowdb'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import DataType from "../dataTypes/types";
import lodash from 'lodash';

const __dirname = dirname(fileURLToPath(import.meta.url));

class LowWithLodash<T> extends LowSync<T> {
    chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')
}

// Use JSON file for storage
const file = join(__dirname, 'db.json')

class DBManager {
    private db: LowWithLodash<DataType.Data>;
    constructor() {
        const adapter = new JSONFileSync<DataType.Data>("db.json")
        this.db = new LowWithLodash(adapter)
    }

    read(): DataType.Data {
        this.db.read()
        if (this.db.data == null) {
            return { users: [] }
        }
        return this.db.data;
    }

    write(user: DataType.User) {
        if (this.db.data == null) {
            this.db.data = { users: [] }
        }
        this.db.data.users.push(user);
        this.db.write()
    }

    find(email_user: string) {
        let data = this.read()
        if (data == null) {
            return false
        }
        if (data.users.find(({ email })=> email === email_user) != undefined) {
            return true
        }
        else {
            return false
        }
    }

    update(email_user: string, limit: number, last_session: string) {
        let data = this.read()
        if (data == null) {
            return;
        }
        const index = data.users.findIndex(({email}) => email === email_user)
        if (index != undefined) {
            data.users[index]["limit"] = limit;
            data.users[index]["last_session"] = last_session;
            this.db.write()
        }
        else {
            return;
        }
    }

    getDB() {
        return this.db
    }

}

export default DBManager;