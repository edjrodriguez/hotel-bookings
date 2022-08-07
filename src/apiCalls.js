let fetchData = (dataFileName) =>
  fetch(`http://localhost:3001/api/v1/${dataFileName}`)
    .then(response => response.json())
    .then(`response => response.${dataFileName}Data`)
    .catch(err => alert('there was an error in providing you the information'))

export {fetchData}