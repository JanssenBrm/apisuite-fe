import * as React from 'react'

import Link from 'components/Link'

import Avatar from '@material-ui/core/Avatar'

import useStyles from './styles'

import { APICatalogProps } from './types'

const APICatalog: React.FC<APICatalogProps> = ({
  recentlyAddedAPIs,
}) => {
  const classes = useStyles()

  const apiCatalogEntries = recentlyAddedAPIs.map((apiDetails, index) => {
    const apiSplitName = apiDetails.apiName.split(' ')
    const apiInitials = apiSplitName.length >= 2
      ? `${apiSplitName[0].charAt(0)}${apiSplitName[1].charAt(0)}` : apiSplitName[0].slice(0, 2)

    if (apiDetails.hasMoreDetails) {
      return (
        <Link
          className={classes.apiCatalogEntryLink}
          to={`/api-details/${apiDetails.id}/${apiDetails.apiRoutingId}`}
        >
          <div
            className={classes.apiCatalogEntry}
            key={`apiCatalogEntry${index}`}
          >
            <div className={classes.apiCatalogEntryAvatar}>
              <Avatar
                className={apiDetails.apiAccess === 'Production access'
                  ? classes.colorsOfProductionAPI
                  : (apiDetails.apiAccess === 'Sandbox access'
                    ? classes.colorsOfSandboxAPI
                    : classes.colorsOfAPIDocumentation)}
              >
                {apiInitials.toUpperCase()}
              </Avatar>
            </div>

            <div className={classes.apiCatalogEntryText}>
              <p className={classes.apiCatalogEntryName}>{apiDetails.apiName}</p>

              <p className={classes.apiCatalogEntryVersionAndAccess}>
                <span
                  className={
                    `
${classes.apiCatalogEntryVersion}
${(
          apiDetails.apiAccess === 'Production access'
            ? classes.colorsOfProductionAPI
            : (
              apiDetails.apiAccess === 'Sandbox access'
                ? classes.colorsOfSandboxAPI
                : classes.colorsOfAPIDocumentation
            )
        )}
`
                  }
                >
                  {
                    apiDetails.apiVersion === 'No version available'
                      ? apiDetails.apiVersion
                      : `v${apiDetails.apiVersion}`
                  }
                </span>
                <>{apiDetails.apiAccess}</>
              </p>

              <p className={classes.apiCatalogEntryDescription}>
                {apiDetails.apiDescription}
              </p>
            </div>
          </div>
        </Link>
      )
    } else {
      return (
        <div
          className={classes.apiCatalogEntry}
          key={`apiCatalogEntry${index}`}
        >
          <div className={classes.apiCatalogEntryAvatar}>
            <Avatar
              className={apiDetails.apiAccess === 'Production access'
                ? classes.colorsOfProductionAPI
                : (apiDetails.apiAccess === 'Sandbox access'
                  ? classes.colorsOfSandboxAPI
                  : classes.colorsOfAPIDocumentation)}
            >
              {apiInitials.toUpperCase()}
            </Avatar>
          </div>

          <div className={classes.apiCatalogEntryText}>
            <p className={classes.apiCatalogEntryName}>{apiDetails.apiName}</p>

            <p className={classes.apiCatalogEntryVersionAndAccess}>
              <span
                className={
                  `
${classes.apiCatalogEntryVersion}
${(
          apiDetails.apiAccess === 'Production access'
            ? classes.colorsOfProductionAPI
            : (
              apiDetails.apiAccess === 'Sandbox access'
                ? classes.colorsOfSandboxAPI
                : classes.colorsOfAPIDocumentation
            )
        )}
`
                }
              >
                {
                  apiDetails.apiVersion === 'No version available'
                    ? apiDetails.apiVersion
                    : `v${apiDetails.apiVersion}`
                }
              </span>
              <>{apiDetails.apiAccess}</>
            </p>

            <p className={classes.apiCatalogEntryDescription}>
              {apiDetails.apiDescription}
            </p>
          </div>
        </div>
      )
    }
  })

  return <>{apiCatalogEntries}</>
}

export default APICatalog
