import React, {useState} from 'react';
import styled from "styled-components";

const FilterCourses = ({options, handleFilter}) => {

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedReview, setSelectedReview] = useState("");

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        handleFilter(event.target.value, selectedReview);
    };

    const handleReviewChange = (event) => {
        setSelectedReview(event.target.value);
        handleFilter(selectedCategory, event.target.value);
    };

    return (
        <div>
            <FilterText>Filter</FilterText>
            <CustomSelect id="subject" value={selectedCategory} onChange={handleCategoryChange}>
                <option>Choose a subject</option>
                {options.subject.map((subject) => (
                    <option key={subject} value={subject}>
                        {subject}
                    </option>
                ))}
            </CustomSelect>
            <CustomSelect id="review" value={selectedReview} onChange={handleReviewChange}>
                <option>Choose a rating</option>
                {[1, 2, 3, 4, 5].map((review) => (
                    <option key={review} value={review}>
                        {review}
                    </option>
                ))}
            </CustomSelect>
        </div>
    );
};

const FilterText = styled.h3`
  margin: 20px 0 20px 0;
  background: #0f3a6a;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const CustomSelect = styled.select`
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #0F3A6A;
  background-color: rgba(91, 192, 190, 0.2);
  color: #0F3A6A;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  margin-right: 20px;
  margin-bottom: 20px;

  &:hover {
    background-color: rgba(91, 192, 190, 0.4);
  }
  &:focus {
    border: 1px solid rgba(15, 58, 106, 0.8);
  }
  option {
    background-color: #ffffff;
    color: #0F3A6A;
  }
`



export default FilterCourses;
