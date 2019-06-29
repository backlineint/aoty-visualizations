import React from "react"
import { graphql } from "gatsby"

import prepareData from '../utilities/prepareData'
import App from '../components/App'

/**
 * TODO List:
 * Update the lists included in the album view
 * Update the lists included in the list view
 * Squash various minor bugs
 * Stretch - create 'all' view.
 */

export default ({ data }) => {
  const preparedData = prepareData(data)
  return(
    <App 
      allAlbums={preparedData.allAlbums}
      filteredAlbums={preparedData.filteredAlbums}
      year={2018}
    />
  )
}

// Can this be abstracted?
export const query = graphql`
  query {
    allNodeAlbum(filter: {field_year: {eq: 2018}}) {
      nodes {
        field_artist
        field_album
        field_spotify_album_id
        field_cover_image
        field_cover_image_large
        title
        field_genre
        field_cons_score
        field_avg
        field_id
        field_top_10s
        field_wt_avg
        field_lists
        field_list_rankings
      }
    }
  }
`