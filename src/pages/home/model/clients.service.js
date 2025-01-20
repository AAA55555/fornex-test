/**
 * Sorts clients by name and then by balance.
 * @param {Client[]} clients - list of clients
 * @returns {Client[]} - sorted list of clients
 */
export const sortedClients = (clients) => {
  return [...clients].sort((a, b) => {
    // Sort by name first
    if (a.name > b.name) return 1
    if (a.name < b.name) return -1

    // Sort by balance if names are equal
    return a.balance - b.balance
  })
}

/**
 * Searches clients by name, address, or contacts.
 * @param {Client[]} clients - list of clients
 * @param {string} query - search query
 * @returns {Client[]} - list of clients that matched the query
 */
export const searchClients = (clients, query) => {
  const lowerQuery = query.toLowerCase()

  return [...clients].filter((client) => {
    const nameMatch = client.name.toLowerCase().includes(lowerQuery)
    const addressMatch = Object.values(client.address).some((value) =>
      value.toLowerCase().includes(lowerQuery),
    )
    const contactsMatch = Object.values(client.contacts).some((value) =>
      value.toLowerCase().includes(lowerQuery),
    )

    return nameMatch || addressMatch || contactsMatch
  })
}

/**
 * Filters out archived clients if specified.
 * @param {Client[]} clients - list of clients
 * @returns {Client[]} - filtered list of clients
 */
export const filterArchivedClients = (clients) => {
  return clients.filter((client) => !client.archived)
}
