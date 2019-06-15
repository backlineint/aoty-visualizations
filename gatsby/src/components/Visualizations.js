import React, { useContext  } from "react"

import AppContext from "./AppContext"
import Album from "./Album"

export default () => {
  const data = useContext(AppContext)
  console.table(data.allNodeAlbum.nodes)
  return(
    <div>
      {Object.keys(data.allNodeAlbum.nodes).map(key =>
        <Album
          key={key}
          artist={data.allNodeAlbum.nodes[key].field_artist}
          title={data.allNodeAlbum.nodes[key].field_album}
          albumId={data.allNodeAlbum.nodes[key].field_spotify_album_id}
          coverImage={data.allNodeAlbum.nodes[key].field_cover_image}
        />
      )}
    </div>
  )

}

// TODO - Prop Types