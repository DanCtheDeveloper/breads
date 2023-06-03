const React = require('react')
const Default = require('./layout/Default')

function Show ({bread}) {
  console.log(bread.name)
    return (
      <Default>
        <h2>Show Page</h2>
      </Default>
    )
}

module.exports = Show
