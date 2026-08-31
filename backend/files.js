import { writeFileSync, readFileSync } from 'fs'

const users = [{ name: 'Justin Silbiger', email: 'justin@example.com' }]

const usersJson = JSON.stringify(users)

writeFileSync('backend/users.json', usersJson)

const readUsersJson = readFileSync('backend/users.json')

const readUsers = JSON.parse(readUsersJson)

console.log(readUsers)
