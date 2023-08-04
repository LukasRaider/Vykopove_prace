import { people } from '../DataPeople';
import { PageContainer, ListOfPeople, Work, PeopleForm, Input, Button, Buttons, TabButton, CompanyForm } from './HomeStyles';
import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
    const [listOfEmployees, setListOfEmployees] = useState(people);
    const [newEmployees, setNewEmployees] = useState({
        id: (listOfEmployees.length > 0 ? Math.max(...listOfEmployees.map(people => people.id)) + 1 : 1),
        firstname: "",
        lastname: "",
        gender: ""
    });
    const peopleCount = useRef(people.length);
    const [valid, setValid] = useState(false);
    const [activeTab, setActiveTab] = useState('list-of-people');
    const [Company, setCompany] = useState({
        food: 35,
        vaccine: 15,
        pills: 20
    });
    const [statCompany, setStatCompany] = useState({
        food: "",
        vaccine: "",
        pills: ""
    });
    const dogsRequirements = {
        food: 5,
        vaccine: 1,
        pills: 2
    };


    const handleChange = (e) => {
        const updatedPeople = { ...newEmployees, [e.target.firstname]: e.target.value };
        setNewEmployees(updatedPeople);
        validateData(updatedPeople);
    };

    const handleDelete = (idToDel) => {
        setListOfEmployees(listOfEmployees.filter(people => people.id !== idToDel));
    }
   
    const handleStorage = (e) => {
        setStatCompany({ ...statCompany, [e.target.name]: e.target.value })
    }

    const updateValue = () => {
        const storageValue = statCompany;
        let newValue = {};
        const keys = Object.keys(storageValue);
        keys.map((key) => {
            if (parseInt(storageValue[key])) {
               return newValue[key] = parseInt(Company[key]) + parseInt(storageValue[key]);
            } else {
               return newValue[key] = parseInt(Company[key]);
            }
        })
        setCompany(newValue);
        setStatCompany({ food: "", vaccine: "", pills: "" });
    }

    useEffect(() => { console.log(newEmployees) }, [newEmployees]);
    useEffect(() => { console.log(listOfEmployees) }, [listOfEmployees]);

const workPower = () => {
    let men=0;
    let women=0;

    for (i=1;i=>(Math.max(people.id));i++){

    
    if (people.gender=="MEN"){
        men += 1;
    }else{
        women += 1;
    }
}
}
    
    return (
        <PageContainer>
            <Buttons>
                <TabButton name='list-of-people' data-active={activeTab} onClick={() => { setActiveTab('list-of-people') }}>
                    List of employees
                </TabButton>
                <TabButton name='working-plan' data-active={activeTab} onClick={() => { setActiveTab('working-plan') }}>
                    Task
                </TabButton>
            </Buttons>
            {(activeTab === 'list-of-people') &&
                <>
                    <PeopleList name='peopleList'>
                        {listOfEmployees.map((people) => {
                            return (
                                <Work key={people.id}>
                                    <span>
                                        {people.firstname} {people.lastname} - {people.gender}
                                    </span>
                                    <button
                                        style={{
                                            color: '#64766a',
                                            fontWeight: 'bolder',
                                            border: 2 + 'px solid #64766a',
                                            borderRadius: 50 + '%',
                                            height: 25 + 'px',
                                            width: 25 + 'px'
                                        }}
                                        onClick={() => { handleDelete(people.id) }}
                                    >
                                        X
                                    </button>
                                </Work>
                            )
                        })}
                    </PeopleList>
                    <PeopleForm>
                        <Input
                            type="text"
                            placeholder="jméno zaměstnance"
                            name="firstname"
                            onChange={handleChange}
                            value={newEmployees.firstname}
                        />
                        <Input
                            type="text"
                            placeholder="příjmení zaměstnance"
                            name="lastname"
                            onChange={handleChange}
                            value={newEmployees.lastname}
                        />
                        <Input
                            type="radio"
            
                            name="gender"
                            onChange={handleChange}
                            value="MEN"
                        >MEN</Input>
                        <Input
                            type="radio"
                            
                            name="gender"
                            onChange={handleChange}
                            value="WOMEN"
                        >WOMEN</Input>
                        
                        <Button
                            
                            onClick={handleAdd}
                        >
                            Add employees
                        </Button>
                    </PeopleForm>
                </>
            }
            {(activeTab === 'working-plan') &&
                <>
                    <h3>Planing excavation work</h3>
                    <p>Men: {workPower.men}</p>
                    <p>Women: {workPower.women}</p>
                    <CompanyForm>
                        
                        <Input
                            type='number'
                            min="0"
                            placeholder='Enter meters'
                            name='meters'
                            value={Calculate.setmeters}
                            onChange={handleStorage}
                        />
                        <Input
                            type='number'
                            min="0"
                            placeholder='Enter hours'
                            name='hours'
                            value={Calculate.sethours}
                            onChange={handleStorage}
                        />
                        <Button 
                            onClick={updateValue}
                            onChange={updateValue}
                        >
                            Work planning
                        </Button>
                    </CompanyForm>
                </>
            }
        </PageContainer >
    )
}