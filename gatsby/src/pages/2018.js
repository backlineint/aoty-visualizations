import React from "react"
import { graphql, Link } from "gatsby"

export default ({ data }) => {
  return(
    <div>
      <h1>2018</h1>
      <p><Link to="/">Home</Link> / <Link to="/2017">2017</Link> / <Link to="/2018">2018</Link></p>
      {Object.keys(data.allNodeAlbum.nodes).map(key =>
        <p key={key}>{data.allNodeAlbum.nodes[key].field_artist} / {data.allNodeAlbum.nodes[key].field_album}</p>
      )}
    </div>
  )

}

export const query = graphql`
  query {
    allNodeAlbum(filter: {field_year: {eq: 2018}}) {
      nodes {
        field_artist
        field_album
      }
    }
  }
`