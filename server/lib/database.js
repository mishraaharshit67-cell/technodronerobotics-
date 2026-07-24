import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '..', 'data');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const cache = {};

function loadCollection(name) {
  if (cache[name]) return cache[name];
  const fp = path.join(DATA_DIR, `${name}.json`);
  if (!fs.existsSync(fp)) fs.writeFileSync(fp, '[]');
  
  const arr = JSON.parse(fs.readFileSync(fp, 'utf8'));
  let nextId = arr.reduce((m, d) => Math.max(m, parseInt(d._id) || 0), 0) + 1;

  function save() { fs.writeFileSync(fp, JSON.stringify(arr, null, 2)); }

  function match(item, query) {
    for (const [k, v] of Object.entries(query)) {
      if (typeof v === 'object' && v !== null && v.$regex) {
        if (!new RegExp(v.$regex, v.$options || '').test(String(item[k] || ''))) return false;
      } else if (typeof v === 'object' && v !== null && v.$ne) {
        if (item[k] === v.$ne) return false;
      } else if (typeof v === 'object' && v !== null && v.$in) {
        if (!v.$in.includes(item[k])) return false;
      } else {
        if (item[k] !== v) return false;
      }
    }
    return true;
  }

  const col = {
    find(query = {}) {
      const keys = Object.keys(query);
      return keys.length === 0 ? arr : arr.filter(d => match(d, query));
    },
    findById(id) { return arr.find(d => d._id === id) || null; },
    findOne(query) { return col.find(query)[0] || null; },
    insertOne(doc) {
      const _id = String(nextId++);
      const ts = new Date().toISOString();
      const entry = { _id, ...doc, createdAt: ts, updatedAt: ts };
      arr.push(entry);
      save();
      return entry;
    },
    insertMany(docs) { return docs.map(d => col.insertOne(d)); },
    updateOne(query, update) {
      const item = col.findOne(query);
      if (!item) return null;
      if (update.$set) Object.assign(item, update.$set);
      else if (update.$push) {
        for (const [k, v] of Object.entries(update.$push)) {
          if (!item[k]) item[k] = [];
          item[k].push(v);
        }
      } else Object.assign(item, update);
      item.updatedAt = new Date().toISOString();
      save();
      return item;
    },
    deleteOne(query) {
      const idx = arr.findIndex(d => match(d, query));
      if (idx === -1) return false;
      arr.splice(idx, 1);
      save();
      return true;
    },
    deleteMany(query = {}) {
      const keys = Object.keys(query);
      if (keys.length === 0) { arr.length = 0; save(); return true; }
      const before = arr.length;
      const keep = arr.filter(d => !match(d, query));
      arr.splice(0, arr.length, ...keep);
      if (arr.length < before) save();
      return true;
    },
    countDocuments(query = {}) { return col.find(query).length; },
    sortBy(field, dir = -1) {
      arr.sort((a, b) => {
        if (a[field] < b[field]) return dir === -1 ? 1 : -1;
        if (a[field] > b[field]) return dir === -1 ? -1 : 1;
        return 0;
      });
      return col;
    },
  };

  cache[name] = col;
  return col;
}

export default { collection: loadCollection };
