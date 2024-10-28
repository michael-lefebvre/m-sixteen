import { Writable } from 'stream';

class HtmlWritable extends Writable {
  chunks = [];
  html = '';

  getHtml() {
    return this.html;
  }

  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    callback();
  }

  _final(callback) {
    this.html = Buffer.concat(this.chunks).toString();
    callback();
  }
}

export default HtmlWritable;
