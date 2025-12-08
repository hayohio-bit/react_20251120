import React from 'react';
import { useState, useContext } from "react";
import { DiaryStateContext } from '../App';
import Button from "../component/Button";
import Header from "../component/Header";
import Editor from '../component/Editor';

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);
    const headerTitle = `${pivotDate.getFullYear()}년
                        ${pivotDate.getMonth() +1}월`;
    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    };

    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() -1));
    };

    return (
        <div>
            <Header
                title={"2025년 n월"}
                leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
                rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
            />
        </div>
    );
};

export default Home;