import API from "../ApiManager"
import userSession from "./UserSession"

const validate = {
  newUser(entryObject) {
    return API.getData(`users?email=${entryObject.email}`)
      .then((user) => {
        if (user.length === 0) {
          return API.saveData("users", entryObject)
            .then((user) => {
              userSession.logInUser(user.id)
            })
        } else {
          alert("Oops! This email is already in use. Please use a different email, or return to the login page if you already have an account with us.")
        }
      })
  },
  existingUser(entryObject) {
    return API.getData(`users?email=${entryObject.email}`)
      .then((user) => {
        if (user[0] && user[0].password === entryObject.password) {
          userSession.logInUser(user[0].id)
          // document.querySelector("#loginForm").reset()
        } else {
          alert("Incorrect email/password-- please try again. If you're new here, please Register. ")
        }
      })
  }
}

export default validate

