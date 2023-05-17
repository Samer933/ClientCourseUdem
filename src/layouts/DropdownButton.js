
import React, { useState } from 'react';
import { Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DropdownButton = ({ data }) => {
    console.log('Rendering DropdownButton');

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return (

        <Dropdown className="dropdown-button">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {data &&
                    data.map((course) => (
                        <Dropdown.Item key={course._id} as={Link} to={`/courses/${course._id}`}>
                            {course.title}
                        </Dropdown.Item>
                    ))}
            </Dropdown.Menu>
        </Dropdown>

    );
};

export default DropdownButton;









    /*

    return (
        <>
            <div>
                <ul>
                    {data && data.map((course) => (
                        <div key={course._id}>
                            <Link to={`/courses/${course._id}`}>{course.title}</Link>
                        </div>
                    ))}
                </ul>
                <CheckboxContainer>
                    < CheckboxInput type="checkbox"label="Option 1" name="option1" value="Option 1" />
                    <br/>
                    < CheckboxInput type="checkbox"label="Option 2" name="option2" value="Option 2" />
                    <br/>
                    < CheckboxInput type="checkbox"label="Option 3" name="option3" value="Option 3" />
                    <br/>
                </CheckboxContainer>

            </div>
        </>
    );
};

export default DropdownButton;


const CheckboxContainer = styled.div`
  @media screen and (min-width: 768px) {
 
      width: 250px;
      height: 50%;
      position: fixed;
      //top: 0;
      left: 0;
      overflow-x: hidden;
      overflow-y: auto;
        background-color: yellow;
    //margin-left: 100px ;
 
  }

  /* For screens smaller than 768px
  @media screen and (max-width: 767px) {
  
      width: 75%;
      height: auto;
      position: relative;
    background-color: yellow;
    
`;

const CheckboxLabel = styled.label`
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

const CheckboxInput = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-right: 5px;
  vertical-align: middle;
  cursor: pointer;

  &:checked {
    background-color: #008CBA;
    border-color: #008CBA;
    color: #fff;
  }
`;*/
