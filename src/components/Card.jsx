
const Card = ({user}) => {
    console.log(user);
  if (user) {
  return (
    <section>
    <img src={user[0].picture.large} alt={user[0].name.last} />
    <h2>{user[0].name.first} {user[0].name.last}</h2>
    <p>Age: {user[0].dob.age}</p>
    <p>Email: {user[0].email}</p>
    <p>Phone: {user[0].cell}</p>
    <p>Password: {user[0].login.password}</p>
    </section>
  )} else {return <></>}
}

export default Card;