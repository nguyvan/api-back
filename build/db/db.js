import { LowSync, JSONFileSync } from 'lowdb';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import lodash from 'lodash';
const __dirname = dirname(fileURLToPath(import.meta.url));
class LowWithLodash extends LowSync {
    constructor() {
        super(...arguments);
        this.chain = lodash.chain(this).get('data');
    }
}
// Use JSON file for storage
const file = join(__dirname, 'db.json');
class DBManager {
    constructor() {
        const adapter = new JSONFileSync("db.json");
        this.db = new LowWithLodash(adapter);
    }
    read() {
        this.db.read();
        if (this.db.data == null) {
            return { users: [] };
        }
        return this.db.data;
    }
    getLimit(email_user) {
        let data = this.read();
        if (data == null) {
            return -1;
        }
        const index = data.users.findIndex(({ email }) => email === email_user);
        if (index != undefined) {
            return data.users[index]["limit"];
        }
        else {
            return -1;
        }
    }
    write(user) {
        if (this.db.data == null) {
            this.db.data = { users: [] };
        }
        this.db.data.users.push(user);
        this.db.write();
    }
    find(email_user) {
        let data = this.read();
        if (data == null) {
            return false;
        }
        if (data.users.find(({ email }) => email === email_user) != undefined) {
            return true;
        }
        else {
            return false;
        }
    }
    update(email_user, limit, last_session) {
        let data = this.read();
        if (data == null) {
            return;
        }
        const index = data.users.findIndex(({ email }) => email === email_user);
        if (index != undefined) {
            data.users[index]["limit"] = limit;
            data.users[index]["last_session"] = last_session;
            this.db.write();
        }
        else {
            return;
        }
    }
    removeUser(email_user) {
        let data = this.read();
        if (data == null) {
            return;
        }
        const index = data.users.findIndex(({ email }) => email === email_user);
        if (index != undefined) {
            delete data.users[index];
            this.db.write();
        }
        else {
            return;
        }
    }
    getDB() {
        return this.db;
    }
}
export default DBManager;
