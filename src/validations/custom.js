// Check whether the vallue(can be anything - object, string etc.) is empty or not. Returns boolean value.

export const isEmpty = (value) => {
	return (
		value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0)
	)
}