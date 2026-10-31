const fs = require("fs")
const os = require("os")
const path = require("path")
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../models/users")

const seed = [
    { id: 1, name: "steve" },
    { id: 2, name: "bob", email: "bob@example.com" }
]

let tempDir
let usersFile


const readUsersFile = () => JSON.parse(fs.readFileSync(usersFile, "utf8"))

//setup temp file data
beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "users-test-"))
    usersFile = path.join(tempDir, "users.json")
    process.env.USERS_FILE = usersFile
    fs.writeFileSync(usersFile, JSON.stringify(seed))
})
//undo everything
afterEach(() => {
    jest.restoreAllMocks()
    delete process.env.USERS_FILE
    fs.rmSync(tempDir, { recursive: true, force: true })
})

describe("Testing the users CRUD functions", () => {

    describe("getUsers", () => {

        test("should return every user saved in the file", () => {
            expect(getUsers()).toEqual(seed)
        })

        test("should return an empty array when the file doesn't exist", () => {
            fs.rmSync(usersFile)
            expect(getUsers()).toEqual([])
        })

        test("should throw when the file isn't valid JSON", () => {
            fs.writeFileSync(usersFile, "not json")
            expect(() => getUsers()).toThrow(SyntaxError)
        })
    })

    describe("getUserById", () => {

        test("should return the user with that ID", () => {
            expect(getUserById(2)).toEqual(seed[1])
        })

        test("should find the user when the ID is a string from the URL", () => {
            expect(getUserById("1")).toEqual(seed[0])
        })

        test("should return undefined when no user has that ID", () => {
            expect(getUserById(99)).toBeUndefined()
        })
    })

    describe("createUser", () => {

        test("should save the new user to the file and return it", () => {
            const user = createUser({ name: "alice", email: "alice@example.com" })

            expect(user).toEqual({ id: 3, name: "alice", email: "alice@example.com" })
            expect(readUsersFile()).toEqual([...seed, user])
        })

        test("should give each new user a unique ID", () => {
            const first = createUser({ name: "alice" })
            const second = createUser({ name: "carol" })

            expect(first.id).toBe(3)
            expect(second.id).toBe(4)
        })

        test("should create the folder and file when they don't exist", () => {
            fs.rmSync(tempDir, { recursive: true })

            const user = createUser({ name: "alice" })

            expect(user.id).toBe(1)
            expect(readUsersFile()).toEqual([{ id: 1, name: "alice" }])
        })
    })

    describe("updateUser", () => {

        test("should save the new name and email to the file and return the user", () => {
            const user = updateUser(1, { name: "steven", email: "steven@example.com" })

            expect(user).toEqual({ id: 1, name: "steven", email: "steven@example.com" })
            expect(readUsersFile()).toEqual([user, seed[1]])
        })

        test("should return undefined and not write the file when no user has that ID", () => {
            const writeFile = jest.spyOn(fs, "writeFileSync")

            expect(updateUser(99, { name: "nobody" })).toBeUndefined()
            expect(writeFile).not.toHaveBeenCalled()
            expect(readUsersFile()).toEqual(seed)
        })
    })

    describe("deleteUser", () => {

        test("should remove the user from the file and return it", () => {
            expect(deleteUser("2")).toEqual(seed[1])
            expect(readUsersFile()).toEqual([seed[0]])
        })

        test("should return undefined and not write the file when no user has that ID", () => {
            const writeFile = jest.spyOn(fs, "writeFileSync")

            expect(deleteUser(99)).toBeUndefined()
            expect(writeFile).not.toHaveBeenCalled()
            expect(readUsersFile()).toEqual(seed)
        })
    })
})
