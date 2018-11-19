import { firestore } from "firebase";

export default class FireManager {

    /**
     * Adding user to database,
     * user must be an object with valid id property
     */
    static addUser(user) {

        if (user.id) {
            firestore().collection("users").doc(user.id).set(user)
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch(error => {
                    console.error("Error writing document: ", error);
                });
        } else {
            console.error("need to pass an object with existing id property")
        }
    }

    /**
     * Updating user database properties,
     * pass a valid userId and an object that contains user fields
     * for example {userName: name
     *              age: 18
     *              skills: [{value: driver, rate: 0}]
     *             }
     * */
    static updateUser(data = {}, userId) {

        if (userId) {
            firestore().collection("users").doc(userId).update(
                data.skills
                    ? {...data, skills: firestore.FieldValue.arrayUnion(...data.skills)}
                    : {...data})
                .then(() => {
                    console.log("user successfully updated");
                })
                .catch(e => {
                    console.error("Error updating user: ", e);
                });
        } else {
            console.error("need to pass an object with existing id property")
        }
    }

    /**
     * Adding global skill to database
     * Pass a string or strings, or ...array
     */
    static addSkill(...skills) {

        skills.forEach(skill => {
            firestore().collection("skills").doc(skill).set({value: skill})
                .then(() =>
                    console.log("skill successfully added"
                    ))
                .catch(e =>
                    console.error("Error writing document: ", e
                    ));
        });
    }


    /**
     * Returns a promise with resolved user object
     * calling example... getUserSkills(userId).then(user => {do your staff with user object});
     * */
    static getUser(userId) {

        if (userId) {
            const ref = firestore().collection("users").doc(userId);

            return ref.get().then(doc => {
                if (doc.exists) {
                    return doc.data();
                } else {
                    console.error("No such user!");
                }
            }).catch(function (error) {
                console.error("Error getting user:", error);
            });
        }
    }
}