import React, { useState, useEffect } from 'react';

import { Input, Checkbox, Button } from 'antd';
import 'antd/dist/antd.css';

export default function App() {
  const [list, setList] = useState([]);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [criterion, setCriterion] = useState('');

  useEffect(() => {
    async function fetchList() {
      const url = 'https://www.mrsoft.by/data.json';
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const response = await fetch(proxyUrl + url);
      const result = await response.json();
      const fullList = result.data;
      setList(fullList)
    }

    fetchList()
  }, [0])

  const changeCriterion = ({ target }) => {
    setCriterion(target.value)
  }

  const filterByLenght = () => {
    const filteredList = list.filter(string => string.length > criterion);
    setFilteredList(filteredList);
  }

  const filterByString = () => {
    if (caseSensitive) {
      const filteredList = list.filter(string => string.indexOf(criterion) !== -1);
      setFilteredList(filteredList);
    } else {
      const filteredList = list.filter(string => string.toLowerCase().indexOf(criterion.toLowerCase()) !== -1);
      setFilteredList(filteredList);
    }
  }

  const changeCaseSensitivity = ({ target }) => {
    setCaseSensitive(target.checked);
  }

  return (
    <>
      <div className='input-container'>
        <Input className='input' onChange={changeCriterion}/>
        <Button type='primary' onClick={filterByLenght}> Отфильтровать по длине </Button>
        <Button type='primary' onClick={filterByString}>Отфильтровать по подстроке</Button>
      </div>
      <div className='checkbox-container'>
        <Checkbox onChange={changeCaseSensitivity}> Учитывать регистр</Checkbox>
      </div>
      <ul> {
        filteredList.length
          ? filteredList.map(item => <li>{item}</li>)
          : null
      }
      </ul>
    </>
  )
}
