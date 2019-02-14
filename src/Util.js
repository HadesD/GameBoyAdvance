class DownloadFile
{
  constructor(url)
  {
    this.hRequest = new XMLHttpRequest();
    this.url = url;

    this.onLoad = null;
    this.onProgress = null;
    this.onReadyStateChange = null;
  }

  start()
  {
    this.hRequest.open('GET', this.url);

    if (this.onLoad)
    {
      this.hRequest.onload = this.onLoad;
    }
    if (this.onProgress)
    {
      this.hRequest.onprogress = this.onProgress;
    }
    if (this.onReadyStateChange)
    {
      this.hRequest.onreadystatechange = this.onReadyStateChange;
    }

    this.hRequest.send();
  }
}

export default DownloadFile;

function downloadFile(url, callback, progressCallback)
{
  let request = new XMLHttpRequest();
  request.open('GET', url);

  // let filename = url.split('/');
  if (progressCallback)
  {
    request.onprogress = progressCallback;
  }
}

