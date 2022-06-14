import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
const fs = require('fs');




type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var filePath = path.join(__dirname, '../../../../utils/tsv-parser.js');
  var stat = fs.statSync(filePath);

  // res.writeHead(200, {
  //     'Content-Type': 'text/js',
  //     'Content-Length': stat.size
  // });

  var readStream = fs.createReadStream(filePath);
  // We replaced all the event handlers with a simple call to readStream.pipe()
  readStream.pipe(res);
}
