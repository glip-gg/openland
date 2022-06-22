import pako from 'pako';

async function fetchGZIPJSON(url: string) {
  try {
    // fetch file with CORS enabled
    const res = await fetch(url, {
      mode: 'cors'
    });
    // convert to arrayBuffer for further processing
    const buf = await res.arrayBuffer();
        // or get blob using `await res.blob()`
    // and convert blob to arrayBuffer using `await blob.arrayBuffer()`
    
    console.log('input size: ', buf.byteLength);
    
    // decompress file
    const outBuf = pako.inflate(buf);
    console.log('output size: ', outBuf.byteLength);
    
    // convert arrayBuffer to string
    const str = new TextDecoder().decode(outBuf);
    // console.log('json string', str);
    
    // print json object
    return JSON.parse(str);
  } catch (err) {
    console.error('unable to decompress', err);
  }
}

export async function fetchApeDeedsData() {
  let url = `https://live-nft-hosted-assets.s3.ap-south-1.amazonaws.com/otherside/data_json/processedApeDeeds.json.gz`;
  let data = await fetchGZIPJSON(url);
  console.log('data', data[0]);
  return data;
}

export async function fetchApeDeedsPriceData() {
    let url = `https://be.namasteapis.com/service/v1/get-otherside-prices/`;
    let data = await fetch(url, {
        mode: 'cors',
        headers: {
            'Accept-Encoding': 'gzip',
        }
    });
    return (await data.json());
}
