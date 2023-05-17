import styled from "styled-components";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
const Search = () => {
    const { data, error, isLoading } = useFetch("/courses");
    const [search, setSearch] = useState("");
    const [showList, setShowList] = useState(false);

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setShowList(true);
    };

    const handleLinkClick = () => {
        setSearch("");
    };

    let filteredCourses = data?.filter((course) =>
        course.title.toLowerCase().startsWith(search.toLowerCase())
    );

    if (isLoading) return <p>Loading courses...</p>;

    if (error) return <p>Error fetching courses</p>;

    return (
        <SearchContainer>
            <Input
                type="text"
                placeholder="Search courses"
                onChange={handleSearch}
                value={search}
            />
            {showList && search !== "" && (
                <SearchList>
                    {filteredCourses &&
                        filteredCourses.map((course) => (
                            <li key={course._id}>
                                <Link to={`/courses/${course._id}`} onClick={handleLinkClick} style={{ textDecoration: "none" }}>
                                    {course.title}
                                </Link>
                            </li>
                        ))}
                </SearchList>
            )}
        </SearchContainer>
    );
};

export default Search;

const Input = styled.input`
  width: 40%;
  margin: 0 auto 20px;
  display: block;
  top: 0;
  position: relative;
  font-size: 1.2rem;
  padding: 10px;
  border: none;
  border-bottom: 2px solid rgb(146 162 244);
  border-radius: 10px;
  

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  
`;

const SearchList = styled.ul`
  position: absolute;
  left: 0;
  top: 40px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-height: 200px;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  width: 100%;
  opacity: 0.9;
  z-index: 999;

  li {
    list-style: none;
    padding: 8px;
    cursor: pointer;

    &:hover {
      background-color: #f2f2f2;
    }
  }
`;
