import React, {useContext} from 'react';
import styled from 'styled-components';

import AppContext from "./AppContext"

import { Button } from "@blueprintjs/core";

const RowControlWrapper = styled.div`
 margin-bottom: 1rem;
`;

export default(props) => {
  // TODO - feels like we want to have seperate providers here so we can get only what
  // we need.
  // Also might be a place where we should use a container comonent to manage state.
  const data = useContext(AppContext)
  const rowControl = data.rowControl
  const dispatchRow = data.dispatchRow
  const dispatchApp = data.dispatchApp

  return(
    <RowControlWrapper>
      <p>{props.label}</p>
      <div className="pt-button-group pt-large pt-fill">
        {Object.keys(rowControl).map(key =>
          <Button
            key={key}
            active={rowControl[key].active}
            disabled={rowControl[key].disabled}
            onClick={() => {
                dispatchRow({type: 'change', newRows: rowControl[key].rows})
                dispatchApp({type: 'set rows', newRows: rowControl[key].rows})
              }
            }
          >
            {key}
          </Button>
        )}
      </div>
    </RowControlWrapper>
  )
}

// TODO - Prop Types