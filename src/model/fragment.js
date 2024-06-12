// Use crypto.randomUUID() to create unique IDs, see:
// https://nodejs.org/api/crypto.html#cryptorandomuuidoptions
const { randomUUID } = require('crypto');
// Use https://www.npmjs.com/package/content-type to create/parse Content-Type headers
const contentType = require('content-type');

// Functions for working with fragment metadata/data using our DB
const {
  readFragment,
  writeFragment,
  readFragmentData,
  writeFragmentData,
  listFragments,
  deleteFragment,
} = require('./data');

class Fragment {
  constructor({ id, ownerId, created, updated, type, size = 0 }) {
    // TODO
    if(!ownerId || !type)
        throw new Error("you must provide ownerId and type");
    else if(typeof size != 'number' || size < 0)
        throw new Error("size must be a number >= 0");
    else if(!Fragment.isSupportedType(type))
        throw new Error("The type is not supported");

    this.id = id || randomUUID();
    this.ownerId = ownerId;
    this.created = created || new Date().toISOString();
    this.updated = updated || new Date().toISOString();
    this.type = type;
    this.size = size;
  }

  /**
   * Get all fragments (id or full) for the given user
   * @param {string} ownerId user's hashed email
   * @param {boolean} expand whether to expand ids to full fragments
   * @returns Promise<Array<Fragment>>
   */
  static async byUser(ownerId, expand = false) {
    try{
        const fragments = await listFragments(ownerId, expand);
        return Promise.resolve(fragments);
    } catch (error){
        return Promise.reject(error);
    }
  }

  /**
   * Gets a fragment for the user by the given id.
   * @param {string} ownerId user's hashed email
   * @param {string} id fragment's id
   * @returns Promise<Fragment>
   */
  static async byId(ownerId, id) {
    // TODO
    try{
        const fragment = await readFragment(ownerId, id);
        if (!fragment)
            throw new Error("no fragment found");
        return fragment;
    } catch(error){
        return Promise.reject(error);
    }
  }

  /**
   * Delete the user's fragment data and metadata for the given id
   * @param {string} ownerId user's hashed email
   * @param {string} id fragment's id
   * @returns Promise<void>
   */
  static delete(ownerId, id) {
    // TODO
    try{
        if(readFragment(ownerId, id) == undefined)
            throw new Error("can not delete nonexistent fragment");
        return deleteFragment(ownerId, id);
    } catch(error){
        return Promise.reject(error);
    }
  }

  /**
   * Saves the current fragment to the database
   * @returns Promise<void>
   */
  save() {
    // TODO
    try{
        this.updated = new Date().toISOString();
        return writeFragment(this);
    } catch(error){
        return Promise.reject(error);
    }
  }

  /**
   * Gets the fragment's data from the database
   * @returns Promise<Buffer>
   */
  getData() {
    // TODO
    try{
        return readFragmentData(this.ownerId, this.id);
    } catch(error){
        return Promise.reject(error);
    }
  }

  /**
   * Set's the fragment's data in the database
   * @param {Buffer} data
   * @returns Promise<void>
   */
  async setData(data) {
    // TODO
    try{
        if(!Buffer.isBuffer(data))
            throw new Error("data must be buffer");
        this.updated = new Date().toISOString();
        this.size = Buffer.from(data).length;
        return writeFragmentData(this.ownerId, this.id, data);
    } catch(error){
        return Promise.reject(error);
    }
  }

  /**
   * Returns the mime type (e.g., without encoding) for the fragment's type:
   * "text/html; charset=utf-8" -> "text/html"
   * @returns {string} fragment's mime type (without encoding)
   */
  get mimeType() {
    const { type } = contentType.parse(this.type);
    return type;
  }

  /**
   * Returns true if this fragment is a text/* mime type
   * @returns {boolean} true if fragment's type is text/*
   */
  get isText() {
    // TODO
    return this.mimeType.includes('text');
  }

  /**
   * Returns the formats into which this fragment type can be converted
   * @returns {Array<string>} list of supported mime types
   */
  get formats() {
    // TODO
    if (this.mimeType === 'text/plain')
        return ['text/plain'];
  }

  /**
   * Returns true if we know how to work with this content type
   * @param {string} value a Content-Type value (e.g., 'text/plain' or 'text/plain: charset=utf-8')
   * @returns {boolean} true if we support this Content-Type (i.e., type/subtype)
   */
  static isSupportedType(value) {
    // TODO
    if(value=='text/plain' || value=='text/plain; charset=utf-8')
        return true;
    else
        return false;


    // const validTypes = [
    //   'text/plain',
    //   // Add other supported types in the future here:
    // ];

    // return validTypes.includes(value);

  }
}

module.exports.Fragment = Fragment;