import useForm from "../../../hooks/useForm";
import FormInput from "../../../components/form/FormInput";
import Button from "../../../components/ui/Button";
import {useEffect, useState} from "react";
const validateComment = (comment) => {
    const words = comment.split(" ");
    if (words.length < 2) {
        return "Comment must be at least two words";
    }
    return "";
};

const ReviewForm = ({onSubmit}) => {
    const [error, setError] = useState("");
    const [formValid, setFormValid] = useState(false);
    const {values, handleSubmit, resetForm, handleChange} = useForm({
        rating: 1,
        comment: ""
    });

    useEffect(() => {
        setFormValid(!error && values.comment.length > 0);
    }, [error, values.comment]);

    const handleRatingChange = (event) => {
        const value = event.target.value;
        if (value < 1 || value > 5) {
            setError("Rating must be between 1 and 5");
        } else {
            setError("");
            handleChange(event);
        }
    };

    const handleCommentChange = (event) => {
        const comment = event.target.value;
        const commentError = validateComment(comment);
        setError(commentError);
        handleChange(event);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (formValid) {
            onSubmit(values);
            resetForm();
        }
    };

    return(
        <form onSubmit={handleFormSubmit}>
            <div>
                <FormInput
                    label="Rating"
                    type="number"
                    name="rating"
                    value={values.rating}
                    onChange={handleRatingChange}
                    required
                    min="1"
                    max="5"
                />

            </div>
            <div>
                <FormInput
                    label="Comment"
                    type="text"
                    name="comment"
                    value={values.comment}
                    onChange={handleCommentChange}
                    required
                />
                {error && <span className="error">{error}</span>}
            </div>
            <Button type="submit" disabled={!formValid}>
                Create review
            </Button>
            <Button type="button" onClick={resetForm}>
                Reset
            </Button>
        </form>
    );
};


export default ReviewForm;
