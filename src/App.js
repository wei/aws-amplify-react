import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from '@aws-amplify/ui-react'
import { useState } from 'react';
import { Hub, Storage } from 'aws-amplify';

function listAllFiles() {
  return new Promise((resolve) => {
    let fullList = []
    let hasMore = true

    const loadFullList = async (continuationToken) => {
      // Loading 10 at a time, 10 times.
      const currentBatch = await Storage.list('', { level: 'private', continuationToken, maxKeys: 10, track: true })
      console.log(currentBatch.map(d => d.key))
      fullList = [...fullList, ...currentBatch]
      if (!hasMore) {
        resolve(fullList)
      }
    }

    Hub.listen('storage', ({ payload }) => {
      const { event, data } = payload
      if (event === 'list') {
        const { method, result, isTruncated, nextContinuationToken } = data.attrs;
        if (method === 'list' && result === 'success') {
          if (isTruncated) {
            loadFullList(nextContinuationToken)
          } else {
            hasMore = false
          }
        }
      }
    })

    loadFullList()
  })
}

function App() {
  const [generateFileStatus, setGenerateFileStatus] = useState('')
  const [fileList, setFileList] = useState([])

  async function uploadFiles() {
    for (let i = 0; i < 100; i++) {
      const putResult = await Storage.put(`test-${`${i}`.padStart(2, '0')}.json`, `{"text":"Hello ${new Date().toISOString()}"}`, { level: 'private', contentType: 'application/json' })
      console.log(i, putResult)
      setGenerateFileStatus(`Uploaded ${putResult.key}`)
    }
    setGenerateFileStatus('All files uploaded')
  }

  async function handleListFiles() {
    setFileList(await listAllFiles())
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={uploadFiles}>Upload 100 Files</button>
        <p>{ generateFileStatus }</p>
        <br/>
        <button onClick={handleListFiles}>List Files</button>
        <p>{ fileList.map(f => <span key={f.key}>{f.key}&nbsp;&nbsp;</span>) }</p>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
