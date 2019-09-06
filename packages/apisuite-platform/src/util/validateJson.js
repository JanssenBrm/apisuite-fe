/*
 *
 * Validates a JSON string
 *
 */

function validateJson (str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export default validateJson
