import {
    addDoc, collection,  deleteDoc,  doc,  getDocs, updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { db } from "../../config";

function Form() {
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const [editId,setEditeId]=useState("")

    useEffect(() => {
        getData()

    }, [setData]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId === "") {
              await addDoc(collection(db, "user"), user);
              console.log("Data added..");
            } else {
              await updateDoc(doc(db, "user", editId), {
                email: user.email,
                password: user.password,
              });
              setEditeId("");
            }
          } catch (error) {
            console.log(error);
          }
          setUser({});
          getData();
        console.log(user,'in');
    }
    let getData = async () => {
        try {
            let res = await getDocs(collection(db, "user"));
            let allData = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            setData(allData);
        } catch (error) {
            console.log(error);
        }
    }
    let handleDelete=async(id)=>{
        try {
            await deleteDoc(doc (db,"user",id));
            getData()
        } catch (error) {
            console.log(error);
        }
    }
    let handleEdit=async(user)=>{
        try {
            setUser(user)
          setEditeId(user.id)  
        } catch (error) {
           console.log(error); 
        }
    }
   
    return (
        <>
            <div className="container">
                <h2 className=" ps-4 mt-3">Add your email</h2>
                <form className='mx-auto p-4 mt-3 w-50% ' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="text" className="form-control" name='email' onChange={handleInput} value={user.email || ""} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="text" className="form-control" name='password' onChange={handleInput} value={user.password || ""} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            
            <table class="table table-success table-striped-columns">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">email</th>
                        <th scope="col">password</th>
                        <th scope="col">action</th>
                        <th scope="col">action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user,i) => (
                        <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td><button className="btn" onClick={()=>handleDelete(user.id)}>delet</button></td>
                            <td><button className="btn" onClick={()=>handleEdit(user)}>edite</button></td>
                        </tr>
                    ))}

                </tbody>
            </table>

            </div>

        </>
    );
}

export default Form;

