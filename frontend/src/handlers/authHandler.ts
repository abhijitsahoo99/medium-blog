import { SERVER } from "../config";

export const storeUserData = async (email: string, password: string, name: string) => {
    try {
        const response = await fetch(`${SERVER}/api/v1/user/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: email, password: password, name: name}),
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