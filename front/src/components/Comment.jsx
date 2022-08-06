import {useState} from 'react';
import commentsAPI from '../services/commentsAPI';
import Field from './forms/Field';



const PostComment = () => {

    const [comment, setComment] = useState({
        content: "dqsdqdqdqd",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        spot: "",
        author: "",
    })
    console.log(comment);

    const [errors, setErrors] = useState({
        content: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        spot: "",
        author: "",
    });


    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setComment({...comment, [name]: value})
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            comment.spot = parseInt(comment.spot)
            comment.author = parseInt(comment.author)
            const response = await commentsAPI.createComments(comment);
            console.log(response)
            console.log('The comment has been successfully created')
            console.log(comment)
        } catch (error) {
            console.log(error + '. Sorry, an error has occured')
        }
    }

    return (
         <>
         <h1>dfsqdqd</h1>
         <h1>dfsqdqd</h1>
         <h1>dfsqdqd</h1>
         <h1>dfsqdqd</h1>
         <h1>dfsqdqd</h1>
         <div>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="comments"
                        label="comments"
                        placeholder="comments"
                        value={comment.content}
                        onChange={handleChange}
                        error={errors.content}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
         </div>
        </> 
    );
}
 
export default PostComment;