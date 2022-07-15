import {FaUserSecret, FaRegMap} from 'react-icons/fa';
import {FiMail, FiPhoneCall} from 'react-icons/fi';
import {MdCake} from 'react-icons/md';
import {RiLockPasswordFill} from 'react-icons/ri';
import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import shutter from "./assets/Shutter.svg";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [userList, setUserList] = useState([]);
  const [hover, setHover] = useState([]);
  const url = 'https://randomuser.me/api/';

  const getData = async ()=>{
    try {
      const {data} = await axios.get(url);
      setUser(data.results);
      setIsLoading(false);
      setHover(['name', data.results[0].name.first + ' ' + data.results[0].name.last]);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const handleClick = ()=>{
    const duplicityCheck = userList.filter((item)=>item.email === user[0].email);
    !duplicityCheck.length &&
    setUserList([...userList,{
      name:user[0].name.first + ' ' + user[0].name.last,
      email:user[0].email,
      phone:user[0].cell,
      age:user[0].dob.age
    }
  ])
    console.log(userList);
  }

  if (isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className="grand-container">
    <div className="top-background">
      <img src={shutter} alt='icon' className='icon'/>
    </div>
    <div className="bottom-background">
    <footer>
        Shutter Software Copyright © {new Date().getFullYear().toString()}
      </footer>
    </div>
    <section className='card'>
    <div className="top-layer">
    <div className="img-container">
    <img src={user[0].picture.large} alt={user[0].name.last} />
    </div>
    </div>

    <div className="bottom-layer">
      <p>My {hover[0]} is </p>
      <h4>{hover[1]}</h4>
      <div className="icons">
        <FaUserSecret onMouseEnter={()=>setHover(['name', user[0].name.first + ' ' + user[0].name.last])} size={25} color='#9C4D8C'/>
        <FiMail onMouseEnter={()=>setHover(['email', user[0].email])} size={25} color='#9C4D8C'/>
        <MdCake onMouseEnter={()=>setHover(['age', user[0].dob.age])} size={25} color='#9C4D8C'/>
        <FaRegMap onMouseEnter={()=>setHover(['street', user[0].location.street.name])} size={25} color='#9C4D8C'/>
        <FiPhoneCall onMouseEnter={()=>setHover(['phone number', user[0].cell])} size={25} color='#9C4D8C'/>
        <RiLockPasswordFill onMouseEnter={()=>setHover(['password', user[0].login.password])} size={25} color='#9C4D8C'/>
      </div>
      <div className="buttons">
        <button onClick={()=>getData()}>New User</button>
        <button onClick={handleClick}>Add User</button>
      </div>
        <table className={userList.length == 0 ? 'invisible': ''}>
          <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
          </tr>
          </thead>
          <tbody>
      {userList && (userList?.map((item)=>{
        return(
          <tr key={uuidv4()}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.age}</td>
          </tr>
        )
      }))}
      </tbody>
      </table>
    </div>

    </section>
    </div>
  )
}

export default App;