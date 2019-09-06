import React from 'react'
import { THEME } from 'constants/global'
import themes from 'themes'

export default React.createContext(themes[THEME])
