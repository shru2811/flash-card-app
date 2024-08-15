
export async function login(email, password){
    return await account.createEmailPasswordSession(
        email, 
        password
    );
}