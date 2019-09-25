
type apiSuiteWheelPositions = 'tl' | 'tr' | 'bl' | 'br'

export interface ApiSuiteWheelProps {
  tlColor?: string,
  trColor?: string,
  blColor?: string,
  brColor?: string,
  selectedColor?: string,
  selected?: apiSuiteWheelPositions,
  size?: number,
}
