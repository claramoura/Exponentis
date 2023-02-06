import ModelTableLayout from "./ModelTableLayout.js";

function Users() {
    return <ModelTableLayout adminOnly={true} path='users' name='User' />
}

export default Users;