let userRole = {
    student:"Student",
    faculty:"Faculty",
    administrative:"Administrative",
    admin:"Admin",
    professor:"Professor",
    

}

let roles =[]

function setRoles(role){
  roles = role
  userRole = roles.reduce((acc, role) => {
    const key = role.toLowerCase().replace(/\s+/g, ''); // Convert to lowercase & remove spaces
    acc[key] = role; // Set key-value pair
    return acc;
}, {});
  console.log("at role services+++++++++++++++++++")
  console.log(roles)
  console.log(userRole)
}

export default {roles,userRole, setRoles};