import React, {useState} from 'react';
import commentsAPI from '../services/commentsAPI';
import Field from './forms/Field';
import { useNavigate } from 'react-router-dom';
import usersAPI from '../services/usersAPI';
import { useEffect } from 'react';



const PostComment = (props) => {


    const navigate = useNavigate();

    const [user, setUser] = useState([]);
   const [currentUser, setCurrentUser] = useState([]);

    const [comment, setComment] = useState({
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        spot: props.spotId,
        author: currentUser.id,
        content: "",
    })


    const [errors, setErrors] = useState({
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        spot: "",
        author: "",
        content: "",
    });

    const findCurrentUser = () => {
        // Récupération de l'user en cours grâce à l'email unique
        const users =  usersAPI.findAllUsers()

        return users.then(users => {
            users.forEach(identity => {
                if(user.email === identity.email)  
                setCurrentUser(identity)
            })
        })
    }

    console.log(currentUser)

    useEffect (() => {
        findCurrentUser()
    }, [])

    useEffect(() => {
        setComment({...comment, spot: props.spotId})
    }, [props.spotId])

    useEffect(() => {
        setComment({...comment, author: currentUser.id})
    }, [currentUser])

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            comment.spot = parseInt(comment.spot)
            comment.author = parseInt(comment.author)
            const response = await commentsAPI.createComments(JSON.stringify(comment));
            console.log(response)
            console.log('The comment has been successfully created')
            console.log(comment)
        } catch (error) {
            console.log(error + '. Sorry, an error has occured')
        }
    }

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setComment({...comment, [name]: value})
    }
    

    return (
         <>
         <div><p>kjldjqsdlqjdql</p></div>
         <div><p>kjldjqsdlqjdql</p></div>
         <div><p>kjldjqsdlqjdql</p></div>
         <div><p>kjldjqsdlqjdql</p></div>
         <div><p>kjldjqsdlqjdql</p></div>
          <div><p>kjldjqsdlqjdql</p></div>
         <div>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="content"
                        label="content"
                        placeholder="content"
                        value={comment.content}
                        error={errors.content}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
         </div>
        </> 
    );
}
 
export default PostComment;