import { SERVER } from "../config";

export const storeUserData = async (email: string, name: string, password: string) => {
    try {
        const response = await fetch(`${SERVER}/api/v1/user/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: email, name: name, password: password}),
        });
        
        if(response.status === 405) {
            console.log("Email already exists!");
            return;
        }

        const data = await response.json();

        localStorage.setItem('medium-token', data.jwt);
        localStorage.setItem('medium-userId', data.user.id);

        return data;

    } catch (error) {
        console.error('Error while signing up!')
    }
}
export const logInUser = async (email:string, password:string) => {
    try {
        const response = await fetch(`${SERVER}/api/v1/user/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: email, password: password}),
        })
        if(response.status === 405) {
            console.log("User not found!");
            return;
        }

        const data = await response.json();

        console.log(data)
        localStorage.setItem('medium-userId', data.user.id)
        localStorage.setItem('medium-token', data.jwt)
        return data;

    } catch (error) {
        console.error('Error while signing in!')
    }
  }
